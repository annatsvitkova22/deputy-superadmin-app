import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateDeputyComponent } from './create-deputy/create-deputy.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth.guard';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CreateDeputyComponent, canActivate: [AuthGuard] },
  { path: 'create-deputy', component: CreateDeputyComponent },
  { path: 'login', component: AuthComponent },
  { path: 'resetPassword', component: ResetPasswordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
