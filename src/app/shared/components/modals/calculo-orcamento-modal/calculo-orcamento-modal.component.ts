import { OrcamentoModel } from 'src/app/models/orcamento.model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-calculo-orcamento-modal',
  templateUrl: './calculo-orcamento-modal.component.html',
  styleUrls: ['./calculo-orcamento-modal.component.scss']
})
export class CalculoOrcamentoModalComponent implements OnInit {

  formulario: FormGroup = new FormGroup({});
  orcamentoModel: OrcamentoModel;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder) {
    this.orcamentoModel = new OrcamentoModel(data.orcamento, data.cliente, data.endereco);

    this.construirFormulario();
  }

  ngOnInit(): void {

    this.formulario?.patchValue(this.orcamentoModel);
    this.formulario.controls.dataEvento.setValue(new DatePipe('pt').transform(this.orcamentoModel.dataEvento, 'dd/MMMM/yyyy HH:mm'));

    console.log(this.formulario);

  }

  construirFormulario(): void {
    this.formulario = this.formBuilder.group({
      dataEvento: [{value: '', disabled: true}],
      tipoEvento: [{value: '', disabled: true}],
      quantidadeAdultos: [{value: 0, disabled: true}],
      quantidadeCriancas: [{value: 0, disabled: true}],
      buffetPrincipal: [{value: false, disabled: true}],
      observacao: [{value: '', disabled: true}],
      local: this.formBuilder.group({
        cep: [{value: 0, disabled: true}],
        bairro: [{value: '', disabled: true}],
        cidade: [{value: '', disabled: true}],
        numero: [{value: '', disabled: true}],
        estado: [{value: '', disabled: true}],
        complemento: [{value: '', disabled: true}],
        logradouro: [{value: '', disabled: true}],
        tamanhoLocal: [{value: 0, disabled: true}],
        escada: [{value: false, disabled: true}],
        elevador: [{value: false, disabled: true}],
        restricaoHorario: [{value: false, disabled: true}]
      }),
      cliente: this.formBuilder.group({
        nome: [{value: '', disabled: true}],
        cpfCnpj: [{value: '', disabled: true}],
        canalCaptacaoId: [{value: 0, disabled: true}],
        contatos: this.formBuilder.array([
          this.formBuilder.group({
            telefone: [{value: 0, disabled: true}],
            nomeContato: [{value: '', disabled: true}],
            email: [{value: '', disabled: true}],
            ddd: [{value: 0, disabled: true}]
          })
        ]),
        observacao: [{value: '', disabled: true}]
      })
    });
  }
}
