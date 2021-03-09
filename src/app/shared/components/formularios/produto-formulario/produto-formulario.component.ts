import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-produto-formulario',
  templateUrl: './produto-formulario.component.html',
  styleUrls: ['./produto-formulario.component.scss']
})
export class ProdutoFormularioComponent implements OnInit {
  
  produtoForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder)
  {
    this.construirFormularioInformacoesCliente();
  }
  
  construirFormularioInformacoesCliente() {
    this.produtoForm = this.formBuilder.group({
      nome: [''],
      descricao: [''],
      valor: [''],
    });
  }

  ngOnInit(): void {
  }
  printForm(): void {
    console.log(this.produtoForm);
  }

}
