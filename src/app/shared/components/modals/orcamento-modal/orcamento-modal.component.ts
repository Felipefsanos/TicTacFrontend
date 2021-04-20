import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrcamentoModel } from 'src/app/models/orcamento.model';

@Component({
  selector: 'app-orcamento-modal',
  templateUrl: './orcamento-modal.component.html',
  styleUrls: ['./orcamento-modal.component.scss']
})
export class OrcamentoModalComponent {

  orcamento: OrcamentoModel;

  constructor(private dialogRef: MatDialogRef<OrcamentoModalComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any) {
    this.orcamento = this.data.orcamento;
  }

  editarOrcamento(orcamento: OrcamentoModel): void {
    this.dialogRef.close(orcamento);
  }
}
