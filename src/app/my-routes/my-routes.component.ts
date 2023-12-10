// my-routes.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Trasa } from '../interfaces/trasa';

interface TrasaWithDetails extends Trasa {
  showDetails: boolean;
}

@Component({
  selector: 'app-my-routes',
  templateUrl: './my-routes.component.html',
  styleUrls: ['./my-routes.component.css'],
})
export class MyRoutesComponent implements OnInit {
  trasy: TrasaWithDetails[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getTrasa().subscribe((trasy: Trasa[] | null) => {
      if (trasy !== null) {
        this.trasy = trasy.map((trasa) => ({ ...trasa, showDetails: false } as TrasaWithDetails));
      }
    });
  }

  toggleDetails(trasa: TrasaWithDetails): void {
    trasa.showDetails = !trasa.showDetails;
  }
}
