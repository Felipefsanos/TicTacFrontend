import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ComponenteModel } from 'src/app/models/componente.model';
import { ComponenteService } from 'src/app/services/componente.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-componente-formulario',
  templateUrl: './componente-formulario.component.html',
  styleUrls: ['./componente-formulario.component.scss']
})
export class ComponenteFormularioComponent implements OnInit {


  componenteForm: FormGroup = new FormGroup({});
  produtos: any | undefined = [{text:'Selecione...',valor:0}]

  constructor(private formBuilder: FormBuilder, private produtoService: ProdutoService, 
    private componenteService: ComponenteService,
    private messageService: MessageService) {
    this.construirFormularioInformacoesCliente();
  }

  construirFormularioInformacoesCliente() {
    this.componenteForm = this.formBuilder.group({
      nome: ['', Validators.required],
      descricao: [''],
      quantidade:['',Validators.required]
    });
  }
  ngOnInit(): void {
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
