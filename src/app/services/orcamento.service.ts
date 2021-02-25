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

  constructor(protected http: HttpClient, private tokenService: TokenService)
  {
    super(http);
  }

  incluirOrcamento(orcamentoModel: OrcamentoModel): Observable<TokenModel> {
    return this.post('orcamentoModel', orcamentoModel);
  }
}
