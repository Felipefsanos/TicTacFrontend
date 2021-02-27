import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanalCaptacaoComponent } from './canal-captacao/canal-captacao.component';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: 'canal-captacao',
    component: CanalCaptacaoComponent
  }
];

@NgModule({
  declarations: [CanalCaptacaoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    FlexLayoutModule,
    SharedModule
  ]
})
export class ConfiguracoesModule { }
