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
import { UsuariosComponent } from './components/listagem/usuarios/usuarios.component';
import { UsuarioModalComponent } from './components/modals/usuario-modal/usuario-modal.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProdutoFormularioComponent } from './components/formularios/produto-formulario/produto-formulario.component';
import { PrestadorFormularioComponent } from './components/formularios/prestador-formulario/prestador-formulario.component';
import { PrestadoresComponent } from './components/listagem/prestadores/prestadores.component';
import { PrestadorModalComponent } from './components/modals/prestador-modal/prestador-modal.component';
import { ProdutoComponent } from './components/listagem/produto/produto.component';
import { ProdutoModalComponent } from './components/modals/produto-modal/produto-modal.component';
import { ComponenteModelComponent } from './components/modals/componente-model/componente-model.component';
import { ComponenteFormularioComponent } from './components/formularios/componente-formulario/componente-formulario.component';
import { ComponenteComponent } from './components/listagem/componente/componente.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SelecionaProdutoModalComponent } from './components/modals/seleciona-produto-modal/seleciona-produto-modal.component';
import { SelecionaServicoModalComponent } from './components/modals/seleciona-servico-modal/seleciona-servico-modal.component';
import { ServicosComponent } from './components/listagem/servicos/servicos.component';
import { ServicoModalComponent } from './components/modals/servico-modal/servico-modal.component';
import { ServicoFormularioComponent } from './components/formularios/servico-formulario/servico-formulario.component';

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
    ComponenteFormularioComponent,
    OrcamentoComponent,
    CanalCaptacaoComponent,
    CanalCaptacaoModalComponent,
    ConfirmacaoModalComponent,
    EnumToArrayPipe,
    UsuarioFormularioComponent,
    LoginModalComponent,
    UsuariosComponent,
    UsuarioModalComponent,
    ProdutoFormularioComponent,
    PrestadorFormularioComponent,
    PrestadoresComponent,
    PrestadorModalComponent,
    ProdutoComponent,
    ProdutoModalComponent,
    ComponenteComponent,
    ComponenteModelComponent,
    SelecionaProdutoModalComponent,
    SelecionaServicoModalComponent,
    ServicosComponent,
    ServicoModalComponent,
    ServicoFormularioComponent
  ],
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
    MatDividerModule,
    MatPaginatorModule,
    MatAutocompleteModule
  ],
  exports: [
    LoginComponent,
    LoadingComponent,
    ClienteFormularioComponent,
    ProdutoFormularioComponent,
    OrcamentoFormularioComponent,
    ComponenteFormularioComponent,
    OrcamentoComponent,
    CanalCaptacaoComponent,
    MatDialogModule,
    UsuarioFormularioComponent,
    UsuariosComponent,
    ProdutoFormularioComponent,
    ProdutoComponent,
    PrestadorFormularioComponent,
    PrestadoresComponent,
    ComponenteComponent,
    SelecionaProdutoModalComponent,
    ServicoFormularioComponent,
    ServicosComponent
  ]
})
export class SharedModule { }
