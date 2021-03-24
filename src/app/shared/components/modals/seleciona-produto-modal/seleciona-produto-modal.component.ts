import { ProdutoModel } from 'src/app/models/produto.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-seleciona-produto-modal',
  templateUrl: './seleciona-produto-modal.component.html',
  styleUrls: ['./seleciona-produto-modal.component.scss']
})
export class SelecionaProdutoModalComponent {

  constructor(private dialogRef: MatDialogRef<SelecionaProdutoModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ProdutoModel[]) { }

  enviarProdutosSelecionados(event: ProdutoModel[]): void {
    this.dialogRef.close(event);
  }

}
