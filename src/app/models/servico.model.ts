import { TipoServicos } from './../shared/models/tipo-servicos-enum.model';
import { TipoCarrinhos } from '../shared/models/tipo-carrinhos-enum.model';
import { TiposAlimentacao } from './../shared/models/tipos-alimentacao-enum.model';

export class ServicoModel {
    id?: number;
    nomeServico!: string;
    descricao?: string;
    tipoAlimentacao!: TipoServicos;
    tipoCarrinho!: TipoCarrinhos;
    tipoServico!: TiposAlimentacao;

    public constructor(init?: Partial<ServicoModel>) {
        Object.assign(this, init);
    }
}



