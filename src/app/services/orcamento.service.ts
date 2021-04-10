import { TokenModel } from './../shared/models/token.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base/service-base.service';
import { OrcamentoModel } from '../models/orcamento.model';

@Injectable({
  providedIn: 'root'
})
export class OrcamentoService extends BaseService {

  constructor(protected http: HttpClient) {
    super(http);
  }

  novoOrcamento(orcamentoModel: OrcamentoModel): Observable<any> {
    return this.post('orcamentos', orcamentoModel);
  }

  obterOrcamentos(dataInicio?: Date, dataFim?: Date): Observable<OrcamentoModel[]> {
    debugger;
    if (dataInicio && dataFim) {
      return this.get('orcamentos',
      {
        dataInicio: `${dataInicio.getFullYear()}-${dataInicio.getMonth()}-${dataInicio.getDay()}`,
        dataFim: `${dataFim.getFullYear()}-${dataFim.getMonth()}-${dataFim.getDay()}`
      });
    }

    return this.get('orcamentos');
  }

  obterOrcamento(id: number): Observable<OrcamentoModel> {
    return this.get(`orcamentos/${id}`);
  }

  removerOrcamento(id: number): Observable<any> {
    return this.delete(`orcamentos/${id}`);
  }
}
