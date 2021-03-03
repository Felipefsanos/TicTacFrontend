import { ClienteModel } from './cliente.model';
import { EnderecoLocalModel } from './endereco-local.model';

export class OrcamentoModel {
    dataEvento!: Date;
    horaEvento!: string;
    tipoEvento!: string;
    quantidadeAdultos!: number;
    quantidadeCriancas!: number;
    buffetPrincipal!: boolean;
    observacao?: string;
    local!: EnderecoLocalModel;
    cliente!: ClienteModel;

    public constructor(init?: Partial<OrcamentoModel>, clienteInit?: Partial<ClienteModel>, enderecoInit?: Partial<EnderecoLocalModel>) {
        Object.assign(this, init);

        if (init && init.dataEvento && init.horaEvento) {
            this.dataEvento = new Date(init.dataEvento.getFullYear(),
                                       init.dataEvento.getMonth(),
                                       init.dataEvento.getDay(),
                                       +init.horaEvento.slice(0, 2),
                                       +init.horaEvento.slice(2));
        }

        this.local = new EnderecoLocalModel(enderecoInit);
        this.cliente = new ClienteModel(clienteInit);
    }
}


