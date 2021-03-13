export class ConfimacaoModalModel{
    titulo?: 'Alerta' | 'Informação' | 'Sucesso';
    mensagem?: string;
    pergunta?: string;

    constructor(titulo?: 'Alerta' | 'Informação' | 'Sucesso', mensagem?: string, pergunta?: string) {
        this.titulo = titulo;
        this.mensagem = mensagem;
        this.pergunta = pergunta;
    }
}
