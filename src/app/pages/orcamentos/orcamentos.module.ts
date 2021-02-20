import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovoOrcamentoComponent } from './novo-orcamento/novo-orcamento.component';

const routes: Routes = [
  {
    path: 'novo',
    component: NovoOrcamentoComponent
  }
];

@NgModule({
  declarations: [NovoOrcamentoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class OrcamentosModule { }
