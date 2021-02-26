export class EnderecoLocalModel {
    cep!: number;
    logradouro?: string;
    numero?: string;
    complemento?: string;
    bairro!: string;
    cidade!: string;
    estado!: string;
    tamanhoLocal!: number;
    escada!: boolean;
    elevador!: boolean;
    restricaoHorario!: boolean;

    public constructor(init?: Partial<EnderecoLocalModel>) {
        Object.assign(this, init);
    }
}