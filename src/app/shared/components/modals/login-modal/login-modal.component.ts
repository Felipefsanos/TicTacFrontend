import { LoginService } from 'src/app/services/login.service';
import { LoginModel } from 'src/app/models/login.model';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TrocaSenhaModel } from 'src/app/models/troca-senha.model';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent {

  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: LoginModel,
    private loginService: LoginService,
    private dialogRef: MatDialogRef<LoginModalComponent>) {

    this.formulario = this.formBuilder.group({
      login: [data?.login, Validators.required],
      senhaAntiga: ['', [Validators.required, Validators.minLength(8)]],
      novaSenha: ['', [Validators.required, Validators.minLength(8)]],
      confirmaSenha: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    if (this.senhaAntiga.value !== atob(this.data?.password)) {
      this.senhaAntiga.setErrors({ mustMatch: true });
    }

    if (this.novaSenha.value === atob(this.data?.password)) {
      this.novaSenha.setErrors({ match: true });
    }

    if (this.novaSenha.value !== this.confirmaSenha.value) {
      this.confirmaSenha.setErrors({ mustMatch: true });
    }

    if (this.formulario.invalid) {
      return;
    }

    this.loginService.trocarSenha({
      login: this.data.login,
      novaSenha: btoa(this.novaSenha.value),
      senhaAntiga: this.data.password
    }).subscribe(() => {
        this.dialogRef.close(true);
      });
  }

  get senhaAntiga(): FormControl {
    return this.formulario.controls.senhaAntiga as FormControl;
  }

  get novaSenha(): FormControl {
    return this.formulario.controls.novaSenha as FormControl;
  }

  get confirmaSenha(): FormControl {
    return this.formulario.controls.confirmaSenha as FormControl;
  }


}
