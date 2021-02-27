import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovoOrcamentoComponent } from './novo-orcamento/novo-orcamento.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListagemOrcamentosComponent } from './listagem-orcamentos/listagem-orcamentos.component';

const routes: Routes = [
  {
    path: 'novo',
    component: NovoOrcamentoComponent
  },
  {
    path: 'listagem',
    component: ListagemOrcamentosComponent
  }
];

@NgModule({
  declarations: [NovoOrcamentoComponent, ListagemOrcamentosComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FlexLayoutModule,
    MatIconModule,
  ]
})
export class OrcamentosModule { }
