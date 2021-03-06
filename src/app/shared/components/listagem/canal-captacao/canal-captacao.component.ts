import { CanalCaptacaoModel } from './../../../../models/canal-captacao.model';
import { CanalCaptacaoService } from './../../../../services/canal-captacao.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CanalCaptacaoModalComponent } from '../../modals/canal-captacao-modal/canal-captacao-modal.component';
import { MessageService } from 'src/app/shared/services/message.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-canal-captacao-listagem',
  templateUrl: './canal-captacao.component.html',
  styleUrls: ['./canal-captacao.component.scss']
})
export class CanalCaptacaoComponent implements AfterViewInit {

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  dataSource = new MatTableDataSource<CanalCaptacaoModel>();

  constructor(private canalCaptacaoService: CanalCaptacaoService,
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
    this.canalCaptacaoService.obterCanaisCaptacao()
      .subscribe(res => {
        this.dataSource.data = res;
      });
  }

  editar(canalCaptacao: CanalCaptacaoModel): void {
    const dialogRef = this.dialog.open(CanalCaptacaoModalComponent,
      {
        data:
        {
          titulo: 'Editar canal de captação',
          canalCaptacao
        }
      });

    dialogRef.afterClosed().subscribe((canalEditado: CanalCaptacaoModel) => {
      if (canalEditado) {
        this.canalCaptacaoService.alterarCanalCaptacao(canalCaptacao.id, canalEditado)
          .subscribe(() => {
            this.messageService.success('Canal de captação alterado com sucesso!');
            this.refresh();
          });
      }
    });

  }


}
