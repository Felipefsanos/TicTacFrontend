import { EnderecoModel } from './base/endereco.model';

export class EnderecoLocalModel extends EnderecoModel {
    tamanhoLocal!: number;
    escada!: boolean;
    elevador!: boolean;
    restricaoHorario!: boolean;

    public constructor(init?: Partial<EnderecoLocalModel>) {
        super(init);
    }
}
