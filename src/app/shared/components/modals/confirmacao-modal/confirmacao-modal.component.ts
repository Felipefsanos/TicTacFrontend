import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfimacaoModalModel } from 'src/app/shared/models/confirmacao-modal.model';

@Component({
  selector: 'app-confirmacao-modal',
  templateUrl: './confirmacao-modal.component.html',
  styleUrls: ['./confirmacao-modal.component.scss']
})
export class ConfirmacaoModalComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfimacaoModalModel) { }

}
