import { Routes } from '@angular/router';

import { UsersComponent } from '../../pages/users/users.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { CreateDeputyComponent } from '../create-deputy/create-deputy.component';

export const MainRoutes: Routes = [
    {
        path: '',
        children: [
            { path: 'users', component: UsersComponent},
            { path: 'notifications', component: NotificationsComponent},
            { path: 'create-deputy', component: CreateDeputyComponent },
        ]
    }
];
