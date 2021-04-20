import { ClienteModel } from './cliente.model';
import { EnderecoLocalModel } from './endereco-local.model';
import { ProdutoModel } from './produto.model';
import { ServicoModel } from './servico.model';

export class OrcamentoModel {
    id!: number;
    dataEvento!: Date;
    horaEvento!: string;
    tipoEvento!: string;
    quantidadeAdultos!: number;
    quantidadeCriancas!: number;
    buffetPrincipal!: boolean;
    valorFrete!: number;
    valor!: number;
    observacao?: string;
    local!: EnderecoLocalModel;
    cliente!: ClienteModel;
    produto!: ProdutoModel[];
    servico!: ServicoModel[];


    public constructor(init?: Partial<OrcamentoModel>, clienteInit?: Partial<ClienteModel>, localInit?: Partial<EnderecoLocalModel>) {
        Object.assign(this, init);

        if (init && init.dataEvento && init.horaEvento) {
            this.dataEvento = new Date(init.dataEvento.getFullYear(),
                                       init.dataEvento.getMonth(),
                                       init.dataEvento.getDay(),
                                       +init.horaEvento.slice(0, 2),
                                       +init.horaEvento.slice(2));
        }

        this.local = new EnderecoLocalModel(localInit);
        this.cliente = new ClienteModel(clienteInit);
    }
}


