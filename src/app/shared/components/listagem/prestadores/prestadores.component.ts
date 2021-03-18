import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ContatoModel } from 'src/app/models/base/contato.model';
import { PrestadorModel } from 'src/app/models/prestador.model';
import { PrestadorService } from 'src/app/services/prestador.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { PrestadorModalComponent } from '../../modals/prestador-modal/prestador-modal.component';

@Component({
  selector: 'app-prestadores',
  templateUrl: './prestadores.component.html',
  styleUrls: ['./prestadores.component.scss']
})
export class PrestadoresComponent implements AfterViewInit {

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  dataSource = new MatTableDataSource<PrestadorModel>();

  constructor(private prestadorService: PrestadorService,
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
    this.prestadorService.obterPrestadores()
      .subscribe(res => {
        this.dataSource.data = res;
      });
  }

  editar(prestador: PrestadorModel): void {
    const dialogRef = this.dialog.open(PrestadorModalComponent,
      { data:
        {
          prestador
        }
      });

    dialogRef.afterClosed().subscribe((formValue: any) =>
    {
      if(formValue) {
        const prestadorEditado = new PrestadorModel(formValue);

        this.prestadorService.editarPrestador(prestador.id as number, prestadorEditado)
            .subscribe(() => {
              this.messageService.success('Usuário alterado com sucesso!');
              this.refresh();
            });
      }
    });

  }

  excluir(id: number) {
    this.prestadorService.excluirPrestador(id)
        .subscribe(() => {
          this.messageService.success('Prestador excluído com sucesso!');
          this.refresh();
        });
  }

  getTelefoneCompleto(contato: ContatoModel): string {
    return `${contato.ddd}${contato.telefone}`;
  }

}
