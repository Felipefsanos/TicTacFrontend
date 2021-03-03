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

        if (init && init.cep) {
            this.elevador = JSON.parse(String(init.elevador));
            this.restricaoHorario = JSON.parse(String(init.restricaoHorario));
            this.escada = JSON.parse(String(init.escada));
            this.cep = +(init.cep?.toString().replace('-', ''));
        }
    }
}
