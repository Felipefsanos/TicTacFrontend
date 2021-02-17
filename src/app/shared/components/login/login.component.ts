import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output()
  userLogged = new EventEmitter<boolean>();

  loginForm!: FormGroup;

  constructor(private fomrBuilder: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar ) {
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

    this.userLogged.emit(true);
    this.snackBar.open('Usuário logado.');
    this.router.navigate(['/p/home']);
  }

  get login(): FormControl {
    return this.loginForm.controls.login as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.controls.password as FormControl;
  }


}
