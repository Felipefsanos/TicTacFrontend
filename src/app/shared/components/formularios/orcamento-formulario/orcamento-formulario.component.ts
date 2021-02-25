import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-orcamento-formulario',
  templateUrl: './orcamento-formulario.component.html',
  styleUrls: ['./orcamento-formulario.component.scss']
})
export class OrcamentoFormularioComponent implements OnInit {

 
 
  informacoesClienteForm: FormGroup = new FormGroup({});
  informacoesOrcamentoForm: FormGroup = new FormGroup({});
  informacoesEnderecoForm: FormGroup = new FormGroup({});
  informacoesSubmitForm: FormGroup = new FormGroup({});

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
      logradouro: [''],
      tamanhoLocal: [''],
      escada: [''],
      elevador: [''],
      restricaoHorario: [''],
    });
    this.informacoesOrcamentoForm = this.formBuilder.group({
      dataEvento: [''],
      tipoEvento: [''],
      quantidadeAdultos: [''],
      quantidadeCriancas: [''],
      buffetPrincipal: [''],
      observacao: [''],
    });
  }

  printForm(): void {
    console.log(this.informacoesClienteForm);
  }

  OnSubmit() : void {
    this.montarFormularioSubmit();
   debugger;
  }

  montarFormularioSubmit(): void {
  }


  getErrorMessageContatos(formGroupIndex: number, controlName: string): FormControl {
    const formGroup = this.contatos.controls[formGroupIndex] as FormGroup;
    return formGroup.get(controlName) as FormControl;
  }

  get contatos(): FormArray {
    return this.informacoesClienteForm.get('contatos') as FormArray;
  }


}
