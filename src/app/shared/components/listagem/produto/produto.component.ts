import { ProdutoService } from 'src/app/services/produto.service';
import { ProdutoModel } from './../../../../models/produto.model';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MaskApplierService, MaskPipe } from 'ngx-mask';
import { ConfimacaoModalModel } from 'src/app/shared/models/confirmacao-modal.model';
import { MessageService } from 'src/app/shared/services/message.service';
import { ConfirmacaoModalComponent } from '../../modals/confirmacao-modal/confirmacao-modal.component';
import { OrcamentoModalComponent } from '../../modals/orcamento-modal/orcamento-modal.component';
import { PrestadorModalComponent } from '../../modals/prestador-modal/prestador-modal.component';

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
              private dialog: MatDialog) {
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

  // editar(produto: ProdutoModel): void {
  //   const dialogRef = this.dialog.open(PrestadorModalComponent,
  //     { data:
  //       {
  //         produto
  //       }
  //     });

  //   dialogRef.afterClosed().subscribe((formValue: any) =>
  //   {
  //     if(formValue) {
  //       const produtoEditado = new ProdutoModel(formValue);

  //       this.produtoService.(prestador.id as number, prestadorEditado)
  //           .subscribe(() => {
  //             this.messageService.success('Usuário alterado com sucesso!');
  //             this.refresh();
  //           });
  //     }
  //   });

  // }

  excluir(id: number) {
    this.produtoService.excluirProduto(id)
        .subscribe(() => {
          this.messageService.success('Prestador excluído com sucesso!');
          this.refresh();
        });
  }


}
