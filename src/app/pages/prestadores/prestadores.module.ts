import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovoPrestadorComponent } from './novo-prestador/novo-prestador.component';
import { FlexLayoutModule } from '@angular/flex-layout';

const routes: Routes = [
  {
    path: 'novo',
    component: NovoPrestadorComponent
  }
];

@NgModule({
  declarations: [NovoPrestadorComponent],
  imports: [
    CommonModule,
    SharedModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
    MatIconModule
  ]
})
export class PrestadoresModule { }
