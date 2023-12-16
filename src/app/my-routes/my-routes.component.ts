// my-routes.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Trasa } from '../interfaces/trasa';
import { AuthService } from '../services/auth.service';
import { MapService } from '../services/map.service';
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

  constructor(
    private userService: UserService,
     private authService: AuthService,
      private mapService: MapService,
       private router: Router) {}

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

  removeTrasa(trasa: TrasaWithDetails): void {
    const trasaId = trasa.id; // Assuming there's an 'id' property in Trasa interface
  
    this.userService.removeTrasa(trasaId); // Remove locally first for better user experience
  
    this.authService.removeTrasaFromUser(trasaId).subscribe(
      () => {
        console.log('Favorite route removed successfully');
      },
      error => {
        console.error('Error removing favorite route:', error);
        // Revert the local changes if the server request fails
        this.userService.getTrasa().subscribe((trasy: Trasa[] | null) => {
          if (trasy !== null) {
            this.trasy = trasy.map(t => ({ ...t, showDetails: false } as TrasaWithDetails));
          }
        });
      }
    );
  }
  editRoute(trasa: Trasa): void {
    this.mapService.setEditedRoute(trasa);
    // Navigate to the desired route first
    this.router.navigateByUrl('').then(() => {
      // Perform the editRoute logic after the navigation is complete
      this.mapService.editing(trasa);
      console.log('Editing route:', trasa.Atrakcje);
    });
  }
}
