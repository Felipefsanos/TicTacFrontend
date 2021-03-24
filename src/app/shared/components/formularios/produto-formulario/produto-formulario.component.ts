import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ComponenteModel } from 'src/app/models/componente.model';
import { ProdutoModel } from 'src/app/models/produto.model';
import { ComponenteService } from 'src/app/services/componente.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-produto-formulario',
  templateUrl: './produto-formulario.component.html',
  styleUrls: ['./produto-formulario.component.scss']
})
export class ProdutoFormularioComponent implements OnInit  {

  @Input()
  produto?: ProdutoModel;

  @Output()
  formularioEnviado = new EventEmitter<ProdutoModel>();

  @ViewChild (FormGroupDirective)
  formGroupDirective!: FormGroupDirective;

  edicao = false;

  componenteList: ComponenteModel[] | undefined = [];
  produtoForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private produtoService: ProdutoService,
    private componenteService: ComponenteService,
    private messageService: MessageService) {
    this.construirFormularioInformacoesCliente();
  }

  construirFormularioInformacoesCliente() {
    this.edicao = this.produto ? true : false;

    this.produtoForm = this.formBuilder.group({
      nome: [this.produto?.nome,Validators.required],
      descricao: [this.produto?.descricao,Validators.required],
      valor: [this.produto?.valor,Validators.required],
      componentes:  [this.produto?.componentes]
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
    if(this.produtoForm.invalid){
      return;
    }
    this.produtoService.criarProduto(this.produtoForm.value as ProdutoModel)
        .subscribe(() => {
          this.messageService.success('Produto criado com sucesso!');
          this.formGroupDirective.resetForm();
        });
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
