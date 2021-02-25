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
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { OrcamentoFormularioComponent } from './components/formularios/orcamento-formulario/orcamento-formulario.component';
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
  declarations: [LoginComponent, NotfoundComponent, ExpiredSessionComponent, LoadingComponent, ClienteFormularioComponent, OrcamentoFormularioComponent],
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
    //MatMomentDateModule,
  ],
  exports: [
    LoginComponent,
    LoadingComponent,
    ClienteFormularioComponent,
    OrcamentoFormularioComponent
  ]
})
export class SharedModule { }
