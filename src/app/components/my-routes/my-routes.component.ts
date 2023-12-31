// my-routes.component.ts
import { Component, OnInit } from '@angular/core';
import { Trasa } from '../../models/trasa';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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
  searchTerm: string = '';

  constructor(
     private authService: AuthService,
       private router: Router) {}

  ngOnInit() {
    this.authService.getTrasa().subscribe((trasy: Trasa[] | null) => {
      if (trasy !== null) {
        this.trasy = trasy.map((trasa) => ({ ...trasa, showDetails: false } as TrasaWithDetails));
      }
    });
  }

  toggleDetails(trasa: TrasaWithDetails): void {
    trasa.showDetails = !trasa.showDetails;
  }

  removeTrasa(trasa: TrasaWithDetails): void {
    const trasaId = trasa.id;
  
    this.authService.removeTrasa(trasaId);
  
    this.authService.removeTrasaFromUser(trasaId).subscribe(
      () => {
      },
      error => {
        console.error('Error removing favorite route:', error);
        this.authService.getTrasa().subscribe((trasy: Trasa[] | null) => {
          if (trasy !== null) {
            this.trasy = trasy.map(t => ({ ...t, showDetails: false } as TrasaWithDetails));
          }
        });
      }
    );
  }
  editRoute(trasa: Trasa): void {
    this.authService.setEditedRoute(trasa);
    this.router.navigateByUrl('').then(() => {
      this.authService.editing(trasa);
    });
  }
  updateSearchTerm(event: any): void {
    this.searchTerm = event.target.value.toLowerCase();
  }
}
