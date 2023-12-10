// user.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { Trasa } from '../interfaces/trasa';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    const email = sessionStorage.getItem('email') || '';
    this.getUserByEmail(email);
  }

  getUserByEmail(email: string): void {
    this.authService.getUserByEmail(email).subscribe(
      (users: User[]) => {
        if (users.length > 0) {
          const user = users[0];
          this.userService.setUser(user);
          this.authService.getTrasaById(users[0].id).subscribe(
            (trasy: Trasa[]) =>{
              if (trasy.length > 0) {
                const tras = trasy;
                this.userService.setTrasa(tras);
            }
          }
          )
        } else {
          console.log('User not found');
        }
      },
      (error) => {
        console.log('Error fetching user by email:', error);
      }
    );
  }
  
}
