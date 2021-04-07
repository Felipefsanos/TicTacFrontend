import { Component, OnInit } from '@angular/core';
import { ServicoModel } from 'src/app/models/servico.model';
import { ServicoService } from 'src/app/services/servico.service';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-novo-servico',
  templateUrl: './novo-servico.component.html',
  styleUrls: ['./novo-servico.component.scss']
})
export class NovoServicoComponent {

  constructor(private serviceService: ServicoService, private messageService: MessageService) { }

  criarServico(formValue: ServicoModel) {
    const novoServico = new ServicoModel(formValue);

    this.serviceService.criarServico(novoServico)
      .subscribe(() => {
        this.messageService.success('Prestador criado com sucesso');
      });
  }
}
