import { Component} from '@angular/core';
import { MapService } from '../services/map.service';
import { Atrakcja } from '../interfaces/atrakcja';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css'],
})
export class DescriptionComponent {
  constructor(public mapService: MapService) {}
  routeName:string = '';
  routeDescription:string = '';
  addAddressInput() {
    // Add a new empty point to the map service
    const newPoint = new Atrakcja(0, '', 0, 0);
    this.mapService.points.push(newPoint);
  
    // Convert coordinates to address for the newly added point
    this.mapService.convertCoordinatesToAddress(newPoint.wspolrzednaX, newPoint.wspolrzednaY)
      .then((updatedPoint: Atrakcja) => {
        // Update the point with the retrieved address
        newPoint.nazwa = updatedPoint.nazwa;
  
        // Redraw the route
        this.mapService.drawRoute();
      })
      .catch((error: any) => {
        console.error('Error converting coordinates to address:', error);
      });
  }
  
  removeAddressInput(index: number) {
    // Remove the point from the map service and redraw the route
    this.mapService.points.splice(index, 1);
    this.mapService.drawRoute();
  }


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
    if (this.routeName && this.routeDescription) {
      this.mapService.addAllPoints(this.routeName, this.routeDescription);
      this.mapService.drawRoute();
      this.routeName='';
      this.routeDescription='';
    }
  }

  updateCoordinatesOnNameChange(index: number) {
    const point = this.mapService.points[index];

    // Przykładowa logika aktualizacji współrzędnych na podstawie nazwy
    // Dla przykładu, tutaj wywołuję funkcję przekształcającą nazwę na współrzędne
    this.mapService.convertAddressToCoordinates(this.mapService.points[index].nazwa)
      .then((coordinates: any) => {
        this.mapService.points[index].wspolrzednaX = coordinates.latitude;
        this.mapService.points[index].wspolrzednaY = coordinates.longitude;
        this.mapService.drawRoute();
      })
      .catch((error: any) => {
        console.error('Błąd przekształcania nazwy na współrzędne:', error);
      });
  }
  
  drop(event: CdkDragDrop<Atrakcja>) {
    // Check if the event is of type CdkDragDrop before proceeding
    if (event.previousIndex != null && event.currentIndex != null) {
      moveItemInArray(this.points, event.previousIndex, event.currentIndex);
      this.mapService.drawRoute();
    }
  }
  updateName(event: any, index: number) {
    // Update the name property for the corresponding point
    this.points[index].nazwa = event.target.value;
  }
  
  
}
