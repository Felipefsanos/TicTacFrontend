import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovoClienteComponent } from './novo-cliente/novo-cliente.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxMaskModule } from 'ngx-mask';

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
    RouterModule.forChild(routes),
    SharedModule,
    FlexLayoutModule,
    MatIconModule,
  ]
})
export class ClientesModule { }
