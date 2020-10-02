import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    links = [
        {name: 'Користувачи', path: '/dashbord/users'},
        {name: 'Депутати', path: '/users'},
        {name: 'Запити', path: '/users'},
        {name: 'Користувачи', path: '/users'},
        {name: 'Депутати', path: '/users'},
        {name: 'Запити', path: '/users'},
        {name: 'Користувачи', path: '/users'},
        {name: 'Депутати', path: '/users'},
        {name: 'Запити', path: '/users'}
    ];

    constructor(
        private router: Router
    ){}

    isCurrentRoute(route: string): boolean {
        return this.router.url === route;
    }
}
