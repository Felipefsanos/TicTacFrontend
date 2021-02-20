import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovoClienteComponent } from './novo-cliente/novo-cliente.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'novo',
    component: NovoClienteComponent
  }
];

@NgModule({
  declarations: [NovoClienteComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)

  ]
})
export class ClientesModule { }
