import { TokenModel } from './../shared/models/token.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base/service-base.service';
import { TokenService } from '../shared/services/token.service';
import { OrcamentoModel } from '../models/orcamento.model';
import { ProdutoModel } from '../models/produto.model';
import { SubProdutoModel } from '../models/sub-produto.model';

@Injectable({
  providedIn: 'root'
})
export class SubProdutoService extends BaseService {

  constructor(protected http: HttpClient)
  {
    super(http);
  }

  criarSubProduto(orcamentoModel: SubProdutoModel): Observable<any> {
    return this.post('sub-produtos', orcamentoModel);
  }

  obterSubProdutos(relacionados: boolean): Observable<SubProdutoModel[]>{
    return this.get('sub-produtos', { relacionados });
  }

  obterSubProduto(id?: number): Observable<SubProdutoModel[]>{
    return this.get('sub-produtos/' + id );
  }
}
