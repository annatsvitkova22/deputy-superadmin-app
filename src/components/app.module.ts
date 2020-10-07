import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { NgSelectModule } from '@ng-select/ng-select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxSlickJsModule } from 'ngx-slickjs';

import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { authReducer } from '../store/auth.reducer';
import { HeaderComponent, AppComponent,
  GenericInputComponent, AuthComponent, DeputyService, AuthService, AuthGuard, MainComponent, CreateDeputyComponent } from '.';
import { LoginComponent } from '../pages/login/login.component';
import { AvatarComponent } from './avatar/avatar.component';
import { ResetPasswordComponent } from '../pages/reset-password/reset-password.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoaderComponent } from './loader/loader.component';
import { SettingsComponent } from '../pages/settings/settings.component';
import { ChangePasswordComponent } from './settings/change-password/change-password.component';
import { ChangeEmailComponent } from './settings/change-email/change-email.component';
import { SettingsService } from './settings/settings.service';
import { UsersComponent } from '../pages/users/users.component';
import { NotificationsComponent } from '../pages/notifications/notifications.component';
import { InformationComponent } from './information/information.component';
import { DistrictsComponent } from '../pages/districts/districts.component';
import { PartiesComponent } from '../pages/parties/parties.component';
import { NotificationsService } from '../pages/notifications/notificatons.service';
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
    LoaderComponent,
    UsersComponent,
    NotificationsComponent,
    InformationComponent,
    DistrictsComponent,
    PartiesComponent,
    ChangeEmailComponent,
    ChangePasswordComponent,
    SettingsComponent
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
    Ng2SmartTableModule,
    MatIconModule,
    MatTabsModule,
    NgxSlickJsModule.forRoot({
        links: {
            jquery: 'https://code.jquery.com/jquery-3.4.0.min.js',
            slickJs: 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js',
            slickCss: 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css',
            slickThemeCss: 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css'
        }
    }),
  ],
  providers: [
    DeputyService,
    AuthService,
    SettingsService,
    UsersService,
    NotificationsService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
