import { UsuarioModel } from './../../../../models/usuario.model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CanalCaptacaoModel } from 'src/app/models/canal-captacao.model';

@Component({
  selector: 'app-usuario-modal',
  templateUrl: './usuario-modal.component.html',
  styleUrls: ['./usuario-modal.component.scss']
})
export class UsuarioModalComponent {

  form: FormGroup;
  usuario: UsuarioModel;

  constructor(private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<UsuarioModalComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any) {
    this.usuario = this.data.usuario;

    this.form = this.formBuilder.group({
      cpf: [{ value: this.usuario.cpf, disabled: true}],
      nome: [this.usuario.nome, [Validators.required, Validators.min(3)]],
      telefone: [this.usuario.telefone, Validators.required]
    });
  }

  enviarFormulario(): void {
    if (this.form.invalid) {
      return;
    }

    this.dialogRef.close(this.form.value);
  }
}
