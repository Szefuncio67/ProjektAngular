// description.component.ts

import { Component, EventEmitter, Input, Output, OnDestroy } from '@angular/core';
import { Atrakcja } from '../../models/atrakcja';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';


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

  constructor(public authService: AuthService, private fb: FormBuilder) {}

  ngOnInit() {
    if (this.authService.currentEditedRoute && this.authService.edition) {
      const editedRoute = this.authService.currentEditedRoute;
      
      this.myForm.patchValue({
        routeName: editedRoute.Nazwa,
        routeDescription: editedRoute.Opis,
        

      });
      this.nazwa = this.myForm.value.routeName|| '';
      this.nazwaChange.emit(this.nazwa);
    }
    else{
      this.myForm.patchValue({
        routeName: '',
        routeDescription: '',
        

      });
      this.authService.routeLength=0;
      this.authService.legDurations = [];
    }
  }

  ngOnDestroy(): void {
    this.myForm.reset();
  }

  isFormValid() {
    return this.myForm.valid;
  }

  addAddressInput() {
    const newPoint = new Atrakcja(0, '', 0, 0);
    this.authService.points.push(newPoint);

    this.authService
      .convertCoordinatesToAddress(newPoint.wspolrzednaX, newPoint.wspolrzednaY)
      .then((updatedPoint: Atrakcja) => {
        newPoint.nazwa = updatedPoint.nazwa;
        this.authService.drawRoute();
      })
      .catch((error: any) => {
        console.error('Error converting coordinates to address:', error);
      });
  }

  removeAddressInput(index: number) {
    this.authService.points.splice(index, 1);
    this.authService.drawRoute();
  }

  get points() {
    return this.authService.points;
  }

  onMarkerClick(index: number) {
    this.authService.points.splice(index, 1);
    this.authService.onMarkerClick(index);
  }

  addAllPoints() {
    if (this.isFormValid()) {
      this.authService.addAllPoints(
        this.myForm.value.routeName || '',
        this.myForm.value.routeDescription || ''
      );
      this.authService.drawRoute();
    }
    this.myForm.reset();
  }

  updateCoordinatesOnNameChange(index: number) {
    const point = this.authService.points[index];

    this.authService
      .convertAddressToCoordinates(this.authService.points[index].nazwa)
      .then((coordinates: any) => {
        this.authService.points[index].wspolrzednaX = coordinates.latitude;
        this.authService.points[index].wspolrzednaY = coordinates.longitude;
        this.authService.drawRoute();
      })
      .catch((error: any) => {
        console.error('Błąd przekształcania nazwy na współrzędne:', error);
      });
  }

  drop(event: CdkDragDrop<Atrakcja>) {
    if (event.previousIndex != null && event.currentIndex != null) {
      moveItemInArray(this.points, event.previousIndex, event.currentIndex);
      this.authService.drawRoute();
    }
  }

  updateName(event: any, index: number) {
    this.points[index].nazwa = event.target.value;
    this.updateCoordinatesOnNameChange(index);
  }

  SaveEdition() {
    if (this.isFormValid()) {
      this.authService.saveEdition(
        this.myForm.value.routeName || '',
        this.myForm.value.routeDescription || ''
      );
    }
    this.myForm.reset();
    this.nazwa = this.myForm.value.routeName|| 'Nazwa Trasy';
    this.nazwaChange.emit(this.nazwa);
  }

  Cancel() {
    this.authService.addAllPoints(
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
