import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProdutoModel } from 'src/app/models/produto.model';

@Component({
  selector: 'app-produto-modal',
  templateUrl: './produto-modal.component.html',
  styleUrls: ['./produto-modal.component.scss']
})
export class ProdutoModalComponent {

  produtoModel: ProdutoModel;

  constructor(private dialogRef: MatDialogRef<ProdutoModalComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any) {
    this.produtoModel = this.data.produto;
  }

  editarPrestador(produto: ProdutoModel): void {
    this.dialogRef.close(produto);
  }
}
