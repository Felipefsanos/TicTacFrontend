import { ServicoModel } from 'src/app/models/servico.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  constructor() { }

  obterServicos(): Observable<ServicoModel[]> {
    throw new Error('Method not implemented.');
  }

  editarServico(id: number, servicoEditado: ServicoModel): Observable<any> {
    throw new Error('Method not implemented.');
  }

  excluirProduto(id: number): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
