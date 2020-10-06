import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { NgSelectModule } from '@ng-select/ng-select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { authReducer } from '../store/auth.reducer';
import { HeaderComponent, AppComponent,
  GenericInputComponent, AuthComponent, DeputyService, AuthService, AuthGuard, MainComponent, CreateDeputyComponent } from '.';
import { LoginComponent } from '../pages/login/login.component';
import { AvatarComponent } from './avatar/avatar.component';
import { ResetPasswordComponent } from '../pages/reset-password/reset-password.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UsersService } from '../pages/users/users.service';

@NgModule({
  declarations: [
    AppComponent,
    GenericInputComponent,
    AuthComponent,
    ResetPasswordComponent,
    HeaderComponent,
    LoginComponent,
    AvatarComponent,
    MainComponent,
    SidebarComponent,
    CreateDeputyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({authStore: authReducer}),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    NoopAnimationsModule,
  ],
  providers: [
    DeputyService,
    AuthService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
