import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ClienteModel } from 'src/app/models/cliente.model';
import { ContatoModel } from 'src/app/models/contato.model';
import { EnderecoLocalModel } from 'src/app/models/endereco-local.model';
import { OrcamentoModel } from 'src/app/models/orcamento.model';
import { OrcamentoService } from 'src/app/services/orcamento.service';
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
              private messageService: MessageService) {
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
    if (this.orcamentoForm.valid) {
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
    this.orcamentoModel = new OrcamentoModel(this.orcamentoForm.value);
    this.orcamentoModel.buffetPrincipal = JSON.parse(String(this.orcamentoModel.buffetPrincipal));
    this.orcamentoModel.local = new EnderecoLocalModel(this.enderecoForm.value);
    this.orcamentoModel.local.elevador = JSON.parse(String(this.orcamentoModel.local.elevador));
    this.orcamentoModel.local.restricaoHorario = JSON.parse(String(this.orcamentoModel.local.restricaoHorario));
    this.orcamentoModel.local.escada = JSON.parse(String(this.orcamentoModel.local.escada));
    this.orcamentoModel.cliente = new ClienteModel(this.informacoesClienteForm.value);

    this.orcamentoModel.cliente.contatos = [];
    for (const item of this.informacoesClienteForm.controls.contatos.value) {
      item.ddd = item.telefone.substring(0, 2);
      item.telefone = item.telefone.substring(2, item.telefone.length);
      this.orcamentoModel.cliente.contatos.push(item);
    }
  }
  getErrorMessageContatos(formGroupIndex: number, controlName: string): FormControl {
    const formGroup = this.contatos.controls[formGroupIndex] as FormGroup;
    return formGroup.get(controlName) as FormControl;
  }

  get contatos(): FormArray {
    return this.informacoesClienteForm.get('contatos') as FormArray;
  }

}
