import { TokenModel } from './../shared/models/token.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base/service-base.service';
import { OrcamentoModel } from '../models/orcamento.model';
import { DatePipe } from '@angular/common';

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
    const datePipe = new DatePipe('en-US');
    if (dataInicio && dataFim) {
      return this.get('orcamentos',
      {
        dataInicio: datePipe.transform(dataInicio, 'yyyy-MM-dd'),
        dataFim: datePipe.transform(dataFim, 'yyyy-MM-dd')
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
