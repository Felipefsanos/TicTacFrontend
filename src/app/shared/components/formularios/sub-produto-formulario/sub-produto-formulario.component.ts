import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ProdutoService } from 'src/app/services/produto.service';
import { SubProdutoService } from 'src/app/services/sub-produto.service';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-sub-produto-formulario',
  templateUrl: './sub-produto-formulario.component.html',
  styleUrls: ['./sub-produto-formulario.component.scss']
})
export class SubProdutoFormularioComponent implements OnInit {

  subProdutoForm: FormGroup = new FormGroup({});
  produtos: any | undefined = [{text:'Selecione...',valor:0}]

  constructor(private formBuilder: FormBuilder, private produtoService: ProdutoService, 
    private subProdutoService: SubProdutoService,
    private messageService: MessageService) {
    this.construirFormularioInformacoesCliente();
  }

  construirFormularioInformacoesCliente() {
    this.subProdutoForm = this.formBuilder.group({
      nome: [''],
      descricao: [''],
      quantidade:['']
    });
  }
  ngOnInit(): void {
  }

  onSubmit(): void {
    this.subProdutoService.criarSubProduto(this.subProdutoForm.value).subscribe(
      res=> {
        this.produtos = [];
        for( const item of res){
         this.produtos.push([{text: item.nome ,valor: item.id}]);
        }
      },(error: HttpErrorResponse) => {
          this.messageService.warn("Erro para acessar service:" + error.error.menssage)
      })
  }
 
  get nome(): FormControl {
    return this.subProdutoForm.controls.nome as FormControl;
  }

  get valor(): FormControl {
    return this.subProdutoForm.controls.valor as FormControl;
  }
  get descricao(): FormControl {
    return this.subProdutoForm.controls.descricao as FormControl;
  }
}
