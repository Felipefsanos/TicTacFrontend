import { ProdutoModel } from 'src/app/models/produto.model';
import { ProdutoService } from 'src/app/services/produto.service';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MessageService } from 'src/app/shared/services/message.service';
import { ProdutoModalComponent } from '../../modals/produto-modal/produto-modal.component';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements AfterViewInit {

  @Input()
  selecao = false;

  @Input()
  produtosSelecionados?: ProdutoModel[];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @Output()
  selecaoFinalizada = new EventEmitter<ProdutoModel[]>();

  dataSource = new MatTableDataSource<ProdutoModel>();
  displayedColumns: string[] = [];
  listaProdutosSelecionados = new SelectionModel<ProdutoModel>(true, []);

  constructor(private produtoService: ProdutoService,
    private messageService: MessageService,
    private matDialog: MatDialog) {
  }

  ngAfterViewInit(): void {
    this.refresh();
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected(): boolean {
    const numSelected = this.listaProdutosSelecionados.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(): void {
    if (this.isAllSelected()) {
      this.listaProdutosSelecionados.clear();
    } else {
      this.dataSource.data.forEach(row => this.listaProdutosSelecionados.select(row));
    }
  }

  refresh(): void {
    this.produtoService.obterProdutos()
      .subscribe(res => {
        if (this.selecao && this.produtosSelecionados && this.produtosSelecionados?.length > 0) {
          const produtosReduzidos: ProdutoModel[] = [];
          for (const produto of res)
          {
            if(!this.produtosSelecionados.some(x => x.id === produto.id)) {
              produtosReduzidos.push(produto);
            }
          }
          this.dataSource.data = produtosReduzidos;
        } else {
          this.dataSource.data = res;
        }
      });
  }

  submitSelecao(): void {
    this.selecaoFinalizada.emit(this.listaProdutosSelecionados.selected);
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

  editar(produtoModel: ProdutoModel): void {
    const dialogRef = this.matDialog.open(ProdutoModalComponent,
      {
        data:
        {
          produtoModel
        }
      });

    dialogRef.afterClosed().subscribe((formValue: any) => {
      if (formValue) {
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

  getDisplayedColumns(): string[] {
    if (this.selecao) {
      return this.displayedColumns = ['select', 'nome', 'descricao', 'valor'];
    }
    return this.displayedColumns = ['id', 'nome', 'descricao', 'valor', 'acoes'];
  }


}
