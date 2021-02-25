export class EnderecoLocalModel {
    cep!: number;
    logradouro?: string;
    numero?: string;
    complemento?: string;
    bairro!: string;
    cidade!: string;
    estado!: string;
    tamanhoLocal!: number;
    escada!: boolean;
    elevador!: boolean;
    restricaoHorario!: boolean;
}