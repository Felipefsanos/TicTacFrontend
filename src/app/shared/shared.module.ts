import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ExpiredSessionComponent } from './components/expired-session/expired-session.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoadingComponent } from './components/loading/loading.component';
import { ClienteFormularioComponent } from './components/formularios/cliente-formulario/cliente-formulario.component';
import { NgxMaskModule } from 'ngx-mask';
import { MatStepperModule } from '@angular/material/stepper';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { OrcamentoFormularioComponent } from './components/formularios/orcamento-formulario/orcamento-formulario.component';
import { OrcamentoComponent } from './components/listagem/orcamento/orcamento.component';
import { MatTableModule } from '@angular/material/table';
import { CanalCaptacaoComponent } from './components/listagem/canal-captacao/canal-captacao.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CanalCaptacaoModalComponent } from './components/modals/canal-captacao-modal/canal-captacao-modal.component';
import { MatDividerModule } from '@angular/material/divider';
import { ConfirmacaoModalComponent } from './components/modals/confirmacao-modal/confirmacao-modal.component';
import { EnumToArrayPipe } from './pipes/enum-to-array.pipe';
import { UsuarioFormularioComponent } from './components/formularios/usuario-formulario/usuario-formulario.component';
import { LoginModalComponent } from './components/modals/login-modal/login-modal.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'sessao-expirada',
    component: ExpiredSessionComponent
  }
];

@NgModule({
  declarations: [
    LoginComponent,
    NotfoundComponent,
    ExpiredSessionComponent,
    LoadingComponent,
    ClienteFormularioComponent,
    OrcamentoFormularioComponent,
    OrcamentoComponent,
    CanalCaptacaoComponent,
    CanalCaptacaoModalComponent,
    ConfirmacaoModalComponent,
    EnumToArrayPipe,
    UsuarioFormularioComponent,
    LoginModalComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatCardModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule.forChild(routes),
    NgxMaskModule.forRoot(),
    MatStepperModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDialogModule,
    MatTableModule,
    MatTooltipModule,
    MatDividerModule
  ],
  exports: [
    LoginComponent,
    LoadingComponent,
    ClienteFormularioComponent,
    OrcamentoFormularioComponent,
    OrcamentoComponent,
    CanalCaptacaoComponent,
    MatDialogModule,
    UsuarioFormularioComponent
  ]
})
export class SharedModule { }
