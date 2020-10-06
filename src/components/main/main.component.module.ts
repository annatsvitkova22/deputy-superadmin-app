import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import {  NgxSlickJsModule } from 'ngx-slickjs';

import { MainRoutes } from './main.component.routing';
import { UsersComponent } from '../../pages/users/users.component';
import { UsersService } from '../../pages/users/users.service';
import { LoaderComponent } from '../loader/loader.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { NotificationsService } from '../../pages/notifications/notificatons.service';

@NgModule({
    declarations: [
        UsersComponent,
        LoaderComponent,
        NotificationsComponent,
    ],
    imports: [
        CommonModule,
        MatIconModule,
        MatTabsModule,
        NgxSlickJsModule,
        NgxSlickJsModule.forRoot({
            links: {
                jquery: 'https://code.jquery.com/jquery-3.4.0.min.js',
                slickJs: 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js',
                slickCss: 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css',
                slickThemeCss: 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css'
            }
        }),
        RouterModule.forChild(MainRoutes),
        Ng2SmartTableModule,
    ],
    providers: [
        UsersService,
        NotificationsService
    ]
})
export class MainComponentsModule {

}
