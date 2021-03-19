import { ComponenteModel } from "./componente.model";

 export class ProdutoModel{

    id?: number;
    descricao?: string;
    nome?: string;
    valor?: number;
    subProdutos?: ComponenteModel[];

}