import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateDeputyComponent } from './create-deputy/create-deputy.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from '../pages/login/login.component';
import { ResetPasswordComponent } from '../pages/reset-password/reset-password.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CreateDeputyComponent, canActivate: [AuthGuard] },
  { path: 'create-deputy', component: CreateDeputyComponent, canActivate: [AuthGuard] },
  { path: 'sign-in', component: LoginComponent },
  { path: 'reset-password', component: ResetPasswordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
