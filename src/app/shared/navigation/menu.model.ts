import { MenuItem } from '../models/base/menu-item.model';

export const menuItems: MenuItem[] = [
    {
        id: 0,
        name: 'Clientes',
        icon: 'people_alt',
        url: '/home',
        children: [
            {
                id: 2,
                name: 'Novo',
                url: '/home/tretas',
                children: [
                    {
                        id: 2,
                        name: 'Novo Contrato',
                        url: '/home/teste'
                    }
                ]
            }
        ]
    },
    {
        id: 3,
        name: 'Produtos',
        url: '/home/pizza',
        children: [
            {
                id: 2,
                name: 'Filho do Menu 1',
                url: '/home/tretas'
            }
        ]
    }
];
