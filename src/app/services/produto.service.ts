import { TokenModel } from './../shared/models/token.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base/service-base.service';
import { TokenService } from '../shared/services/token.service';
import { OrcamentoModel } from '../models/orcamento.model';
import { ProdutoModel } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService extends BaseService {

  constructor(protected http: HttpClient)
  {
    super(http);
  }

  criarProduto(orcamentoModel: ProdutoModel): Observable<any> {
    return this.post('produtos', orcamentoModel);
  }

  obterProdutos(): Observable<ProdutoModel[]>{
    return this.get('produtos');
  }

  obterProduto(id: number): Observable<ProdutoModel[]>{
    return this.get('produtos/' + id );
  }

  excluirProduto(id: number): Observable<any>{
    return this.delete('produtos/' + id );
  }

  editarProduto(id: number, produtoModel: ProdutoModel): Observable<any> {
    return this.put(`produtos/${id}`, produtoModel);
  }
}
