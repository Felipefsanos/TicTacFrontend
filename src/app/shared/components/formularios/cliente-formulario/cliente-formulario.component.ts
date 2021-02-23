import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';

 

@Component({
  selector: 'app-cliente-formulario',
  templateUrl: './cliente-formulario.component.html',
  styleUrls: ['./cliente-formulario.component.scss']
})

export class ClienteFormularioComponent implements OnInit {

 
  informacoesClienteForm: FormGroup = new FormGroup({});
  informacoesEnderecoForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder)
  {
    this.construirFormularioInformacoesCliente();
  }

  ngOnInit(): void {
  }

  construirFormularioInformacoesCliente(): void {
    this.informacoesClienteForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(5)]],
      cpfCnpj: [''],
      contatos: this.formBuilder.array([
        this.formBuilder.group({
          telefone: ['', Validators.required],
          contato: [''],
          email: ['', Validators.email]
        })
      ]),
      observacao: ['']
    });
    this.informacoesEnderecoForm = this.formBuilder.group({
      cep: [''],
      bairro: [''],
      cidade: [''],
      numero: [''],
      estado: [''],
      complemento: [''],
      logradouro: ['']
    });
  }

  printForm(): void {
    console.log(this.informacoesClienteForm);
  }

  getErrorMessageContatos(formGroupIndex: number, controlName: string): FormControl {
    const formGroup = this.contatos.controls[formGroupIndex] as FormGroup;
    return formGroup.get(controlName) as FormControl;
  }

  get contatos(): FormArray {
    return this.informacoesClienteForm.get('contatos') as FormArray;
  }
}
