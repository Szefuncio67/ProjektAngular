import { Component} from '@angular/core';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css'],
})
export class DescriptionComponent {
  constructor(public mapService: MapService) {}

  get points() {
    return this.mapService.points;
  }

  onMarkerClick(index: number) {
    // Usuń punkt z listy
    this.mapService.points.splice(index, 1);
  
    // Powiadom MapComponent o kliknięciu
    this.mapService.onMarkerClick(index);
  }

  addAllPoints() {
    this.mapService.addAllPoints();
    this.mapService.drawRoute(); // Add this line to redraw the route on the map
  }

  updateCoordinatesOnNameChange(index: number) {
    const point = this.mapService.points[index];

    // Przykładowa logika aktualizacji współrzędnych na podstawie nazwy
    // Dla przykładu, tutaj wywołuję funkcję przekształcającą nazwę na współrzędne
    this.mapService.convertAddressToCoordinates(this.mapService.points[index].name)
      .then((coordinates: any) => {
        this.mapService.points[index].latitude = coordinates.latitude;
        this.mapService.points[index].longitude = coordinates.longitude;
        this.mapService.drawRoute();
      })
      .catch((error: any) => {
        console.error('Błąd przekształcania nazwy na współrzędne:', error);
      });
  }
  
  
}
