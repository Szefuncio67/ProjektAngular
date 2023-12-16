// description.component.ts

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MapService } from '../services/map.service';
import { Atrakcja } from '../interfaces/atrakcja';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css'],
})
export class DescriptionComponent {

  @Input() nazwa: string = '';
  @Output() nazwaChange = new EventEmitter<string>();
  myForm = this.fb.group({
    routeName: ['', [Validators.required, Validators.maxLength(30)]],
    routeDescription: ['', [Validators.maxLength(200), Validators.required]],
  });

  constructor(public mapService: MapService, private fb: FormBuilder) {}

  ngOnInit() {
    // Sprawdź, czy aktualnie edytowana trasa jest ustawiona w serwisie
    if (this.mapService.currentEditedRoute) {
      const editedRoute = this.mapService.currentEditedRoute;
      
      // Ustaw dane edytowanej trasy w formularzu
      this.myForm.patchValue({
        routeName: editedRoute.Nazwa,
        routeDescription: editedRoute.Opis,
        

      });
      this.nazwa = this.myForm.value.routeName|| '';
      this.nazwaChange.emit(this.nazwa);
    }
  }

  isFormValid() {
    return this.myForm.valid;
  }

  addAddressInput() {
    const newPoint = new Atrakcja(0, '', 0, 0);
    this.mapService.points.push(newPoint);

    this.mapService
      .convertCoordinatesToAddress(newPoint.wspolrzednaX, newPoint.wspolrzednaY)
      .then((updatedPoint: Atrakcja) => {
        newPoint.nazwa = updatedPoint.nazwa;
        this.mapService.drawRoute();
      })
      .catch((error: any) => {
        console.error('Error converting coordinates to address:', error);
      });
  }

  removeAddressInput(index: number) {
    this.mapService.points.splice(index, 1);
    this.mapService.drawRoute();
  }

  get points() {
    return this.mapService.points;
  }

  onMarkerClick(index: number) {
    this.mapService.points.splice(index, 1);
    this.mapService.onMarkerClick(index);
  }

  addAllPoints() {
    if (this.isFormValid()) {
      this.mapService.addAllPoints(
        this.myForm.value.routeName || '',
        this.myForm.value.routeDescription || ''
      );
      this.mapService.drawRoute();
    }
    this.myForm.reset();
  }

  updateCoordinatesOnNameChange(index: number) {
    const point = this.mapService.points[index];

    this.mapService
      .convertAddressToCoordinates(this.mapService.points[index].nazwa)
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
    if (event.previousIndex != null && event.currentIndex != null) {
      moveItemInArray(this.points, event.previousIndex, event.currentIndex);
      this.mapService.drawRoute();
    }
  }

  updateName(event: any, index: number) {
    this.points[index].nazwa = event.target.value;
    this.updateCoordinatesOnNameChange(index);
  }

  SaveEdition() {
    if (this.isFormValid()) {
      this.mapService.saveEdition(
        this.myForm.value.routeName || '',
        this.myForm.value.routeDescription || ''
      );
    }
    this.myForm.reset();
    this.nazwa = this.myForm.value.routeName|| 'Nazwa Trasy';
    this.nazwaChange.emit(this.nazwa);
  }

  Cancel() {
    this.mapService.addAllPoints(
      this.myForm.value.routeName || '',
      this.myForm.value.routeDescription || ''
    );
    this.myForm.reset();
    this.nazwa = this.myForm.value.routeName|| 'Nazwa Trasy';
    this.nazwaChange.emit(this.nazwa);
  }
  updateTName(event: any) {
    this.nazwa = event.target.value;
    this.nazwaChange.emit(this.nazwa);

  }
  
}
