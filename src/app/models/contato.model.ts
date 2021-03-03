export class ContatoModel {
    telefone!: number;
    email?: string;
    ddd!: number;
    nomeContato!: string;

    public constructor(init?: Partial<ContatoModel>) {
        debugger;
        Object.assign(this, init);

        if (init && init.telefone) {
            this.ddd = +init.telefone.toString().substring(0, 2);
            this.telefone = +init.telefone.toString().replace('-', '').substring(2);
        }
    }
}
