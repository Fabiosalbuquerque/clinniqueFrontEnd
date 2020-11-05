import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',     title: 'Dashboard',         icon: 'nc-bank',       class: '' },
    { path: '/paciente',         title: 'Pacientes',             icon: 'nc-diamond',    class: '' },
    { path: '/notifications', title: 'Serviços',     icon: 'nc-bell-55',    class: '' },
    { path: '/user',          title: 'Meu Perfil',      icon: 'nc-single-02',  class: '' },
    { path: '/table',         title: 'Financeiro',        icon: 'nc-tile-56',    class: '' },
    { path: '/typography',    title: 'Estoque',        icon: 'nc-caps-small', class: '' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    constructor(private auth: AuthService)  {}
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    sair() {
    this.auth.logout();
    }
}
