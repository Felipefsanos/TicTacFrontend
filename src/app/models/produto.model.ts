import { ComponenteModel } from "./componente.model";

 export class ProdutoModel{

    id?: number;
    descricao?: string;
    nome?: string;
    valor?: number;
    componentes?: ComponenteModel[];
    public constructor(init?: Partial<ComponenteModel>) {
        Object.assign(this, init);
    }
}