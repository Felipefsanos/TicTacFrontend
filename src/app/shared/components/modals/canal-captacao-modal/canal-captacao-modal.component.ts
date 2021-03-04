import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CanalCaptacaoModel } from 'src/app/models/canal-captacao.model';
import { ConfirmacaoModalComponent } from '../confirmacao-modal/confirmacao-modal.component';

@Component({
  selector: 'app-canal-captacao-modal',
  templateUrl: './canal-captacao-modal.component.html',
  styleUrls: ['./canal-captacao-modal.component.scss']
})
export class CanalCaptacaoModalComponent {

  titulo?: string;
  canalCaptacao?: CanalCaptacaoModel;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<CanalCaptacaoModalComponent>,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.titulo = data.titulo;
    this.canalCaptacao = data.canalCaptacao as CanalCaptacaoModel;

    this.form = this.formBuilder.group({
      id: [{ value: this.canalCaptacao.id, disabled: true }, Validators.required],
      canal: [this.canalCaptacao.canal, Validators.required]
    });
  }

  enviarFormulario(): void {
    console.log(this.form);
    if (this.form.invalid) {
      return;
    }

    this.dialogRef.close(this.form.getRawValue());
  }

}
