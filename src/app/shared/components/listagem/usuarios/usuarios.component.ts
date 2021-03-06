import { MessageService } from './../../../services/message.service';
import { UsuarioModalComponent } from './../../modals/usuario-modal/usuario-modal.component';
import { UsuarioService } from './../../../../services/usuario.service';
import { UsuarioModel } from './../../../../models/usuario.model';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements AfterViewInit {

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  dataSource = new MatTableDataSource<UsuarioModel>();

  constructor(private usuarioService: UsuarioService,
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
    this.usuarioService.obterUsuarios()
      .subscribe(res => {
        this.dataSource.data = res;
      });
  }

  editar(usuario: UsuarioModel): void {
    const dialogRef = this.dialog.open(UsuarioModalComponent,
      { data:
        {
          usuario
        }
      });

    dialogRef.afterClosed().subscribe((usuarioEditado: UsuarioModel) =>
    {
      if(usuarioEditado) {
        this.usuarioService.editarUsuario(usuario.id as number, usuarioEditado)
            .subscribe(() => {
              this.messageService.success('Usuário alterado com sucesso!');
              this.refresh();
            });
      }
    });

  }


}
