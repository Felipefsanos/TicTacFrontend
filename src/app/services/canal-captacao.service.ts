import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base/service-base.service';
import { CanalCaptacaoModel } from '../models/canal-captacao.model';

@Injectable({
  providedIn: 'root'
})
export class CanalCaptacaoService extends BaseService{

  constructor(protected http: HttpClient)
  {
    super(http);
  }

  obterCanaisCaptacao(): Observable<CanalCaptacaoModel[]> {
    return this.get('canais-captacao');
  }

  alterarCanalCaptacao(id: number, canalEditado: CanalCaptacaoModel): Observable<CanalCaptacaoModel[]> {
    return this.put(`canais-captacao/${id}`, canalEditado);
  }
}
