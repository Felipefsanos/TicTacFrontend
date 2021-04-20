import { FormGroup, FormBuilder, Validators, FormArray, FormControl, FormGroupDirective } from '@angular/forms';
import { Component, EventEmitter, Input, Output, ViewChild, OnInit } from '@angular/core';
import { CepService } from 'src/app/shared/services/cep.service';
import { ViaCepEnderecoModel } from 'src/app/shared/models/viacep-endereco.model';
import { PrestadorService } from 'src/app/services/prestador.service';
import { PrestadorModel } from 'src/app/models/prestador.model';
import { MessageService } from 'src/app/shared/services/message.service';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-prestador-formulario',
  templateUrl: './prestador-formulario.component.html',
  styleUrls: ['./prestador-formulario.component.scss']
})
export class PrestadorFormularioComponent implements OnInit {

  @Input()
  prestador?: PrestadorModel;

  @Output()
  formularioEnviado = new EventEmitter<PrestadorModel>();

  edicao = false;

  @ViewChild('stepper')
  stepper?: MatStepper;

  @ViewChild (FormGroupDirective)
  formGroupDirective!: FormGroupDirective;

  formulario = new FormGroup({});

  constructor(private formBuilder: FormBuilder,
    private cepService: CepService,
    private prestadorService: PrestadorService,
    private messageService: MessageService) {
  }

  ngOnInit(): void {

    this.edicao = this.prestador ? true : false;

    this.formulario = this.formBuilder.group({
      nome: [this.prestador?.nome, [Validators.required, Validators.minLength(3)]],
      cpf: [{ value: this.prestador?.cpf, disabled: this.edicao }, Validators.required],
      endereco: this.formBuilder.group({
        cep: [this.prestador?.endereco.cep, Validators.required],
        bairro: [this.prestador?.endereco.bairro, Validators.required],
        cidade: [this.prestador?.endereco.cidade, Validators.required],
        numero: [this.prestador?.endereco.numero],
        estado: [this.prestador?.endereco.estado, Validators.required],
        complemento: [this.prestador?.endereco.complemento],
        logradouro: [this.prestador?.endereco.logradouro, Validators.required]
      }),
      contatos: this.formBuilder.array([
        this.formBuilder.group({
          telefone: [`${this.prestador?.contatos[0].ddd}${this.prestador?.contatos[0].telefone}`, Validators.required],
          contato: [this.prestador?.contatos[0].nomeContato],
          email: [this.prestador?.contatos[0].email, Validators.email]
        }),
        this.formBuilder.group({
          telefone: [`${this.prestador?.contatos[1].ddd}${this.prestador?.contatos[1].telefone}`, Validators.required],
          contato: [this.prestador?.contatos[1].nomeContato],
          email: [this.prestador?.contatos[1].email, Validators.email]
        })
      ])
    });
  }

  onSubmit(): void {
    if (this.formulario.invalid) {
      return;
    }

    this.formularioEnviado.emit(this.formulario.value as PrestadorModel);

    this.stepper?.reset();
    this.formGroupDirective.resetForm();

  }

  buscarCep(cep: string): void {
    if (cep === '_____-___') { // Valor da máscara do CEP
      return;
    }
    const cepNumber = cep.replace('-', '');

    if (cepNumber.length < 8) {
      return;
    }

    this.cepService.consultarCep(+cepNumber)
      .subscribe(resp => {

        if (resp.erro && resp.erro === true) {
          this.endereco.controls.cep.setErrors({ cepInvalido: true });
        } else {
          this.definirEndereco(resp);
        }
      });
  }

  definirEndereco(resp: ViaCepEnderecoModel): void {
    this.endereco.patchValue({
      cep: resp.cep,
      logradouro: resp.logradouro,
      bairro: resp.bairro,
      cidade: resp.localidade,
      estado: resp.uf
    });
  }

  getErrorMessageContatos(formGroupIndex: number, controlName: string): FormControl {
    const formGroup = this.contatos.controls[formGroupIndex] as FormGroup;
    return formGroup.get(controlName) as FormControl;
  }

  get contatos(): FormArray {
    return this.formulario.get('contatos') as FormArray;
  }

  get endereco(): FormGroup {
    return this.formulario.get('endereco') as FormGroup;
  }

}
