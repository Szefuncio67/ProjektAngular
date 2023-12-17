import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router, private authService: AuthService) { }

  get isLoggedIn(): boolean {
    return !!sessionStorage.getItem('email');
  }

  logOut() {
    this.authService.clear();
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}
