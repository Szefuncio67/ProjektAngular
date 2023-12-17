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
import { MapComponent } from './components/map/map.component';
import { GoogleMapsModule } from '@angular/google-maps'
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DescriptionComponent } from './components/description/description.component';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { UserComponent } from './components/user/user.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { MyRoutesComponent } from './components/my-routes/my-routes.component';
import { HighlightDirective } from './directive/highlight.directive';
import { AuthService } from './services/auth.service';
import { FilterRoutesPipe } from './filter/filter-routes.pipe';

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
        HighlightDirective,
        FilterRoutesPipe,
    ],
    providers: [MessageService, AuthService],
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
