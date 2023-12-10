import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { UserComponent } from './user/user.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { FavoriteRoutesComponent } from './favorite-routes/favorite-routes.component';
import { MyRoutesComponent } from './my-routes/my-routes.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  { path: 'user', component: UserComponent, canActivate: [authGuard], children: [
    { path: 'about-me', component: AboutMeComponent },
    { path: 'my-routes', component: MyRoutesComponent },
    { path: 'favorite-routes', component: FavoriteRoutesComponent },
    { path: '', redirectTo: 'about-me', pathMatch: 'full' }
  ]},
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
