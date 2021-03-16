import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
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
export class PrestadorFormularioComponent {

  @ViewChild('stepper')
  stepper?: MatStepper;

  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private cepService: CepService,
    private prestadorService: PrestadorService,
    private messageService: MessageService)
  {
    this.formulario = formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cpf: ['', Validators.required],
      endereco: this.formBuilder.group({
        cep: ['', Validators.required],
        bairro: ['', Validators.required],
        cidade: ['', Validators.required],
        numero: [''],
        estado: ['', Validators.required],
        complemento: [''],
        logradouro: ['', Validators.required]
      }),
      contatos: this.formBuilder.array([
        this.formBuilder.group({
          telefone: ['', Validators.required],
          contato: [''],
          email: ['', Validators.email]
        }),
        this.formBuilder.group({
          telefone: ['', Validators.required],
          contato: [''],
          email: ['', Validators.email]
        })
      ])
    });
  }

  onSubmit(): void {
    if (this.formulario.invalid) {
      return;
    }

    this.prestadorService.criarPrestador(this.formulario.value as PrestadorModel)
        .subscribe(() => {
          this.messageService.success('Prestador criado com sucesso');
          this.formulario.reset();
          this.stepper?.reset();
        });
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
