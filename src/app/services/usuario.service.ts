import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base/service-base.service';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends BaseService {

  constructor(protected http: HttpClient)
  {
    super(http);
  }

  criarUsuario(usuario: UsuarioModel): Observable<any>{
    return this.post('usuarios', usuario);
  }

  obterUsuarios(): Observable<UsuarioModel[]>{
    return this.get('usuarios');
  }

  editarUsuario(id: number, usuarioModel: UsuarioModel): Observable<any> {
    return this.put(`usuarios/${id}`, usuarioModel);
  }
}
