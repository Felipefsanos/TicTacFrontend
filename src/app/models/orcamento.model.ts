import { ClienteModel } from './cliente.model';
import { EnderecoLocalModel } from "./endereco-local.model";

export class OrcamentoModel  {
    dataEvento!: Date;
    tipoEvento!: string;
    quantidadeAdultos!: number;
    quantidadeCriancas!: number;
    buffetPrincipal!: boolean;
    observacao?: string;
    local!: EnderecoLocalModel;
    cliente!: ClienteModel;

    public constructor(init?: Partial<OrcamentoModel>) {
        Object.assign(this, init);
    }
}


