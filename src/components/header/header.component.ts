import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { UserAvatal } from '../../models';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    shortName: string;
    imageUrl: string;
    dropdownLinks = [
        {name: 'Мій профіль', path: '/profile'},
        {name: 'Налаштування', path: '/edit'},
        {name: 'Вийти', path: 'signout'}
    ];
    links = [
        {name: 'Запити', path: '/'},
        {name: 'Депутати', path: '/deputies'},
        {name: 'Про проект', path: '/about-project'}
    ];
    isOpen: boolean;
    isDropdown: boolean;
    isCreateAppeal: boolean;
    path: string;

    constructor(
        private route: ActivatedRoute,
        private authService: AuthService,
        private router: Router
    ){}

    async ngOnInit(): Promise<void> {
        this.route.url.subscribe(res => {
            if (res.length) {
                this.path = res[0].path;
            }
        });

        const userAvatar: UserAvatal = await this.authService.getUserImage();
        if (userAvatar && userAvatar.imageUrl) {
            this.imageUrl = userAvatar.imageUrl;
        } else if (userAvatar && userAvatar.shortName) {
            this.shortName = userAvatar.shortName;
        }
    }


    @HostListener('document:click', ['$event'])
    @HostListener('document:touchstart', ['$event'])
    handleOutsideClick(event) {
        const avatar = 'avatar avatar__medium header-avatar';
        if (avatar !== event.target.className && this.isDropdown) {
            this.isDropdown = false;
        }
    }

    onMobileLink(): void {
        const bodyElement = document.getElementsByTagName('body');
        bodyElement[0].style.overflow = 'visible';
    }

    isCurrentRoute(route: string): boolean {
        return this.router.url === route;
    }

    onOpenMenu(): void {
        this.isOpen = !this.isOpen;

        if (this.isOpen) {
            const bodyElement = document.getElementsByTagName('body');
            bodyElement[0].style.overflow = 'hidden';
        } else {
            const bodyElement = document.getElementsByTagName('body');
            bodyElement[0].style.overflow = 'visible';
        }
    }

    onOpenDropdown(): void {
        this.isDropdown = !this.isDropdown;
    }

    onDropdown(link: string): void {
        if (link === 'signout') {
            this.authService.signOut();
            this.router.navigate(['/sign-in']);
        } else {
            this.router.navigate([link]);
        }
    }
}
