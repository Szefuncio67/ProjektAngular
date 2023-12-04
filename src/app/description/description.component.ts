import { Component, Input } from '@angular/core';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
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
  
  
}
