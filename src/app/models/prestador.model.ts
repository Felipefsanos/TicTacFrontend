import { ContatoModel } from './base/contato.model';
import { EnderecoModel } from './base/endereco.model';

export class PrestadorModel {
    nome!: string;
    cpf!: string;
    endereco!: EnderecoModel;
    contatos!: ContatoModel[];
}
