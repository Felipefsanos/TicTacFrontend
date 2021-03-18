import { ContatoModel } from './base/contato.model';
import { EnderecoModel } from './base/endereco.model';

export class PrestadorModel {
    id!: number;
    nome!: string;
    cpf!: string;
    endereco!: EnderecoModel;
    contatos!: ContatoModel[];

    public constructor(init?: Partial<PrestadorModel>) {
        Object.assign(this, init);

        this.formatarTelefonesContato();
    }

    public formatarTelefonesContato(): void {
        for (const contato of this.contatos) {
            contato.ddd = +contato.telefone.toString().slice(0, 2);
            contato.telefone = +contato.telefone.toString().slice(2);
        }
    }
}
