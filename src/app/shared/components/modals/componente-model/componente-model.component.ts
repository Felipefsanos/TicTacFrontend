import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComponenteModel } from 'src/app/models/componente.model';
import { OrcamentoModalComponent } from '../orcamento-modal/orcamento-modal.component';

@Component({
  selector: 'app-componente-model',
  templateUrl: './componente-model.component.html',
  styleUrls: ['./componente-model.component.scss']
})
export class ComponenteModelComponent  {

  componente: ComponenteModel;

  constructor(private dialogRef: MatDialogRef<ComponenteModelComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any) {
    this.componente = this.data.componente;
  }

  editarPrestador(componente: ComponenteModel): void {
    this.dialogRef.close(componente);
  }

}
