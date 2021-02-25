import { ContatoModel } from "./contato.model";

export class ClienteModel {
    nome!: string;
    cpfCnpj?: number;
    observacao?: string;
    contato!:  ContatoModel[];
}