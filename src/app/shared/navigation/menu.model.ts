import { MenuItem } from '../models/base/menu-item.model';

export const menuItems: MenuItem[] = [
    {
        id: 1,
        name: 'Home',
        url: 'p/home'
    },
    {
        id: 2,
        name: 'Clientes',
        children: [
            {
                id: 3,
                name: 'Novo Cliente',
                url: 'p/clientes/novo'
            }
        ]
    },
    {
        id: 4,
        name: 'Orçamentos',
        children: [
            {
                id: 5,
                name: 'Novo Orçamento',
                url: 'p/orcamentos/novo'
            }
        ]
    }
];
