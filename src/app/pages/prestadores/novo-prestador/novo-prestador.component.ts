import { MessageService } from './../../../shared/services/message.service';
import { PrestadorService } from 'src/app/services/prestador.service';
import { Component, OnInit } from '@angular/core';
import { PrestadorModel } from 'src/app/models/prestador.model';

@Component({
  selector: 'app-novo-prestador',
  templateUrl: './novo-prestador.component.html',
  styleUrls: ['./novo-prestador.component.scss']
})
export class NovoPrestadorComponent {

  constructor(private prestadorService: PrestadorService, private messageService: MessageService) { }

  criarPrestador(formValue: PrestadorModel) {
    const novoPrestador = new PrestadorModel(formValue);

    this.prestadorService.criarPrestador(novoPrestador)
      .subscribe(() => {
        this.messageService.success('Prestador criado com sucesso');
      });
  }

}
