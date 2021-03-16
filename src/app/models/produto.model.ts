import { SubProdutoModel } from "./sub-produto.model";

 export class ProdutoModel{

    id?: number;
    descricao?: string;
    nome?: string;
    valor?: number;
    subProdutos?: SubProdutoModel[];

}