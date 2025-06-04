import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from 'src/app/pop-up/pop-up.component';
import { EstudiantesInterface } from 'src/app/servicios/estudiantes.interface';
import { EstudiantesService } from 'src/app/servicios/estudiantes.service';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {
  
  /* Constructor de la clase */
  constructor(private fb: FormBuilder, private estudiantesService: EstudiantesService, private dialog: MatDialog){}
  
  /* Método que se ejecuta al iniciar el componente */
  ngOnInit() {
    this.obtenerEstudiantes();
  }

  /* Mostrar estudiantes */
  /* Variable array utilizada para almacenar la lista de estudiantes */
  estudiantes: EstudiantesInterface[] | undefined;
  /* Función para obtener los estudiantes de la API */
  obtenerEstudiantes() {
    this.estudiantesService.obtenerEstudiantes().subscribe(
      response => {
        this.estudiantes = response;
      }
    )
  }

  /* Añadir y editar estudiantes */
  /* Variable que establece si se muestra o no se muestra el formulario */
  toggleForm: boolean = false;
  /* Variable utilizada para determinar si se debe editar un estudiante */
  toggleEditar: boolean = false;
  
  /* Formulario añadir estudiantes */
  formEstudiantes = this.fb.group({
    est_dni: [0, Validators.compose([Validators.required, Validators.max(99999999)])],
    est_nombreApellido: ['', Validators.compose([Validators.required, Validators.maxLength(255), Validators.pattern("^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\\s]+$")])],
    est_email: ['', Validators.compose([Validators.required, Validators.email, Validators.maxLength(255)])],
    est_fechaNacimiento: ['', Validators.required]
  })
  /* Getters para acceder a los controls del formulario */
  get est_dni() {
    return this.formEstudiantes.controls.est_dni;
  }
  get est_nombreApellido() {
    return this.formEstudiantes.controls.est_nombreApellido;
  }
  get est_email() {
    return this.formEstudiantes.controls.est_email;
  }
  get est_fechaNacimiento() {
    return this.formEstudiantes.controls.est_fechaNacimiento;
  }

  /* Método para guardar estudiantes */
  guardarEstudiante() {
    if (this.formEstudiantes.valid) {
      this.estudiantesService.guardarEstudiantes(this.formEstudiantes.value as EstudiantesInterface)
      .subscribe({
        next: (
          () => {
            this.formEstudiantes.reset();
            this.obtenerEstudiantes();
          }
        ),
        error: (
          () => {
            this.dialog.open(PopUpComponent, {
              data: {msg: "Ocurrió un error al guardar", valid: false}
            });
          }
        ),
        complete: (
          () => {
            this.toggleForm = false;
            this.resetBtn();
            this.dialog.open(PopUpComponent, {
              data: {msg: "¡Guardado con éxito!", valid: true}
            });
            setTimeout(() => {
              this.dialog.closeAll()
            }, 1000)
          }
        )
      }
      );
    } else {
      this.formEstudiantes.markAllAsTouched();
    }
  }

  /* Variable utilizada para almacenar los datos del estudiante editado y enviarlos en la peticion de actualización */
  estudianteEditado: EstudiantesInterface = {
    est_id: 0,
    est_dni: 0,
    est_nombreApellido: "",
    est_email: "",
    est_fechaNacimiento: ""
  };

  /* Método para poblar los inputs del formulario con los valores del estudiante a editar */
  poblarFormEstudiantes(index: number) {
    if (this.estudiantes != undefined) {
      this.estudianteEditado.est_id = this.estudiantes[index].est_id;
      this.formEstudiantes.setValue({
      est_dni: this.estudiantes[index].est_dni.valueOf(),
      est_nombreApellido: this.estudiantes[index].est_nombreApellido.valueOf(),
      est_email: this.estudiantes[index].est_email.valueOf(),
      est_fechaNacimiento: this.estudiantes[index].est_fechaNacimiento.valueOf()
      })
    }
  }

  /* Método para actualizar un estudiante, para ello actualiza los valores de estudianteEditado y llama al servicio */
  actualizarEstudiante() {
    if (this.formEstudiantes.valid) {
      this.estudianteEditado.est_dni = this.formEstudiantes.controls.est_dni.value!;
      this.estudianteEditado.est_nombreApellido = this.formEstudiantes.controls.est_nombreApellido.value!;
      this.estudianteEditado.est_email = this.formEstudiantes.controls.est_email.value!;
      this.estudianteEditado.est_fechaNacimiento = this.formEstudiantes.controls.est_fechaNacimiento.value!;
      this.estudiantesService.actualizarEstudiante(this.estudianteEditado)
      .subscribe({
        next: (
          () => {
            this.formEstudiantes.reset();
            this.obtenerEstudiantes();
          }
        ),
        error: (
          () => {
            this.dialog.open(PopUpComponent, {
              data: {msg: "Ocurrió un error al editar", valid: false}
            });
          }
        ),
        complete: (
          () => {
            this.toggleForm = false;
            this.resetBtn();
            this.dialog.open(PopUpComponent, {
              data: {msg: "¡Editado con éxito!", valid: true}
            });
            setTimeout(() => {
              this.dialog.closeAll()
            }, 1000)
          }
        )
      })
    } else {
      this.formEstudiantes.markAllAsTouched();
    }
  }

  /* Método para eliminar un estudiante, utiliza el index para obtemer el ID */
  eliminarEstudiante(index: number) {
    if (this.estudiantes != undefined) {
      this.estudiantesService.eliminarEstudiante(this.estudiantes[index].est_id)
      .subscribe({
        next: (
          () => {
            this.obtenerEstudiantes();
          }
        ),
        error: (
          () => {
            this.dialog.open(PopUpComponent, {
              data: {msg: "Ocurrió un error al eliminar", valid: false}
            });
          }
        ),
        complete: (
          () => {
            this.dialog.open(PopUpComponent, {
              data: {msg: "¡Eliminado con éxito!", valid: true}
            });
            setTimeout(() => {
              this.dialog.closeAll()
            }, 1000)
          }
        )
      })
    }
  }

  /* Estilo de los botones del formulario de estudiantes*/
  btnToggleBgWhite: boolean = false;
  btnToggleTextPrimary: boolean = false;
  btnSaveBgWhite: boolean = false;
  btnSaveTextPrimary: boolean = false;
  btnCancelBgWhite: boolean = false;
  btnCancelTextDanger: boolean = false;

  /* Función que resetea el estilo de los botones */
  resetBtn() {
    this.btnToggleBgWhite = false;
    this.btnToggleTextPrimary = false;
    this.btnSaveBgWhite = false;
    this.btnSaveTextPrimary = false;
    this.btnCancelBgWhite = false;
    this.btnCancelTextDanger = false;
  }

}