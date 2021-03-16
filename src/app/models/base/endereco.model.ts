export class EnderecoModel {
    cep!: number;
    logradouro?: string;
    numero?: string;
    complemento?: string;
    bairro!: string;
    cidade!: string;
    estado!: string;


    constructor(init?: Partial<EnderecoModel>) {
        Object.assign(this, init);

        if (init && init.cep) {
            this.cep = +(init.cep?.toString().replace('-', ''));
        }
    }
}
