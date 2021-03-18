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
                name: 'Orçamentos',
                url: 'p/orcamentos'
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
                url: 'p/configuracoes/canais-captacao'
            },
            {
                id: 5,
                name: 'Usuários',
                children: [
                    {
                        id: 6,
                        name: 'Novo Usuário',
                        url: 'p/configuracoes/usuarios/novo-usuario'
                    },
                    {
                        id: 6,
                        name: 'Usuários',
                        url: 'p/configuracoes/usuarios'
                    }
                ]
            },
        ]
    },
    {
        id: 7,
        name: 'Produtos',
        children: [
            {
                id: 8,
                name: 'Produto',
                children: [
                    {
                        id: 9,
                        name: 'Novo Produto',
                        url: 'p/produtos/novo-produto'
                    },
                    {
                        id: 10,
                        name: 'Novo SubProduto',
                        url: 'p/produtos/novo-sub-produto'
                    },
                ]
            }
        ]
    },
    {
        id: 7,
        name: 'Prestadores',
        children: [
            {
                id: 11,
                name: 'Novo Prestador',
                url: 'p/prestadores/novo'
            },
            {
                id: 11,
                name: 'Prestadores',
                url: 'p/prestadores'
            }
        ]
    }
];
