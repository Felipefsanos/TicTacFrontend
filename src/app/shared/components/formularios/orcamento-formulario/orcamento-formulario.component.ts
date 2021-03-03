import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ClienteModel } from 'src/app/models/cliente.model';
import { ContatoModel } from 'src/app/models/contato.model';
import { EnderecoLocalModel } from 'src/app/models/endereco-local.model';
import { OrcamentoModel } from 'src/app/models/orcamento.model';
import { OrcamentoService } from 'src/app/services/orcamento.service';
import { ViaCepEnderecoModel } from 'src/app/shared/models/viacep-endereco.model';
import { CepService } from 'src/app/shared/services/cep.service';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-orcamento-formulario',
  templateUrl: './orcamento-formulario.component.html',
  styleUrls: ['./orcamento-formulario.component.scss'],

})
export class OrcamentoFormularioComponent implements OnInit {

  orcamentoModel = new OrcamentoModel();
  informacoesClienteForm: FormGroup = new FormGroup({});
  orcamentoForm: FormGroup = new FormGroup({});
  enderecoForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder,
              private orcamentoService: OrcamentoService,
              private messageService: MessageService,
              private cepService: CepService) {
    this.construirFormularioInformacoesCliente();
  }

  ngOnInit(): void {
  }

  construirFormularioInformacoesCliente(): void {

    this.informacoesClienteForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(5)]],
      cpfCnpj: [''],
      canalCaptacaoId: ['', Validators.required],
      contatos: this.formBuilder.array([
        this.formBuilder.group({
          telefone: ['', Validators.required],
          nomeContato: ['', Validators.required],
          email: ['', Validators.email],
          ddd: ['']
        })
      ]),
      observacao: ['']
    });
    this.enderecoForm = this.formBuilder.group({
      cep: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      numero: [''],
      estado: ['', Validators.required],
      complemento: [''],
      logradouro: ['', Validators.required],
      tamanhoLocal: ['', Validators.required],
      escada: ['', Validators.required],
      elevador: ['', Validators.required],
      restricaoHorario: ['', Validators.required],
    });
    this.orcamentoForm = this.formBuilder.group({
      dataEvento: ['', Validators.required],
      horaEvento: ['', Validators.required],
      tipoEvento: ['', Validators.required],
      quantidadeAdultos: ['', Validators.required],
      quantidadeCriancas: ['', Validators.required],
      buffetPrincipal: ['', Validators.required],
      observacao: [''],
    });
  }

  OnSubmit(): void {
    if (this.informacoesClienteForm.invalid) {
      return;
    }
    if (this.enderecoForm.value && this.enderecoForm.invalid) {
      return;
    }
    if (this.orcamentoForm.invalid) {
      return;
    }

    this.montarFormularioSubmit();

    this.orcamentoService.novoOrcamento(this.orcamentoModel)
      .subscribe(res => {
        try {
          this.messageService.success('Orçamento salvo som sucesso!');
        } catch (e) {
          this.messageService.warn('Erro ao salvar orçamento!');
        }
      }, (error => this.messageService.warn('Favor validar: ' + error.error.message)));
  }

  montarFormularioSubmit(): void {
    debugger;
    this.orcamentoModel = new OrcamentoModel(this.orcamentoForm.value);
    this.orcamentoModel.local = new EnderecoLocalModel(this.enderecoForm.value);
    this.orcamentoModel.cliente = new ClienteModel(this.informacoesClienteForm.value);

    // this.orcamentoModel.cliente.contatos = [];
    // for (const item of this.informacoesClienteForm.controls.contatos.value) {
    //   const contato = new ContatoModel()
    //   this.orcamentoModel.cliente.contatos.push(item);
    // }
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
          this.enderecoForm.controls.cep.setErrors({ cepInvalido: true });
        } else {
          this.definirEndereco(resp);
        }
      });
  }

  definirEndereco(resp: ViaCepEnderecoModel): void {
    this.enderecoForm.patchValue({
      cep: resp.cep,
      logradouro: resp.logradouro,
      bairro: resp.bairro,
      cidade: resp.localidade,
      estado: resp.uf
    });
  }

  getFormControlContatos(formGroupIndex: number, controlName: string): FormControl {
    const formGroup = this.contatos.controls[formGroupIndex] as FormGroup;
    return formGroup.get(controlName) as FormControl;
  }

  get contatos(): FormArray {
    return this.informacoesClienteForm.get('contatos') as FormArray;
  }

}
