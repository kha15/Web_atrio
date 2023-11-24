import { ApplicationRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonListComponent } from './person-list/person-list.component';
import { JobListComponent } from './job-list/job-list.component';


@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  
  
})
export class AppModule {
  ngDoBootstrap(appRef: ApplicationRef) {
    // Your bootstrap logic here
  }
 }
