import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovoOrcamentoComponent } from './novo-orcamento/novo-orcamento.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'src/app/shared/shared.module';

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
    RouterModule.forChild(routes),
    SharedModule,
    FlexLayoutModule,
    MatIconModule,
  ]
})
export class OrcamentosModule { }
