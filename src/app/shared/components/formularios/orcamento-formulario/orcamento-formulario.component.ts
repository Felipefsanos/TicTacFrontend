import { SelecionaProdutoModalComponent } from './../../modals/seleciona-produto-modal/seleciona-produto-modal.component';
import { ProdutoModel } from './../../../../models/produto.model';
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
import { ServicoModel } from 'src/app/models/servico.model';
import { ProdutoService } from 'src/app/services/produto.service';
import { SelecionaServicoModalComponent } from '../../modals/seleciona-servico-modal/seleciona-servico-modal.component';

@Component({
  selector: 'app-orcamento-formulario',
  templateUrl: './orcamento-formulario.component.html',
  styleUrls: ['./orcamento-formulario.component.scss'],

})
export class OrcamentoFormularioComponent implements OnInit {

  @ViewChild('stepper')
  stepper?: MatHorizontalStepper;
  lastFilter = '';

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
    this.construirFormularios();
  }

  ngOnInit(): void {
    this.produtosService.obterProdutos().subscribe(prod => this.produtosAnimaxo = prod);
  }

  construirFormularios(): void {

    // TODO: Remover valores fixos, por teste
    this.orcamentoForm = this.formBuilder.group({
      orcamento: this.formBuilder.group({
        dataEvento: [new Date(), Validators.required],
        horaEvento: ['1500', Validators.required],
        tipoEvento: ['Aniversario', Validators.required],
        quantidadeAdultos: [5, Validators.required],
        quantidadeCriancas: [5, Validators.required],
        buffetPrincipal: [false, Validators.required],
        observacao: ['']
      }),
      cliente: this.formBuilder.group({
        nome: ['Felipe', [Validators.required, Validators.minLength(5)]],
        cpfCnpj: [''],
        canalCaptacaoId: ['Instagram', Validators.required],
        contatos: this.formBuilder.array([
          this.formBuilder.group({
            telefone: ['31975155261', Validators.required],
            nomeContato: ['Felipe', Validators.required],
            email: ['', Validators.email],
            ddd: ['']
          })
        ]),
        observacao: ['']
      }),
      endereco: this.formBuilder.group({
        cep: ['', Validators.required],
        bairro: ['', Validators.required],
        cidade: ['', Validators.required],
        numero: [''],
        estado: ['', Validators.required],
        complemento: [''],
        logradouro: ['', Validators.required],
        tamanhoLocal: ['', Validators.required],
        escada: [false, Validators.required],
        elevador: [false, Validators.required],
        restricaoHorario: [false, Validators.required]
      }),
      servicos: this.formBuilder.group({
        animaximo: this.formBuilder.array([]),
        tictac: this.formBuilder.array([])
      })
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
              produto: [produto.nome, Validators.required],
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
              quantidade: [1, Validators.required],
              id: [servico.id, Validators.required],
              servico: [servico.nomeServico, Validators.required],
              descricao: [servico.descricao, Validators.required],
              valor: [0, Validators.required],
              observacao: ['', Validators.required]
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
