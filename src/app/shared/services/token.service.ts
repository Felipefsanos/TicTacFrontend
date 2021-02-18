import { TokenModel } from './../models/token.model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';


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
        token: CryptoJS.AES.decrypt(token, environment.key).toString(CryptoJS.enc.Utf8),
        dataExpiracao: new Date(expirationDate)
      };
    }

    return undefined;
  }

  public setToken(token: TokenModel): void {

    if (!this.validToken(token)) {
      throw new Error('Não pé possível definir um token inválido!');
    }

    const encryptToken = CryptoJS.AES.encrypt(token.token as string, environment.key).toString();

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
