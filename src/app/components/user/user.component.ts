// user.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Trasa } from '../../models/trasa';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit() {
    const email:string = sessionStorage.getItem('email') || '';
    this.getUserByEmail(email);
  }

  getUserByEmail(email: string): void {
    this.authService.getUserByEmail(email).subscribe(
      (users: User[]) => {
        if (users.length > 0) {
          const user = users[0];
          this.authService.setUser(user);
          this.authService.getTrasaById(users[0].id).subscribe(
            (trasy: Trasa[]) =>{
              if (trasy.length > 0) {
                const tras:Trasa[] = trasy;
                this.authService.setTrasa(tras);
            }
          }
          )
        } else {
        }
      },
      (error) => {
        console.error('Error fetching user by email:', error);
      }
    );
  }
  
}
