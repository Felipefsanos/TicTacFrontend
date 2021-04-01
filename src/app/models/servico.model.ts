export class ServicoModel {
    id?: number;
    nomeServico!: string;
    descricao?: string;
    tipoAlimentacao!: number;
    tipoCarrinho!: number;
    tipoServico!: number;

    public constructor(init?: Partial<ServicoModel>) {
        Object.assign(this, init);
    }
}
