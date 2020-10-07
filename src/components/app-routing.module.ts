import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../pages/login/login.component';
import { ResetPasswordComponent } from '../pages/reset-password/reset-password.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: '/dashbord/users', pathMatch: 'full' },
      {
        path: 'dashbord',
        loadChildren: () => import('./main/main.component.module').then(m => m.MainComponentsModule)
      },
    ]
  },
  { path: '', pathMatch: 'full', component: MainComponent, },
  { path: 'sign-in', component: LoginComponent },
  { path: 'reset-password', component: ResetPasswordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
