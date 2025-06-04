import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})

/* Este componente es el que se utiliza como plantilla cuando se abre un diálogo modal */

export class PopUpComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {msg: string, valid: boolean}) {}

}
