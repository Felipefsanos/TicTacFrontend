import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ComponenteModel } from 'src/app/models/componente.model';
import { ComponenteService } from 'src/app/services/componente.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-produto-formulario',
  templateUrl: './produto-formulario.component.html',
  styleUrls: ['./produto-formulario.component.scss']
})
export class ProdutoFormularioComponent implements OnInit  {

  componenteList: ComponenteModel[] | undefined = [];
  produtoForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private produtoService: ProdutoService,
    private componenteService: ComponenteService,
    private messageService: MessageService) {
    this.construirFormularioInformacoesCliente();
  }

  construirFormularioInformacoesCliente() {
    this.produtoForm = this.formBuilder.group({
      nome: ['',Validators.required],
      descricao: ['',Validators.required],
      valor: ['',Validators.required],
      componente:  ['']
    });
  }

  ngOnInit(): void {
    this.obterSubProdutos();
  }

  getErrorMessageSubProdutos(formGroupIndex: number, controlName: string): FormControl {
    const formGroup = this.componente.controls[formGroupIndex] as FormGroup;
    return formGroup.get(controlName) as FormControl;
  }

  obterSubProdutos(): void {

      this.componenteService.obterComponentes(false).subscribe(
        res=> {
          res.forEach(componete => this.componenteList?.push(componete));
        },(error: HttpErrorResponse) => {
            this.messageService.warn('Erro para acessar service:' + error.error.menssage);
        });
  }

  onSubmit(): void {
  }

  get nome(): FormControl {
    return this.produtoForm.controls.nome as FormControl;
  }

  get valor(): FormControl {
    return this.produtoForm.controls.valor as FormControl;
  }
  get descricao(): FormControl {
    return this.produtoForm.controls.descricao as FormControl;
  }
  get componente(): FormArray {
    return this.produtoForm.get('componente') as FormArray;
  }
}
