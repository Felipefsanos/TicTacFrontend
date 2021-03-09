import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovoProdutoComponent } from './novo-produto/novo-produto.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';



const routes: Routes = [
  {
    path: 'novoProduto',
    component: NovoProdutoComponent
  }
];

@NgModule({
  declarations: [NovoProdutoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FlexLayoutModule,
    MatIconModule,
  ]
})
export class ProdutoModule { }
