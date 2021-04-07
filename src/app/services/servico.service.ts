import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base/service-base.service';
import { ServicoModel } from 'src/app/models/servico.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicoService extends BaseService {

  constructor(protected http: HttpClient)
  {
    super(http);
  }

  obterServicos(): Observable<ServicoModel[]> {
    return this.get('servicos');
  }

  editarServico(id: number, servicoEditado: ServicoModel): Observable<any> {
    return this.put(`servicos/${id}`, servicoEditado);
  }

  excluirServico(id: number): Observable<any> {
    return this.delete(`servicos/${id}`);
  }

  criarServico(servico: ServicoModel): Observable<any> {
    return this.post('servicos', servico);
  }
}
