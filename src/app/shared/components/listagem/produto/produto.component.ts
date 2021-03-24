import { ProdutoService } from 'src/app/services/produto.service';
import { ProdutoModel } from './../../../../models/produto.model';
import { AfterViewInit, Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MessageService } from 'src/app/shared/services/message.service';
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
    private messageService: MessageService) {
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

  getDisplayedColumns(): string[] {
    if (this.selecao) {
      return this.displayedColumns = ['select', 'nome', 'descricao', 'valor'];
    }
    return this.displayedColumns = ['id', 'nome', 'descricao', 'valor', 'acoes'];
  }


}
