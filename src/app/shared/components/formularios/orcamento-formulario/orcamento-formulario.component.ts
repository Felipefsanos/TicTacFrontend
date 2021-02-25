import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { ClienteModel } from 'src/app/models/cliente.model';
import { ContatoModel } from 'src/app/models/contato.model';
import { EnderecoLocalModel } from 'src/app/models/endereco-local.model';
import { OrcamentoModel } from 'src/app/models/orcamento.model';
import { OrcamentoService } from 'src/app/services/orcamento.service';
 
@Component({
  selector: 'app-orcamento-formulario',
  templateUrl: './orcamento-formulario.component.html',
  styleUrls: ['./orcamento-formulario.component.scss'],
  
})
export class OrcamentoFormularioComponent implements OnInit {

 
  orcamentoModelService  = new OrcamentoModel();
  informacoesClienteForm: FormGroup = new FormGroup({});
  informacoesOrcamentoForm: FormGroup = new FormGroup({});
  informacoesEnderecoForm: FormGroup = new FormGroup({});
  informacoesSubmitForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private orcamentoService: OrcamentoService)
  {
    this.construirFormularioInformacoesCliente();
  }

  ngOnInit(): void {
  }

  construirFormularioInformacoesCliente(): void {
    this.informacoesClienteForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(5)]],
      cpfCnpj: [''],
      canalCaptacaoId:[''],
      contatos: this.formBuilder.array([
        this.formBuilder.group({
          telefone: ['', Validators.required],
          nomeContato: ['',Validators.required],
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
      dataEvento: ['', Validators.required],
      tipoEvento: ['', Validators.required],
      quantidadeAdultos: ['', Validators.required],
      quantidadeCriancas: ['', Validators.required],
      buffetPrincipal: ['', Validators.required],
      observacao: [''],
    });
  }

  printForm(): void {
    console.log(this.informacoesClienteForm);
  }

  OnSubmit() : void {
   debugger;
    this.montarFormularioSubmit();
      
    this.orcamentoService.incluirOrcamento(this.orcamentoModelService)
    .subscribe(token => {
      try {
      } catch (e) {
        console.log(e);
      }
    });
  }
  

  montarFormularioSubmit(): void {

    this.orcamentoModelService  = new OrcamentoModel();
    this.orcamentoModelService.dataEvento = this.informacoesOrcamentoForm.controls.dataEvento.value;
    this.orcamentoModelService.tipoEvento = this.informacoesOrcamentoForm.controls.tipoEvento.value;
    this.orcamentoModelService.quantidadeAdultos = this.informacoesOrcamentoForm.controls.quantidadeAdultos.value;
    this.orcamentoModelService.quantidadeCriancas = this.informacoesOrcamentoForm.controls.quantidadeCriancas.value;
    this.orcamentoModelService.buffetPrincipal = this.informacoesOrcamentoForm.controls.buffetPrincipal.value;
    this.orcamentoModelService.observacao = this.informacoesOrcamentoForm.controls.observacao.value;

    let localService = new EnderecoLocalModel();

    localService.cep = this.informacoesEnderecoForm.controls.cep.value;
    localService.bairro = this.informacoesEnderecoForm.controls.bairro.value;
    localService.cidade = this.informacoesEnderecoForm.controls.cidade.value;
    localService.numero = this.informacoesEnderecoForm.controls.numero.value;
    localService.estado = this.informacoesEnderecoForm.controls.estado.value;
    localService.complemento = this.informacoesEnderecoForm.controls.complemento.value;
    localService.logradouro = this.informacoesEnderecoForm.controls.logradouro.value;
    localService.tamanhoLocal = this.informacoesEnderecoForm.controls.tamanhoLocal.value;
    localService.escada = JSON.parse(this.informacoesEnderecoForm.controls.escada.value);
    localService.elevador = JSON.parse(this.informacoesEnderecoForm.controls.elevador.value);
    localService.restricaoHorario = JSON.parse(this.informacoesEnderecoForm.controls.restricaoHorario.value);
    //Add Endereço no Orçamento
    this.orcamentoModelService.local = localService;

    let clienteService = new ClienteModel();
    clienteService.nome = this.informacoesClienteForm.controls.nome.value;
    clienteService.cpfCnpj = this.informacoesClienteForm.controls.cpfCnpj.value;
    clienteService.cpfCnpj = this.informacoesClienteForm.controls.cpfCnpj.value;
    clienteService.observacao = this.informacoesClienteForm.controls.observacao.value;

    const contatosServices = [] ;
    for(let item of this.informacoesClienteForm.controls.contatos.value){
        let contatoServices = new ContatoModel();
        contatoServices.telefone = item.telefone;
        contatoServices.email = item.email;
        contatoServices.nomeContato = item.nomeContato;
        contatosServices.push(contatoServices);
    }
    // add Contato no cliente 
    clienteService.contato = contatosServices;
    //add Cliente no Orçamento
    this.orcamentoModelService.cliente = clienteService;
  }
  getErrorMessageContatos(formGroupIndex: number, controlName: string): FormControl {
    const formGroup = this.contatos.controls[formGroupIndex] as FormGroup;
    return formGroup.get(controlName) as FormControl;
  }

  get contatos(): FormArray {
    return this.informacoesClienteForm.get('contatos') as FormArray;
  }
}
