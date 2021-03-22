import { ProdutoModel } from 'src/app/models/produto.model';
import { ProdutoService } from 'src/app/services/produto.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MaskApplierService, MaskPipe } from 'ngx-mask';
import { MessageService } from 'src/app/shared/services/message.service';
import { ProdutoModelComponent } from '../../modals/produto-modal/produto-modal.component';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements AfterViewInit {

 
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  dataSource = new MatTableDataSource<ProdutoModel>();

  constructor(private produtoService: ProdutoService,
              private messageService: MessageService,
              private matDialog: MatDialog) {
    this.refresh();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  refresh(): void {
    this.produtoService.obterProdutos()
      .subscribe(res => {
        this.dataSource.data = res;
      });
  }

 
  editar(produtoModel: ProdutoModel): void {
    const dialogRef = this.matDialog.open(ProdutoModelComponent,
      { data:
        {
          produtoModel
        }
      });

    dialogRef.afterClosed().subscribe((formValue: any) =>
    {
      if(formValue) {
        const produtoEditado = new ProdutoModel(formValue);

        this.produtoService.editarProduto(produtoEditado.id as number, produtoEditado)
            .subscribe(() => {
              this.messageService.success('Produto alterado com sucesso!');
              this.refresh();
            });
      }
    });

  }
  excluir(id: number) {
    this.produtoService.excluirProduto(id)
        .subscribe(() => {
          this.messageService.success('Produto excluído com sucesso!');
          this.refresh();
        });
  }


}
