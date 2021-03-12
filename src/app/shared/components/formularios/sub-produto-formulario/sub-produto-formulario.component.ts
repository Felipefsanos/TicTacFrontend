import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-sub-produto-formulario',
  templateUrl: './sub-produto-formulario.component.html',
  styleUrls: ['./sub-produto-formulario.component.scss']
})
export class SubProdutoFormularioComponent implements OnInit {

  subProdutoForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder) {
    this.construirFormularioInformacoesCliente();
  }

  construirFormularioInformacoesCliente() {
    this.subProdutoForm = this.formBuilder.group({
      nome: [''],
      descricao: [''],
      valor: [''],
    });
  }
  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.subProdutoForm);
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
