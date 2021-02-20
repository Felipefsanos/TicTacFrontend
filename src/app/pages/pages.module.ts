import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { MatInputModule } from '@angular/material/input';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'clientes',
    loadChildren: () => import('./clientes/clientes.module').then(m => m.ClientesModule)
  },
  {
    path: 'orcamentos',
    loadChildren: () => import('./orcamentos/orcamentos.module').then(m => m.OrcamentosModule)
  }

];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    RouterModule.forChild(routes)
  ]
})
export class PagesModule { }
