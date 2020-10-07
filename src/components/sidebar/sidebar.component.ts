import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    @Input() isActive: boolean;
    links = [
        {name: 'Користувачи', path: '/dashbord/users', icon: 'people'},
        {name: 'Сповіщення', path: '/dashbord/notifications', icon: 'notifications'},
        {name: 'Зареєструвати депутата', path: '/dashbord/create-deputy', icon: 'person_add'},
        {name: 'Партії', path: '/dashbord/parties', icon: 'work'},
        {name: 'Райони', path: '/dashbord/districts', icon: 'location_on'},
        {name: 'Налаштування', path: '/dashbord/settings', icon: 'settings'},
    ];

    constructor(
        private router: Router
    ){}

    isCurrentRoute(route: string): boolean {
        return this.router.url === route;
    }
}
