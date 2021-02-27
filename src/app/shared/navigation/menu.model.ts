import { MenuItem } from '../models/base/menu-item.model';

export const menuItems: MenuItem[] = [
    {
        id: 1,
        name: 'Home',
        url: 'p/home'
    },
    {
        id: 2,
        name: 'Orçamentos',
        children: [
            {
                id: 3,
                name: 'Novo Orçamento',
                url: 'p/orcamentos/novo'
            },
            {
                id: 4,
                name: 'Lista de Orçamentos',
                url: 'p/orcamentos/listagem'
            }
        ]
    },
    {
        id: 5,
        name: 'Configurações',
        children: [
            {
                id: 6,
                name: 'Canais de Captação',
                url: 'p/configuracoes/canal-captacao'
            },
        ]
    },
];
