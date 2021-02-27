import { OrcamentoModel } from './../../../../models/orcamento.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { OrcamentoService } from 'src/app/services/orcamento.service';
import { MessageService } from 'src/app/shared/services/message.service';
 
@Component({
  selector: 'app-orcamento',
  templateUrl: './orcamento.component.html',
  styleUrls: ['./orcamento.component.scss']
})
export class OrcamentoComponent implements OnInit {
  displayedColumns: string[] = ['dataEvento', 'tipoEvento', 'buffetPrincipal', 'observacao','acao'];
  dataSource = new MatTableDataSource<OrcamentoModel>();
  
  constructor(  private orcamentoService: OrcamentoService,
    private messageService: MessageService) { }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
