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
            }
        ]
    },
];
