import { ServicoModel } from 'src/app/models/servico.model';
import { MessageService } from './../../../services/message.service';
import { TiposAlimentacao } from './../../../models/tipos-alimentacao-enum.model';
import { TipoCarrinhos } from './../../../models/tipo-carrinhos-enum.model';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Component, OnInit, AfterViewInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { TipoServicos } from 'src/app/shared/models/tipo-servicos-enum.model';
import { ServicoService } from 'src/app/services/servico.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-servico-formulario',
  templateUrl: './servico-formulario.component.html',
  styleUrls: ['./servico-formulario.component.scss']
})
export class ServicoFormularioComponent implements OnInit {

  @Input()
  servico?: ServicoModel;

  @Output()
  formularioEnviado = new EventEmitter<ServicoModel>();

  @ViewChild (FormGroupDirective)
  formGroupDirective!: FormGroupDirective;

  formulario = new FormGroup({});

  selectedTipoAlimentacao?: TiposAlimentacao;
  selectedTipoCarrinho?: TipoCarrinhos;
  selectedTipoServico?: TipoServicos;

  constructor(private formBuilder: FormBuilder,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.construirFormulario();
  }

  construirFormulario() {

    if(this.servico) {
      this.selectedTipoAlimentacao = this.servico.tipoAlimentacao;
      this.selectedTipoCarrinho = this.servico.tipoCarrinho;
      this.selectedTipoServico = this.servico.tipoServico;
    }

    this.formulario = this.formBuilder.group({
      id: [this.servico?.id],
      nomeServico: [this.servico?.nomeServico, [Validators.required, Validators.minLength(5)]],
      descricao: [this.servico?.descricao],
      tipoAlimentacao: [this.servico?.tipoAlimentacao, Validators.required],
      tipoCarrinho: [this.servico?.tipoCarrinho, Validators.required],
      tipoServico: [this.servico?.tipoServico, Validators.required]
    });
  }

  onSubmit(): void {

    if(this.formulario.invalid) {
      return;
    }

    this.formularioEnviado.emit(this.formulario.value);
    this.formulario.reset('');
    this.formGroupDirective.resetForm();
  }

  cancelar(): void {
    this.formularioEnviado.emit();
  }

  get tiposServicos(): any {
    return TipoServicos;
  }

  get tipoCarrinhos(): any {
    return TipoCarrinhos;
  }

  get tiposAlimentacao(): any {
    return TiposAlimentacao;
  }


}
