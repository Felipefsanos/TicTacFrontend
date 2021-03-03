import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BaseService } from 'src/app/services/base/service-base.service';
import { ViaCepEnderecoModel } from '../models/viacep-endereco.model';

@Injectable({
  providedIn: 'root'
})
export class CepService{

  constructor(protected http: HttpClient)
  {
  }

  consultarCep(cep: number): Observable<ViaCepEnderecoModel | any> {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`);
  }
}
