import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovoProdutoComponent } from './novo-produto/novo-produto.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListagemProdutoComponent } from './listagem-produto/listagem-produto.component';
import { NovoComponenteComponent } from './novo-componente/novo-componente.component';



const routes: Routes = [
  {
    path: 'novo-produto',
    component: NovoProdutoComponent
  },
  {
    path: 'componente',
    component: NovoComponenteComponent
  },
  {
    path: 'listagem-produto',
    component: ListagemProdutoComponent
  }
];

@NgModule({
  declarations: [NovoProdutoComponent,  ListagemProdutoComponent, NovoComponenteComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FlexLayoutModule,
    MatIconModule,
  ]
})
export class ProdutoModule { }
