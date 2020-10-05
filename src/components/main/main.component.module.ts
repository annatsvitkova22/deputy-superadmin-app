import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { MainRoutes } from './main.component.routing';
import { UsersComponent } from '../../pages/users/users.component';
import { UsersService } from '../../pages/users/users.service';
import { LoaderComponent } from '../loader/loader.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { CreateDeputyComponent } from '../create-deputy/create-deputy.component';
import { GenericInputComponent } from '../generic-input/generic-input.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        UsersComponent,
        LoaderComponent,
        NotificationsComponent,
    ],
    imports: [
        CommonModule,
        MatIconModule,
        RouterModule.forChild(MainRoutes),
        Ng2SmartTableModule,
    ],
    providers: [
        UsersService
    ]
})
export class MainComponentsModule {

}
