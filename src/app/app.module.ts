import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './components/nav/nav.component';
import { FormComponent } from './components/form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
