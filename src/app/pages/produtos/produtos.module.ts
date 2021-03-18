import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovoProdutoComponent } from './novo-produto/novo-produto.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NovoSubProdutoComponent } from './novo-sub-produto/novo-sub-produto.component';
import { ListagemProdutoComponent } from './listagem-produto/listagem-produto.component';



const routes: Routes = [
  {
    path: 'novo-produto',
    component: NovoProdutoComponent
  },
  {
    path: 'novo-sub-produto',
    component: NovoSubProdutoComponent
  },
  {
    path: 'listagem-produto',
    component: ListagemProdutoComponent
  }
];

@NgModule({
  declarations: [NovoProdutoComponent, NovoSubProdutoComponent, ListagemProdutoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FlexLayoutModule,
    MatIconModule,
  ]
})
export class ProdutoModule { }
