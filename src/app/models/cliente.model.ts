import { ContatoModel } from './contato.model';

export class ClienteModel {
    id?: number;
    nome!: string;
    cpfCnpj?: number;
    observacao?: string;
    contatos!: ContatoModel[];
    canalCaptacaoId!: number;

    public constructor(init?: Partial<ClienteModel>) {
        Object.assign(this, init);

        if (this.contatos.length > 0) {
            this.contatos.forEach(contato => {
                contato.ddd = +contato.telefone.toString().slice(0, 2);
                contato.telefone = +contato.telefone.toString().slice(2);
            });
        }
    }
}
