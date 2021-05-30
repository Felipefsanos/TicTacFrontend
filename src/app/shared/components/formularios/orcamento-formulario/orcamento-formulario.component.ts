import { ContatoModel } from './../../../../models/base/contato.model';
import { EnderecoModel } from './../../../../models/base/endereco.model';
import { ClienteModel } from './../../../../models/cliente.model';
import { SelecionaProdutoModalComponent } from './../../modals/seleciona-produto-modal/seleciona-produto-modal.component';
import { ProdutoModel } from './../../../../models/produto.model';
import { MatDialog } from '@angular/material/dialog';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, FormGroupDirective } from '@angular/forms';
import { MatHorizontalStepper, MatStepper } from '@angular/material/stepper';
import { OrcamentoModel } from 'src/app/models/orcamento.model';
import { OrcamentoService } from 'src/app/services/orcamento.service';
import { TiposEvento } from 'src/app/shared/models/tipos-evento-enum.model';
import { ViaCepEnderecoModel } from 'src/app/shared/models/viacep-endereco.model';
import { CepService } from 'src/app/shared/services/cep.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { ServicoModel } from 'src/app/models/servico.model';
import { ProdutoService } from 'src/app/services/produto.service';
import { SelecionaServicoModalComponent } from '../../modals/seleciona-servico-modal/seleciona-servico-modal.component';
import { EnderecoLocalModel } from 'src/app/models/endereco-local.model';

@Component({
  selector: 'app-orcamento-formulario',
  templateUrl: './orcamento-formulario.component.html',
  styleUrls: ['./orcamento-formulario.component.scss'],

})
export class OrcamentoFormularioComponent implements OnInit {

  @Input()
  orcamento?: OrcamentoModel;

  @Output()
  formularioEnviado = new EventEmitter<OrcamentoModel>();

  edicao = false;

  @ViewChild('stepper')
  stepper?: MatStepper;

  @ViewChild (FormGroupDirective)
  formGroupDirective!: FormGroupDirective;

  lastFilter = '';
  step = 0;
  valorProtudos = 0;
  valorServicos = 0;

  orcamentoModel = new OrcamentoModel();
  orcamentoForm: FormGroup = new FormGroup({});

  produtosAnimaxo: ProdutoModel[] = [];
  servicosTicTac: ServicoModel[] = [];

  constructor(private formBuilder: FormBuilder,
    private orcamentoService: OrcamentoService,
    private messageService: MessageService,
    private cepService: CepService,
    private produtosService: ProdutoService,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.produtosService.obterProdutos().subscribe(prod => this.produtosAnimaxo = prod);
    this.construirFormularios();
  }

  construirFormularios(): void {
    this.edicao = this.orcamento ? true : false;

    // TODO: Remover valores fixos, por teste
    this.orcamentoForm = this.formBuilder.group({
      orcamento: this.formBuilder.group({
        dataEvento: [this.orcamento?.dataEvento, Validators.required],
        horaEvento: [this.orcamento?.dataEvento, Validators.required],
        tipoEvento: [ this.orcamento?.tipoEvento, Validators.required],
        quantidadeAdultos: [ this.orcamento?.quantidadeAdultos, Validators.required],
        quantidadeCriancas: [this.orcamento?.quantidadeCriancas, Validators.required],
        buffetPrincipal: [this.orcamento?.buffetPrincipal, Validators.required],
        observacao: [this.orcamento?.observacao]
      }),
      cliente: this.formBuilder.group({
        nome: [this.orcamento?.cliente.nome, [Validators.required, Validators.minLength(5)]],
        cpfCnpj: [this.orcamento?.cliente.cpfCnpj],
        canalCaptacaoId: [this.orcamento?.cliente.canalCaptacaoId, Validators.required],
        contatos: this.formBuilder.array([
          this.formBuilder.group({
            telefone: [' ', Validators.required],
            nomeContato: [' ', Validators.required],
            email: [''],
            ddd: ['']
          })
        ]),
        observacao: [this.orcamento?.cliente.observacao]
      }),
      local: this.formBuilder.group({
        cep: [this.orcamento?.local.cep , Validators.required],
        bairro: [this.orcamento?.local.bairro, Validators.required],
        cidade: [this.orcamento?.local.cidade, Validators.required],
        numero: [this.orcamento?.local.numero],
        estado: [this.orcamento?.local.estado, Validators.required],
        complemento: [this.orcamento?.local.complemento],
        logradouro: [this.orcamento?.local.logradouro, Validators.required],
        tamanhoLocal: [this.orcamento?.local.tamanhoLocal],
        escada: [this.orcamento?.local.escada, Validators.required],
        elevador: [this.orcamento?.local.elevador, Validators.required],
        restricaoHorario: [this.orcamento?.local.restricaoHorario, Validators.required]
      }),
      servicos: this.formBuilder.group({
        animaximo: this.formBuilder.array([]),
        tictac: this.formBuilder.array([]),
        valorFrete: [this.orcamento?.valorFrete, Validators.required]
      }),
  });
  if (this.orcamento?.produto) {
    this.orcamento?.produto.forEach(produto => {
      this.produtosAnimaximoForm.push(
        this.formBuilder.group({
          quantidade: [1, Validators.required],
          id: [produto.id, Validators.required],
          nome: [produto.nome, Validators.required],
          descricao: [produto.descricao, Validators.required],
          valor: [produto.valor, Validators.required]
        })
      );
    });
  }
  if (this.orcamento?.servico) {
    this.orcamento?.servico.forEach(servico => {
      this.servicosTicTacForm.push(
        this.formBuilder.group({
          quantidade: [0, Validators.required],
          id: [servico.id, Validators.required],
          nomeServico: [servico.nomeServico, Validators.required],
          descricao: [servico.descricao, Validators.required],
          valor: [0, Validators.required],
          observacao: ['']
        })
      );
    });
  }
  if (this.orcamento?.cliente.contatos) {
    this.clienteFormGroup.controls.contatos = new FormArray([]);;
    this.orcamento?.cliente.contatos.forEach(contato => {
      this.contatos.push(
        this.formBuilder.group({
           telefone: [contato.telefone, Validators.required],
            nomeContato: [contato.nomeContato, Validators.required],
            email: [contato.email],
            ddd: [contato.ddd]
        })
      );
    });
  }
  }

