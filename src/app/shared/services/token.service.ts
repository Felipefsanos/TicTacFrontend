import { TokenModel } from './../models/token.model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public getToken(): TokenModel | undefined {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('tokenExpiration');

    if (token && expirationDate) {
      return {
        token: atob(token),
        dataExpiracao: new Date(expirationDate)
      };
    }

    return undefined;
  }

  public setToken(token: TokenModel): void {

    if (!this.validToken(token)) {
      throw new Error('Não pé possível definir um token inválido!');
    }

    const encryptToken = btoa(token.token as string);

    localStorage.setItem('token', encryptToken);
    localStorage.setItem('tokenExpiration', token.dataExpiracao.toString());
  }

  public removeToken(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
  }

  public validToken(token: TokenModel): boolean {

    if (!token || !token.token || !token.dataExpiracao) {
      return false;
    }

    if (token.dataExpiracao < new Date()) {
      return false;
    }

    return true;
  }
}
