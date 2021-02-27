import { TokenModel } from './../shared/models/token.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base/service-base.service';
import { TokenService } from '../shared/services/token.service';
import { OrcamentoModel } from '../models/orcamento.model';

@Injectable({
  providedIn: 'root'
})
export class OrcamentoService extends BaseService {

  constructor(protected http: HttpClient)
  {
    super(http);
  }

  novoOrcamento(orcamentoModel: OrcamentoModel): Observable<any> {
    return this.post('orcamentos', orcamentoModel);
  }

  obterOrcamentos(): Observable<OrcamentoModel[]>{
    return this.get('orcamentos');
  }

  obterOrcamento(id: number): Observable<OrcamentoModel>{
    return this.get('orcamentos/' + id );
  }
}
