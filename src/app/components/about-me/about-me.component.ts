// about-me.component.ts
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { Trasa } from '../../models/trasa';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css'],
})
// about-me.component.ts
// about-me.component.ts
export class AboutMeComponent implements OnInit {
  user: Observable<User | null> = this.authService.getUser();
  trasy: Trasa[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getTrasa().subscribe((trasy: Trasa[] | null) => {
      if (trasy !== null) {
        this.trasy = trasy;
      }
    });
  }
}


