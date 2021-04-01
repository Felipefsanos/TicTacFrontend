import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ServicoModel } from 'src/app/models/servico.model';
import { ServicoService } from 'src/app/services/servico.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { SelecionaServicoModalComponent } from '../../modals/seleciona-servico-modal/seleciona-servico-modal.component';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.scss']
})
export class ServicosComponent implements AfterViewInit {

  @Input()
  selecao = false;

  @Input()
  produtosSelecionados?: ServicoModel[];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @Output()
  selecaoFinalizada = new EventEmitter<ServicoModel[]>();

  dataSource = new MatTableDataSource<ServicoModel>();
  displayedColumns: string[] = [];
  listaProdutosSelecionados = new SelectionModel<ServicoModel>(true, []);

  constructor(private servicoService: ServicoService,
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
    this.servicoService.obterServicos()
      .subscribe(res => {
        if (this.selecao && this.produtosSelecionados && this.produtosSelecionados?.length > 0) {
          const servicosReduzidos: ServicoModel[] = [];
          for (const produto of res)
          {
            if(!this.produtosSelecionados.some(x => x.id === produto.id)) {
              servicosReduzidos.push(produto);
            }
          }
          this.dataSource.data = servicosReduzidos;
        } else {
          this.dataSource.data = res;
        }
      });
  }

  submitSelecao(): void {
    this.selecaoFinalizada.emit(this.listaProdutosSelecionados.selected);
  }

  // editar(produto: ServicoModel): void {
  //   const dialogRef = this.dialog.open(PrestadorModalComponent,
  //     { data:
  //       {
  //         produto
  //       }
  //     });

  //   dialogRef.afterClosed().subscribe((formValue: any) =>
  //   {
  //     if(formValue) {
  //       const produtoEditado = new ServicoModel(formValue);

  editar(servicoModel: ServicoModel): void {
    const dialogRef = this.matDialog.open(SelecionaServicoModalComponent,
      {
        data:
        {
          servicoModel
        }
      });

    dialogRef.afterClosed().subscribe((formValue: any) => {
      if (formValue) {
        const produtoEditado = new ServicoModel(formValue);

        this.servicoService.editarServico(produtoEditado.id as number, produtoEditado)
          .subscribe(() => {
            this.messageService.success('Produto alterado com sucesso!');
            this.refresh();
          });
      }
    });

  }

  excluir(id: number) {
    this.servicoService.excluirProduto(id)
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
