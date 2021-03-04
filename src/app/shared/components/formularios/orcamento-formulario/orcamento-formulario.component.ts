import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { OrcamentoModel } from 'src/app/models/orcamento.model';
import { OrcamentoService } from 'src/app/services/orcamento.service';
import { TiposEvento } from 'src/app/shared/models/tipos-evento-enum.model';
import { ViaCepEnderecoModel } from 'src/app/shared/models/viacep-endereco.model';
import { CepService } from 'src/app/shared/services/cep.service';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-orcamento-formulario',
  templateUrl: './orcamento-formulario.component.html',
  styleUrls: ['./orcamento-formulario.component.scss'],

})
export class OrcamentoFormularioComponent {

  @ViewChild('stepper')
  stepper?: MatHorizontalStepper;

  orcamentoModel = new OrcamentoModel();
  orcamentoForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder,
              private orcamentoService: OrcamentoService,
              private messageService: MessageService,
              private cepService: CepService) {
    this.construirFormularios();
  }

  construirFormularios(): void {

    // TODO: Remover valores fixos, por teste
    this.orcamentoForm = this.formBuilder.group({
      orcamento: this.formBuilder.group({
        dataEvento: [new Date(2021, 3, 3), Validators.required],
        horaEvento: ['1705', Validators.required],
        tipoEvento: ['Aniversario', Validators.required],
        quantidadeAdultos: [5, Validators.required],
        quantidadeCriancas: [5, Validators.required],
        buffetPrincipal: [false, Validators.required],
        observacao: ['Sem observações']
      }),
      cliente: this.formBuilder.group({
        nome: ['Felipe Rodrigues Ferreira Santos', [Validators.required, Validators.minLength(5)]],
        cpfCnpj: ['11089960603'],
        canalCaptacaoId: [2, Validators.required],
        contatos: this.formBuilder.array([
          this.formBuilder.group({
            telefone: ['31975155261', Validators.required],
            nomeContato: ['Felipe Rodrigues', Validators.required],
            email: ['lipe2008.lipao@gmail.com', Validators.email],
            ddd: ['31']
          })
        ]),
        observacao: ['Sem observações']
      }),
      endereco: this.formBuilder.group({
        cep: ['32315020', Validators.required],
        bairro: ['Eldorado', Validators.required],
        cidade: ['Contagem', Validators.required],
        numero: ['1885'],
        estado: ['MG', Validators.required],
        complemento: ['Casa 2'],
        logradouro: ['Rua José Barra do Nascimento', Validators.required],
        tamanhoLocal: [500, Validators.required],
        escada: [true, Validators.required],
        elevador: [false, Validators.required],
        restricaoHorario: [false, Validators.required]
      }),
      servicos: {}
    });
  }

  onSubmit(): void {

    if (this.orcamentoForm.invalid) {
      return;
    }

    this.orcamentoService.novoOrcamento(this.orcamentoModel)
      .subscribe(res => {
        try {
          this.messageService.success('Orçamento salvo som sucesso!');
        } catch (e) {
          this.messageService.warn('Erro ao salvar orçamento!');
        }
      }, (error => this.messageService.warn('Favor validar: ' + error.error.message)));
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
          this.enderecoFormGroup.controls.cep.setErrors({ cepInvalido: true });
        } else {
          this.definirEndereco(resp);
        }
      });
  }

  definirEndereco(resp: ViaCepEnderecoModel): void {
    this.enderecoFormGroup.patchValue({
      cep: resp.cep,
      logradouro: resp.logradouro,
      bairro: resp.bairro,
      cidade: resp.localidade,
      estado: resp.uf
    });
  }

  abrirModalCalculoValorOrcamento(): void{
    if (this.orcamentoForm.invalid) {
      return;
    }

    this.stepper?.next();
  }

  getFormControlContatos(formGroupIndex: number, controlName: string): FormControl {
    const formGroup = this.contatos.controls[formGroupIndex] as FormGroup;
    return formGroup.get(controlName) as FormControl;
  }

  get contatos(): FormArray {
    return this.clienteFormGroup.controls.contatos as FormArray;
  }

  get orcamentoFormGroup(): FormGroup {
    return this.orcamentoForm.controls.orcamento as FormGroup;
  }

  get clienteFormGroup(): FormGroup {
    return this.orcamentoForm.controls.cliente as FormGroup;
  }

  get enderecoFormGroup(): FormGroup {
    return this.orcamentoForm.controls.endereco as FormGroup;
  }

  get produtosFormGroup(): FormGroup {
    return this.orcamentoForm.controls.produtos as FormGroup;
  }

  get tiposEvento(): any {
    return TiposEvento;
  }
}
