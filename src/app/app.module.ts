import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { CreateDeputyComponent } from './create-deputy/create-deputy.component';
import { GenericInputComponent } from './generic-input/generic-input.component';
import { DeputyService } from './create-deputy/create-deputy.service';

@NgModule({
  declarations: [
    AppComponent,
    CreateDeputyComponent,
    GenericInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [
    DeputyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
