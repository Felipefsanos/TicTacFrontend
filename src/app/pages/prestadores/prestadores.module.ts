import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovoPrestadorComponent } from './novo-prestador/novo-prestador.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ListaPrestadoresComponent } from './lista-prestadores/lista-prestadores.component';

const routes: Routes = [
  {
    path: '',
    component: ListaPrestadoresComponent
  },
  {
    path: 'novo',
    component: NovoPrestadorComponent
  }
];

@NgModule({
  declarations: [NovoPrestadorComponent, ListaPrestadoresComponent],
  imports: [
    CommonModule,
    SharedModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
    MatIconModule
  ]
})
export class PrestadoresModule { }
