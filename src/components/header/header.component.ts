import { Component, OnInit, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { UserAvatal } from '../../models';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    @Input() isMenu: boolean;
    @Output() onMenuActive = new EventEmitter();
    shortName: string;
    imageUrl: string;
    dropdownLinks = [
        {name: 'Налаштування', path: '/dashbord/settings'},
        {name: 'Вийти', path: 'signout'}
    ];
    isOpen: boolean;
    isDropdown: boolean;
    isCreateAppeal: boolean;
    path: string;
    counter: number = 0;
    isMobile: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private authService: AuthService,
        private router: Router
    ){}

    outside(event) {
        if (event && this.isDropdown) {
            this.counter = this.counter + 1;
            if ( this.counter !== 1) {
                this.isDropdown = false;
                this.counter = 0;
            }
        }
    }

    async ngOnInit(): Promise<void> {
        this.route.url.subscribe(res => {
            if (res.length) {
                this.path = res[0].path;
            }
        });

        if (window.innerWidth < 769) {
            this.isMobile = true;
        }
        const userAvatar: UserAvatal = await this.authService.getUserImage();
        if (userAvatar && userAvatar.imageUrl) {
            this.imageUrl = userAvatar.imageUrl;
        } else if (userAvatar && userAvatar.shortName) {
            this.shortName = userAvatar.shortName;
        }
    }

    @HostListener('window:resize', ['$event'])
	onResize(event) {
        const width: number = event.target.innerWidth;
        if (width < 769) {
            this.isMobile = true;
        } else {
            this.isMobile = false;
        }
	}

    onOpenMenu(): void {
        this.isOpen = !this.isOpen;
        this.onMenuActive.emit(this.isOpen);
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
