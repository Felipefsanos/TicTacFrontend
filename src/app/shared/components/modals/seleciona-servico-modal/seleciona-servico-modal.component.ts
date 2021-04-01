import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServicoModel } from 'src/app/models/servico.model';

@Component({
  selector: 'app-seleciona-servico-modal',
  templateUrl: './seleciona-servico-modal.component.html',
  styleUrls: ['./seleciona-servico-modal.component.scss']
})
export class SelecionaServicoModalComponent {

  constructor(private dialogRef: MatDialogRef<SelecionaServicoModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ServicoModel[]) { }

  enviarServicosSelecionados(event: any): void {
    this.dialogRef.close(event);
  }

}