  onSubmit(): void {

    if (this.orcamentoForm.invalid) {
      return;
    }
    const orcamentoModelRequest = this.montarObjetoRequest();

    this.orcamentoService.novoOrcamento(orcamentoModelRequest)
      .subscribe(res => {
        try {
          this.stepper?.reset();
          this.formGroupDirective.resetForm();
          this.messageService.success('Orçamento salvo som sucesso!');
        } catch (e) {
          this.messageService.warn('Erro ao salvar orçamento!');
        }
      }, (error => this.messageService.warn('Favor validar: ' + error.error.message)));
  }

  montarObjetoRequest(): OrcamentoModel{
    const orcamentoModelForm = new OrcamentoModel();
    orcamentoModelForm.produto = [];
    orcamentoModelForm.servico = [];
    const produtos = this.orcamentoForm.value.servicos.animaximo as ProdutoModel[];
    const servicos = this.orcamentoForm.value.servicos.tictac as ServicoModel[];
    const contatos = this.orcamentoForm.value.cliente.contatos as ContatoModel[];
    this.orcamentoForm.value.cliente.contatos = [];
    produtos.forEach(produto => {
      orcamentoModelForm.produto.push(produto);
    });
    servicos.forEach(servico => {
      orcamentoModelForm.servico.push(servico);
    });
    contatos.forEach(contato => {
      contato.ddd = +String(contato.telefone).substr(0,2);
      this.orcamentoForm.value.cliente.contatos.push(contato);
    });
    orcamentoModelForm.cliente = this.orcamentoForm.value.cliente as ClienteModel;

    this.orcamentoForm.value.local.cep = String(this.orcamentoForm.value.local.cep).replace('-','');
    orcamentoModelForm.local = this.orcamentoForm.value.local as EnderecoLocalModel;
    orcamentoModelForm.valorFrete = this.orcamentoForm.value.servicos.valorFrete;
    orcamentoModelForm.dataEvento = this.orcamentoForm.value.orcamento.dataEvento;
    orcamentoModelForm.horaEvento = this.orcamentoForm.value.orcamento.horaEvento;
    orcamentoModelForm.valor = this.totalValor;
    orcamentoModelForm.tipoEvento = this.orcamentoForm.value.orcamento.tipoEvento;
    orcamentoModelForm.quantidadeAdultos = this.orcamentoForm.value.orcamento.quantidadeAdultos;
    orcamentoModelForm.quantidadeCriancas = this.orcamentoForm.value.orcamento.quantidadeCriancas;
    orcamentoModelForm.buffetPrincipal = this.orcamentoForm.value.orcamento.buffetPrincipal;
    orcamentoModelForm.observacao = this.orcamentoForm.value.orcamento.observacao;
    return orcamentoModelForm;
  }

editar(): void {

  if (this.orcamentoForm.invalid) {
    return;
  }
  const orcamentoModelRequest = this.montarObjetoRequest();
  this.formularioEnviado.emit(orcamentoModelRequest as OrcamentoModel);
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
          this.localFormGroup.controls.cep.setErrors({ cepInvalido: true });
        } else {
          this.definirLocal(resp);
        }
      });
  }

  definirLocal(resp: ViaCepEnderecoModel): void {
    this.localFormGroup.patchValue({
      cep: resp.cep,
      logradouro: resp.logradouro,
      bairro: resp.bairro,
      cidade: resp.localidade,
      estado: resp.uf
    });
  }

  abrirModalCalculoValorOrcamento(): void {
    if (this.orcamentoForm.invalid) {
      return;
    }

    this.stepper?.next();
  }

  getFormControlContatos(formGroupIndex: number, controlName: string): FormControl {
    const formGroup = this.contatos.controls[formGroupIndex] as FormGroup;
    return formGroup.get(controlName) as FormControl;
  }

  adicionarProdutosAnimaximo(): void {
    const dialogRef = this.dialog.open(SelecionaProdutoModalComponent, { data: this.produtosAnimaximoForm.value, width: '70%' });

    dialogRef.afterClosed().subscribe((produtos: ProdutoModel[]) => {
      if (produtos) {
        produtos.forEach(produto => {
          this.produtosAnimaximoForm.push(
            this.formBuilder.group({
              quantidade: [1, Validators.required],
              id: [produto.id, Validators.required],
              nome: [produto.nome, Validators.required],
              descricao: [produto.descricao, Validators.required],
              valor: [produto.valor, Validators.required]
            })
          );
        });
      }
    });
  }

  adicionarServicosAnimaximo(): void {
    const dialogRef = this.dialog.open(SelecionaServicoModalComponent, { data: this.servicosTicTacForm.value, width: '90%' });

    dialogRef.afterClosed().subscribe((servicos: ServicoModel[]) => {
      if (servicos) {
        servicos.forEach(servico => {
          this.servicosTicTacForm.push(
            this.formBuilder.group({
              quantidade: [0, Validators.required],
              id: [servico.id, Validators.required],
              nomeServico: [servico.nomeServico, Validators.required],
              descricao: [servico.descricao, Validators.required],
              valor: [0, Validators.required],
              observacao: ['']
            })
          );
        });
      }
    });
  }

  removerProdutosAnimaximo(idProduto: number): void {
    (this.produtosAnimaximoForm.value as ProdutoModel[]).forEach((produto, index) => {
      if (produto.id === idProduto) {
        this.produtosAnimaximoForm.removeAt(index);
      }
    });
  }

  removerServicosAnimaximo(idServico: number): void {
    (this.servicosTicTacForm.value as ServicoModel[]).forEach((servico, index) => {
      if (servico.id === idServico) {
        this.servicosTicTacForm.removeAt(index);
      }
    });
  }

 adicionarValoresAtributosTotais(): void {
  this.valorProtudos = 0;
  this.valorServicos = 0;
  (this.produtosAnimaximoForm.value as ProdutoModel[]).forEach((produto, index) => {
     this.valorProtudos += produto.valor || 0 ;
  });
  (this.servicosTicTacForm.value as ServicoModel[]).forEach((servico, index) => {
    this.valorServicos +=  +servico.valor;
  });
 }

  adicionarServicoTicTac(): void {
    const dialogRef = this.dialog.open(SelecionaServicoModalComponent, { data: this.servicosTicTacForm.value, width: '90%' });

    dialogRef.afterClosed().subscribe((servicos: ServicoModel[]) => {
      if (servicos) {
        servicos.forEach(produto => {
          this.servicosTicTacForm.push(
            this.formBuilder.group({
              quantidade: [1, Validators.required],
              id: [produto.id, Validators.required],
              produto: [produto.nomeServico, Validators.required],
              descricao: [produto.descricao, Validators.required],
            })
          );
        });
      }
    });
  }

  setStep(index: number) {
    this.adicionarValoresAtributosTotais();
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  get totalValor(): number{
    return +this.valorProtudos + +this.valorServicos + +this.frete;
  }
  get frete(): number {
    return (this.orcamentoForm.controls.servicos as FormGroup).get('valorFrete')?.value;
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

  get localFormGroup(): FormGroup {
    return this.orcamentoForm.controls.local as FormGroup;
  }

  get orcamentoFinalFormGroup(): FormGroup {
    return this.orcamentoForm.controls.orcamentoFinal as FormGroup;
  }

  get produtosAnimaximoForm(): FormArray {
    return (this.orcamentoForm.controls.servicos as FormGroup).get('animaximo') as FormArray;
  }

  get servicosTicTacForm(): FormArray {
    return (this.orcamentoForm.controls.servicos as FormGroup).get('tictac') as FormArray;
  }

  get tiposEvento(): any {
    return TiposEvento;
  }
}
