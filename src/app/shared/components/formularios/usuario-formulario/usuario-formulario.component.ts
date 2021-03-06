import { StringValidator } from './../../../validators/string-validator';
import { UsuarioService } from './../../../../services/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-usuario-formulario',
  templateUrl: './usuario-formulario.component.html',
  styleUrls: ['./usuario-formulario.component.scss']
})
export class UsuarioFormularioComponent{

  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService,
    private messageService: MessageService) {
    this.formulario = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      telefone: ['', Validators.required],
      cpf: ['', Validators.required],
      login: ['', [Validators.required, Validators.minLength(8), StringValidator.noWhiteSpaces]]
    });
  }

  onSubmit(): void {

    if(this.formulario.invalid){
      return;
    }

    this.usuarioService.criarUsuario(this.formulario.value as UsuarioModel)
        .subscribe(() => {
          this.messageService.success('Usuário criado com sucesso!');
          this.formulario.reset('');
        });

  }


}
