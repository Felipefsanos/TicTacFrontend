import { OrcamentoModalComponent } from './../../modals/orcamento-modal/orcamento-modal.component';
import { ConfimacaoModalModel } from './../../../models/confirmacao-modal.model';
import { MatDialog } from '@angular/material/dialog';
import { OrcamentoModel } from './../../../../models/orcamento.model';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { OrcamentoService } from 'src/app/services/orcamento.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MaskApplierService, MaskPipe } from 'ngx-mask';
import { ConfirmacaoModalComponent } from '../../modals/confirmacao-modal/confirmacao-modal.component';

@Component({
  selector: 'app-orcamento',
  templateUrl: './orcamento.component.html',
  styleUrls: ['./orcamento.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class OrcamentoComponent implements AfterViewInit {

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  columnsToDisplay: string[] = ['id', 'cliente', 'dataEvento', 'telefone', 'valor', 'acoes'];
  columnsToName: string[] = ['Número', 'Cliente', 'Data do Evento', 'Telefone', 'Valor', 'Ações'];
  dataSource = new MatTableDataSource<OrcamentoModel>();
  expandedElement: any | null;

  constructor(private orcamentoService: OrcamentoService,
    private messageService: MessageService,
    private maskService: MaskApplierService,
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

  editar(orcamento: OrcamentoModel): void {
    const dialogRef = this.matDialog.open(OrcamentoModalComponent);
  }

  excluir(id: number): void {
    const dialogRef = this.matDialog.open(ConfirmacaoModalComponent,
      {
        data: new ConfimacaoModalModel('Alerta', undefined, 'Tem certeza que deseja excluir o orçamento?')
      });

    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.orcamentoService.removerOrcamento(id).subscribe(
          () => {
            this.messageService.success(`Orçamento ${id} excluído com sucesso.`);
            this.refresh();
          }
        );
      }
    });
  }

  formatarTelefone(ddd: number, numero: number): string {
    return new MaskPipe(this.maskService).transform(`${ddd}${numero}`, '(00) 00000-0000 | (00) 0000-0000');
  }

  refresh(): void {
    this.orcamentoService.obterOrcamentos()
      .subscribe(res => {
        try {
          debugger;
          this.dataSource.data = res;
          console.log(res);
        } catch (e) {
          this.messageService.warn('Erro ao listar orçamentos!');
        }
      });
  }

}
