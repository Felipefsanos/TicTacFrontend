import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ComponenteModel } from 'src/app/models/componente.model';
import { ProdutoModel } from 'src/app/models/produto.model';
import { ComponenteService } from 'src/app/services/componente.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { ComponenteModelComponent } from '../../modals/componente-model/componente-model.component';

@Component({
  selector: 'app-componente',
  templateUrl: './componente.component.html',
  styleUrls: ['./componente.component.scss']
})
export class ComponenteComponent implements AfterViewInit {
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  dataSource = new MatTableDataSource<ProdutoModel>();

  constructor(private componenteService: ComponenteService,
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
    this.componenteService.obterTodosComponentes()
      .subscribe(res => {
        this.dataSource.data = res;
      });
  }

  editar(componente: ComponenteModel): void {
    const dialogRef = this.dialog.open(ComponenteModelComponent,
      { data:
        {
          componente
        }
      });

    dialogRef.afterClosed().subscribe((formValue: any) =>
    {
      if(formValue) {
        const ComponenteEditado = new ComponenteModel(formValue);

        this.componenteService.editarPrestador(ComponenteEditado.id as number, ComponenteEditado)
            .subscribe(() => {
              this.messageService.success('Usuário alterado com sucesso!');
              this.refresh();
            });
      }
    });

  }

  excluir(id: number) {
    this.componenteService.excluirComponente(id)
        .subscribe(() => {
          this.messageService.success('Componente excluído com sucesso!');
          this.refresh();
        });
  }

}
