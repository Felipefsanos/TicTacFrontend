import { TiposAlimentacao } from './../../../models/tipos-alimentacao-enum.model';
import { TipoCarrinhos } from './../../../models/tipo-carrinhos-enum.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TipoServicos } from 'src/app/shared/models/tipo-servicos-enum.model';

@Component({
  selector: 'app-servico-formulario',
  templateUrl: './servico-formulario.component.html',
  styleUrls: ['./servico-formulario.component.scss']
})
export class ServicoFormularioComponent implements OnInit {

  formulario = new FormGroup({});
  valorInicialCarrinhos = TipoCarrinhos.indefinido;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.construirFormulario();
  }

  construirFormulario() {
    this.formulario = this.formBuilder.group({
      nomeServico: ['', [Validators.required, Validators.minLength(5)]],
      descricao: [''],
      tipoAlimentacao: ['', Validators.required],
      tipoCarrinho: ['', Validators.required],
      tipoServico: ['', Validators.required]
    });
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
