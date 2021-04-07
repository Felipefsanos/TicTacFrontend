import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServicoModel } from 'src/app/models/servico.model';

@Component({
  selector: 'app-servico-modal',
  templateUrl: './servico-modal.component.html',
  styleUrls: ['./servico-modal.component.scss']
})
export class ServicoModalComponent{

  servico: ServicoModel;

  constructor(private dialogRef: MatDialogRef<ServicoModalComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any) {
    this.servico = this.data.servico;
  }

  editarServico(servico: ServicoModel): void {
    this.dialogRef.close(servico);
  }

}
