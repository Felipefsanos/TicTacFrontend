import { CanalCaptacaoModel } from './../../../../models/canal-captacao.model';
import { CanalCaptacaoService } from './../../../../services/canal-captacao.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CanalCaptacaoModalComponent } from '../../modals/canal-captacao-modal/canal-captacao-modal.component';

@Component({
  selector: 'app-canal-captacao-listagem',
  templateUrl: './canal-captacao.component.html',
  styleUrls: ['./canal-captacao.component.scss']
})
export class CanalCaptacaoComponent implements OnInit {

  dataSource = new MatTableDataSource<CanalCaptacaoModel>();

  constructor(private canalCaptacaoService: CanalCaptacaoService,
              private dialog: MatDialog) {
    this.refresh();
  }

  ngOnInit(): void {
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
      { data:
        {
          titulo: 'Editar canal de captação',
          canalCaptacao
        }
      });

    dialogRef.afterClosed().subscribe((canalEditado: CanalCaptacaoModel) =>
    {
      // TODO: Enviar para a API.
    });

  }


}
