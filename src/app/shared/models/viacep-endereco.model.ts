export class ViaCepEnderecoModel {
    cep!: number;
    logradouro!: string;
    numero!: number;
    complemento?: string;
    bairro!: string;
    localidade!: string;
    uf!: string;
}