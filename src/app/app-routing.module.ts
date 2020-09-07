import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateDeputyComponent } from './create-deputy/create-deputy.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CreateDeputyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
