import { MatStepper } from '@angular/material/stepper';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { ComponenteModel } from 'src/app/models/componente.model';
import { ComponenteService } from 'src/app/services/componente.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-componente-formulario',
  templateUrl: './componente-formulario.component.html',
  styleUrls: ['./componente-formulario.component.scss']
})
export class ComponenteFormularioComponent implements OnInit{


  @Input()
  componente?: ComponenteModel;

  @Output()
  formularioEnviado = new EventEmitter<ComponenteModel>();

  edicao = false;;

  @ViewChild (FormGroupDirective)
  formGroupDirective!: FormGroupDirective;

  formulario = new FormGroup({});

  componenteForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder,
    private componenteService: ComponenteService,
    private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.construirFormularioInformacoesCliente();
  }

  construirFormularioInformacoesCliente() {
    this.edicao = this.componente ? true : false;

    this.componenteForm = this.formBuilder.group({
      nome: [this.componente?.nome, Validators.required],
      descricao: [this.componente?.descricao],
      quantidade:[this.componente?.quantidade,Validators.required]
    });
  }

  onSubmit(): void {
    if(this.componenteForm.invalid){
      return;
    }

    this.componenteService.criarComponente(this.componenteForm.value as ComponenteModel)
        .subscribe(() => {
          this.messageService.success('Componente criado com sucesso!');
          this.componenteForm.reset('');
        });
  }

  get nome(): FormControl {
    return this.componenteForm.controls.nome as FormControl;
  }

  get valor(): FormControl {
    return this.componenteForm.controls.valor as FormControl;
  }
  get descricao(): FormControl {
    return this.componenteForm.controls.descricao as FormControl;
  }

}
