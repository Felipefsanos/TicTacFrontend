import { MessageService } from 'src/app/shared/services/message.service';
import { PrestadorModel } from './../../../../models/prestador.model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PrestadorService } from 'src/app/services/prestador.service';

@Component({
  selector: 'app-prestador-modal',
  templateUrl: './prestador-modal.component.html',
  styleUrls: ['./prestador-modal.component.scss']
})
export class PrestadorModalComponent {

  prestador: PrestadorModel;

  constructor(private dialogRef: MatDialogRef<PrestadorModalComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any) {
    this.prestador = this.data.prestador;
  }

  editarPrestador(prestador: PrestadorModel): void {
    this.dialogRef.close(prestador);
  }



}
