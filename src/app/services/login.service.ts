import { LoginModel } from './../models/login.model';
import { TokenModel } from './../shared/models/token.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base/service-base.service';
import { TokenService } from '../shared/services/token.service';
import { TrocaSenhaModel } from '../models/troca-senha.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService {

  constructor(protected http: HttpClient, private tokenService: TokenService)
  {
    super(http);
  }

  realizarLogin(loginModel: LoginModel): Observable<TokenModel> {
    return this.post('login', loginModel);
  }

  logout(): void {
    this.tokenService.removeToken();
  }

  trocarSenha(trocaSenha: TrocaSenhaModel): Observable<any> {
    return this.put(`usuarios/trocar-senha/${trocaSenha.login}`, trocaSenha);
  }

}
