import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-produto-formulario',
  templateUrl: './produto-formulario.component.html',
  styleUrls: ['./produto-formulario.component.scss']
})
export class ProdutoFormularioComponent implements OnInit {

  produtoForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder) {
    this.construirFormularioInformacoesCliente();
  }

  construirFormularioInformacoesCliente() {
    this.produtoForm = this.formBuilder.group({
      nome: [''],
      descricao: [''],
      valor: [''],
      subProdutos: this.formBuilder.array([
        this.formBuilder.group({
          nome: ['', Validators.required],
          descricao: [''],
          valor: ['', Validators.email]
        })
      ]),
    });
  }

  ngOnInit(): void {
  }
  onSubmit(): void {
    console.log(this.produtoForm);
  }

  getErrorMessageSubProdutos(formGroupIndex: number, controlName: string): FormControl {
    const formGroup = this.subProdutos.controls[formGroupIndex] as FormGroup;
    return formGroup.get(controlName) as FormControl;
  }


  addCreds() {
    const creds = this.produtoForm.controls.subProdutos as FormArray;
    creds.push(this.formBuilder.group({
      nome: ['', Validators.required],
      descricao: [''],
      valor: ['', Validators.email]
    }));
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
