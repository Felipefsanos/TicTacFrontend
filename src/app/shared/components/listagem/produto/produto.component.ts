import { ProdutoModel } from 'src/app/models/produto.model';
import { ProdutoService } from 'src/app/services/produto.service';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MaskApplierService, MaskPipe } from 'ngx-mask';
import { MessageService } from 'src/app/shared/services/message.service';
import { ProdutoModelComponent } from '../../modals/produto-modal/produto-modal.component';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements AfterViewInit {

  @Input()
  selecao = false;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @Output()
  produtosSelecionados = new EventEmitter<ProdutoModel[]>();

  dataSource = new MatTableDataSource<ProdutoModel>();
  displayedColumns: string[] = [];
  listaProdutosSelecionados = new SelectionModel<ProdutoModel>(true, []);

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

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ProdutoModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.listaProdutosSelecionados.isSelected(row) ? 'deselect' : 'select'} row ${row.id ? row.id + 1 : 0}`;
  }

  refresh(): void {
    this.produtoService.obterProdutos()
      .subscribe(res => {
        this.dataSource.data = res;
      });
  }

  submitSelecao(): void {
    this.produtosSelecionados.emit(this.listaProdutosSelecionados.selected);
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
    const dialogRef = this.matDialog.open(ProdutoModelComponent,
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
