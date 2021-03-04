import { SharedModule } from 'src/app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovoUsuarioComponent } from './novo-usuario/novo-usuario.component';
import { ListagemUsuariosComponent } from './listagem-usuarios/listagem-usuarios.component';
import { Routes, RouterModule } from '@angular/router';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'novo-usuario',
    component: NovoUsuarioComponent
  },
  {
    path: '',
    component: ListagemUsuariosComponent
  }
]


@NgModule({
  declarations: [NovoUsuarioComponent, ListagemUsuariosComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatIconModule,
    FlexLayoutModule,
    FormsModule
  ]
})
export class UsuariosModule { }
