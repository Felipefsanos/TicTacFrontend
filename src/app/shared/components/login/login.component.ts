import { TokenService } from './../../services/token.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/models/login.model';
import { LoginService } from 'src/app/services/login.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private fomrBuilder: FormBuilder,
              private router: Router,
              private messageService: MessageService,
              private loginService: LoginService,
              private tokenService: TokenService) {
    this.construirFormulario();
  }

  ngOnInit(): void {

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

    this.loginService.realizarLogin(this.loginForm.value as LoginModel)
      .subscribe(token => {
        try {
          this.tokenService.setToken(token);
          this.messageService.warn('Login realizado!', 'OK');
          this.router.navigate(['/p/home']);
        } catch (e) {
          console.log(e);
        }
      });
  }

  get login(): FormControl {
    return this.loginForm.controls.login as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.controls.password as FormControl;
  }


}
