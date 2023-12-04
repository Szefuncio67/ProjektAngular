import { Injectable } from '@angular/core';
import { Point } from '../interfaces/point';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  
  points: Point[] = [];
  markerClickSubject = new Subject<number>();
  mapComponentDrawRouteSubject = new Subject<void>();

  // Metoda do powiadamiania o kliknięciu znacznika
  onMarkerClick(index: number) {
    this.markerClickSubject.next(index);
  }

  addAllPoints() {
    // Skopiuj wszystkie punkty do innej tablicy (możesz użyć .slice() lub innych metod)
    const allPoints = this.points.slice();
    
    // Zeruj listę punktów
    this.points = [];

    // Dodaj wszystkie punkty do tablicy (np. możesz przekazać je do innego serwisu, komponentu, itp.)
    console.log('All points:', allPoints);
  }

  drawRoute() {
    // Emit an event to notify subscribers (e.g., MapComponent) to redraw the route
    this.mapComponentDrawRouteSubject.next();
  }
  
  

  
}
