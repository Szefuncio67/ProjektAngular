// about-me.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { Trasa } from '../interfaces/trasa';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css'],
})
// about-me.component.ts
// about-me.component.ts
export class AboutMeComponent implements OnInit {
  user: Observable<User | null> = this.userService.getUser();
  trasy: Trasa[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getTrasa().subscribe((trasy: Trasa[] | null) => {
      if (trasy !== null) {
        this.trasy = trasy;
      }
    });
  }
}


