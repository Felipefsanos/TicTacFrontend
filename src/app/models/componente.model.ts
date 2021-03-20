import { ProdutoModel } from "./produto.model";

export class ComponenteModel{
    id?: number;
    descricao?: string;
    nome?: string;
    quantidade?: string;

    public constructor(init?: Partial<ComponenteModel>) {
        Object.assign(this, init);
    }
}