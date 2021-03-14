import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base/service-base.service';
import { Injectable } from '@angular/core';
import { PrestadorModel } from '../models/prestador.model';

@Injectable({
  providedIn: 'root'
})
export class PrestadorService extends BaseService{

  constructor(protected http: HttpClient)
  {
    super(http);
  }

  criarPrestador(prestadorModel: PrestadorModel): Observable<any> {
    this.tratarCampos(prestadorModel);

    return this.post('prestadores', prestadorModel);
  }

  private tratarCampos(prestadorModel: PrestadorModel) {
    prestadorModel.endereco.cep = +(prestadorModel.endereco.cep?.toString().replace('-', ''));

    prestadorModel.contatos.forEach(contato => {
      contato.ddd = +contato.telefone.toString().substring(0, 2);
      contato.telefone = +contato.telefone.toString().replace('-', '').substring(2);
    });
  }
}
