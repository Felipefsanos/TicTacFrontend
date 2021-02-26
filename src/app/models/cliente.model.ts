import { ContatoModel } from "./contato.model";

export class ClienteModel {
    id?: number;
    nome!: string;
    cpfCnpj?: number;
    observacao?: string;
    contatos!:  ContatoModel[];
    canalCaptacaoId!: number;
    
    public constructor(init?: Partial<ClienteModel>) {
        Object.assign(this, init);
    }
}