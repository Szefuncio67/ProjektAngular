import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { MapComponent } from './map/map.component';
import { GoogleMapsModule } from '@angular/google-maps'
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { DescriptionComponent } from './description/description.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        HomeComponent,
        NavbarComponent,
        DescriptionComponent,
    ],
    providers: [MessageService],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CardModule,
        InputTextModule,
        ReactiveFormsModule,
        ButtonModule,
        HttpClientModule,
        ToastModule,
        BrowserAnimationsModule,
        GoogleMapsModule,
        MapComponent,
        CommonModule,
        FormsModule,
    ]
})
export class AppModule { }
