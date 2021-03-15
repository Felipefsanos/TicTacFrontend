import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProdutoService } from 'src/app/services/produto.service';
import { SubProdutoService } from 'src/app/services/sub-produto.service';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-produto-formulario',
  templateUrl: './produto-formulario.component.html',
  styleUrls: ['./produto-formulario.component.scss']
})
export class ProdutoFormularioComponent implements OnInit {

  subProdutosList: any | undefined = [{text: 'Selecione...', valor: 0}];
  produtoForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private produtoService: ProdutoService, 
    private subProdutoService: SubProdutoService,
    private messageService: MessageService) {
    this.construirFormularioInformacoesCliente();
  }

  construirFormularioInformacoesCliente() {
    this.produtoForm = this.formBuilder.group({
      nome: ['',Validators.required],
      descricao: ['',Validators.required],
      valor: ['',Validators.required],
      subprodutos:  ['']
    });
  }

  ngOnInit(): void {
    this.obterSubProdutos(0);
  }
 

  getErrorMessageSubProdutos(formGroupIndex: number, controlName: string): FormControl {
    const formGroup = this.subProdutos.controls[formGroupIndex] as FormGroup;
    return formGroup.get(controlName) as FormControl;
  }

  obterSubProdutos(codigoProduto: number): void {
    debugger;
    if(codigoProduto <= 0)
    {
      this.subProdutoService.obterSubProdutos().subscribe(
        res=> {
          this.subProdutosList = [];
          for( const item of res){
           this.subProdutosList.push([{text: item.nome ,valor: item.id}]);
          }
        },(error: HttpErrorResponse) => {
            this.messageService.warn("Erro para acessar service:" + error.error.menssage)
        })
    }else{
      this.subProdutoService.obterSubProduto(codigoProduto).subscribe(
        resp => {
          this.subProdutosList = [];
          for( const item of resp){
           this.subProdutosList.push([{text: item.nome ,valor: item.id}]);
          }
        },(error: HttpErrorResponse) => {
          this.messageService.warn("Erro para acessar service:" + error.error.menssage)
      })
    }
  }

  onSubmit(): void {
    console.log(this.produtoForm);
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
  get subProdutos(): FormArray {
    return this.produtoForm.get('subProdutos') as FormArray;
  }
}
