import { OrcamentoModel } from './../../../../models/orcamento.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { OrcamentoService } from 'src/app/services/orcamento.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
 
 

@Component({
  selector: 'app-orcamento',
  templateUrl: './orcamento.component.html',
  styleUrls: ['./orcamento.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class OrcamentoComponent implements OnInit {
  columnsToDisplay : string[] = ['id','dataEvento', 'tipoEvento', 'buffetPrincipal', 'observacao'];
  columnsToName : string[] = ['id','dataEvento', 'tipoEvento', 'buffetPrincipal', 'observacao'];
  dataSource = new MatTableDataSource<OrcamentoModel>();
  expandedElement: any | null;
  
  constructor(  private orcamentoService: OrcamentoService,
    private messageService: MessageService) { }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editar(id: number): void {

  }
  excluir(id: number): void {

  }

  ngOnInit() {
    debugger;
    this.refresh();
  }

  refresh() {
    this.orcamentoService.obterOrcamentos()
    .subscribe(res => {
      try {
        this.dataSource.data = res;
      } catch (e) {
        this.messageService.warn("Erro ao listar orçamentos!");
      }
    },(error=>  this.messageService.warn("Favor validar: " + error.error.message)));
  }
}
