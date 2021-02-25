import { ContatoModel } from "./contato.model";

export class ClienteModel {
    id?: number;
    nome!: string;
    cpfCnpj?: number;
    observacao?: string;
    contato!:  ContatoModel[];
    canalCaptacaoId!: number
}