import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovoServicoComponent } from './novo-servico/novo-servico.component';
import { ListaServicosComponent } from './lista-servicos/lista-servicos.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';

const routes: Routes = [
  {
    path: 'novo',
    component: NovoServicoComponent
  },
  {
    path: '',
    component: ListaServicosComponent
  }
];


@NgModule({
  declarations: [NovoServicoComponent, ListaServicosComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    CommonModule,
    MatIconModule,
    FlexLayoutModule
  ]
})
export class ServicosModule { }
