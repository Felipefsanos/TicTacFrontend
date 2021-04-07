import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ServicoModel } from 'src/app/models/servico.model';
import { ServicoService } from 'src/app/services/servico.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { ServicoModalComponent } from '../../modals/servico-modal/servico-modal.component';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.scss']
})
export class ServicosComponent implements AfterViewInit {

  @Input()
  selecao = false;

  @Input()
  servicosSelecionados?: ServicoModel[];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @Output()
  selecaoFinalizada = new EventEmitter<ServicoModel[]>();

  dataSource = new MatTableDataSource<ServicoModel>();
  displayedColumns: string[] = [];
  listaServicosSelecionados = new SelectionModel<ServicoModel>(true, []);

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
    const numSelected = this.listaServicosSelecionados.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    if (this.isAllSelected()) {
      this.listaServicosSelecionados.clear();
    } else {
      this.dataSource.data.forEach(row => this.listaServicosSelecionados.select(row));
    }
  }

  refresh(): void {
    this.servicoService.obterServicos()
      .subscribe(res => {
        if (this.selecao && this.servicosSelecionados && this.servicosSelecionados?.length > 0) {
          const servicosReduzidos: ServicoModel[] = [];
          for (const servico of res)
          {
            if(!this.servicosSelecionados.some(x => x.id === servico.id)) {
              servicosReduzidos.push(servico);
            }
          }
          this.dataSource.data = servicosReduzidos;
        } else {
          this.dataSource.data = res;
        }
      });
  }

  submitSelecao(): void {
    this.selecaoFinalizada.emit(this.listaServicosSelecionados.selected);
  }

  editar(servico: ServicoModel): void {
    const dialogRef = this.matDialog.open(ServicoModalComponent,
      {
        data:
        {
          servico
        }
      });

    dialogRef.afterClosed().subscribe((formValue: any) => {
      if (formValue) {
        const servicoEditado = new ServicoModel(formValue);

        this.servicoService.editarServico(servicoEditado.id as number, servicoEditado)
          .subscribe(() => {
            this.messageService.success('Servico alterado com sucesso!');
            this.refresh();
          });
      }
    });

  }

  excluir(id: number) {
    this.servicoService.excluirServico(id)
      .subscribe(() => {
        this.messageService.success('servico excluído com sucesso!');
        this.refresh();
      });
  }

  getDisplayedColumns(): string[] {
    if (this.selecao) {
      return this.displayedColumns = ['select', 'nomeServico', 'descricao'];
    }
    return this.displayedColumns = ['id', 'nomeServico', 'descricao', 'acoes'];
  }
}
