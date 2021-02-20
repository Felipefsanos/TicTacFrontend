export class MenuItem {
    id!: number;
    name!: string;
    url?: string;
    icon?: string;
    children?: MenuItem[];
}

export interface MenuFlatNode {
    expandable: boolean;
    name: string;
    url: string;
    icon: string;
    level: number;
}
