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
import { DragDropModule } from '@angular/cdk/drag-drop';
import { UserComponent } from './user/user.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { MyRoutesComponent } from './my-routes/my-routes.component';
import { FavoriteRoutesComponent } from './favorite-routes/favorite-routes.component';
import { HighlightDirective } from './highlight.directive';
import { MapService } from './services/map.service';
import { AuthService } from './services/auth.service';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        HomeComponent,
        NavbarComponent,
        DescriptionComponent,
        UserComponent,
        AboutMeComponent,
        MyRoutesComponent,
        FavoriteRoutesComponent,
        HighlightDirective,
    ],
    providers: [MessageService, MapService, AuthService],
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
        DragDropModule
    ]
})
export class AppModule { }
