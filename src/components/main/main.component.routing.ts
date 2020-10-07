import { Routes } from '@angular/router';

import { UsersComponent } from '../../pages/users/users.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { CreateDeputyComponent } from '../create-deputy/create-deputy.component';
import { DistrictsComponent } from '../../pages/districts/districts.component';
import { PartiesComponent } from '../../pages/parties/parties.component';
import { AuthGuard } from '../auth.guard';

export const MainRoutes: Routes = [
    {
        path: '',
        children: [
            { path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
            { path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard]},
            { path: 'create-deputy', component: CreateDeputyComponent, canActivate: [AuthGuard] },
            { path: 'districts', component: DistrictsComponent, canActivate: [AuthGuard] },
            { path: 'parties', component: PartiesComponent, canActivate: [AuthGuard] },
        ]
    }
];
