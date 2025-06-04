import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstudiantesInterface } from './estudiantes.interface';

const apiKey: string = "";
const auth: string = "";
const baseUrl: string = "https://qwjvecreyljnamxghqgu.supabase.co/rest/v1/estudiantes";

const headers = new HttpHeaders({
  'apiKey': apiKey,
  'Authorization': auth,
});


@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {

  constructor(private http: HttpClient) { }

  /* Método para obtener datos desde la API */
  obtenerEstudiantes() {
    return this.http.get<EstudiantesInterface[]>(baseUrl + '?select=*', {headers})
  }

  /* Método para guardar estudiantes */
  guardarEstudiantes(request: EstudiantesInterface) {
    return this.http.post(baseUrl, request, {headers})
  }

  /* Método para actualizar un estudiante */
  actualizarEstudiante(request: EstudiantesInterface) {
    return this.http.patch(baseUrl + "?est_id=eq." + request.est_id, request, {headers})
  }

  /* Método para eliminar un estudiante */
  eliminarEstudiante(est_id: number) {
    return this.http.delete(baseUrl + "?est_id=eq." + est_id, {headers})
  }

}
