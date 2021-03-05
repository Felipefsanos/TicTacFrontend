import { LoginModalComponent } from './../modals/login-modal/login-modal.component';
import { MatDialog } from '@angular/material/dialog';

import { TokenService } from './../../services/token.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/models/login.model';
import { LoginService } from 'src/app/services/login.service';
import { MessageService } from '../../services/message.service';
import { TokenModel } from '../../models/token.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(private fomrBuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private loginService: LoginService,
    private tokenService: TokenService,
    private dialog: MatDialog) {
    this.construirFormulario();
  }

  construirFormulario(): void {
    this.loginForm = this.fomrBuilder.group({
      login: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit(): void {

    if (this.loginForm.invalid) {
      return;
    }

    this.loginForm.value.password = btoa(this.loginForm.value.password);

    this.loginService.realizarLogin(this.loginForm.value as LoginModel)
      .subscribe(token => {
        if (token.primeiroAcesso) {
          const dialog = this.dialog.open(LoginModalComponent, { data: this.loginForm.value, disableClose: true });

          dialog.afterClosed()
            .subscribe((res: boolean) => {
              this.messageService.success('Nova Senha criada com sucesso!');
              this.password.setValue('');
            });

        } else {

          try {
            this.difinirToken(token);
          } catch (e) {
            console.log(e);
          }
        }
      });
  }

  private difinirToken(token: TokenModel) {
    this.tokenService.setToken(token);
    this.messageService.success('Login realizado!', 'OK');
    this.router.navigate(['/p/home']);
  }

  get login(): FormControl {
    return this.loginForm.controls.login as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.controls.password as FormControl;
  }


}
