import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComponenteModel } from '../models/componente.model';
import { BaseService } from './base/service-base.service';

@Injectable({
  providedIn: 'root'
})
export class ComponenteService extends BaseService {
 

  constructor(protected http: HttpClient)
  {
    super(http);
  }

  excluirComponente(id: number): Observable<any> {
    return this.delete('componente', id);
  }
  criarComponente(orcamentoModel: ComponenteModel): Observable<any> {
    return this.post('componente', orcamentoModel);
  }

  obterComponentes(relacionados: boolean): Observable<ComponenteModel[]>{
    return this.get('componente', { relacionados });
  }
  obterTodosComponentes(): Observable<ComponenteModel[]>{
    return this.get('componente');
  }

  obterComponente(id?: number): Observable<ComponenteModel[]>{
    return this.get('componente/' + id );
  }
}
