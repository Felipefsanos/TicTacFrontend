import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComponenteModel } from '../models/componente.model';
import { BaseService } from './base/service-base.service';

@Injectable({
  providedIn: 'root'
})
export class SubProdutoService extends BaseService {

  constructor(protected http: HttpClient)
  {
    super(http);
  }

  criarSubProduto(orcamentoModel: ComponenteModel): Observable<any> {
    return this.post('sub-produtos', orcamentoModel);
  }

  obterSubProdutos(relacionados: boolean): Observable<ComponenteModel[]>{
    return this.get('sub-produtos', { relacionados });
  }

  obterSubProduto(id?: number): Observable<ComponenteModel[]>{
    return this.get('sub-produtos/' + id );
  }
}
