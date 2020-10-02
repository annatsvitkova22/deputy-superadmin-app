import { Routes } from '@angular/router';

import { UsersComponent } from '../../pages/users/users.component';

export const MainRoutes: Routes = [
    {
        path: '',
        children: [
            { path: 'users', component: UsersComponent}
        ]
    }
];
