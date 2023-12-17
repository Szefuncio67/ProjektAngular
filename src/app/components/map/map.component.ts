import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';

import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { Atrakcja } from '../../models/atrakcja';
import { AuthService } from '../../services/auth.service';


declare var google: any;


@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  imports: [GoogleMapsModule,CommonModule]
})
export class MapComponent implements AfterViewInit, OnDestroy, OnInit {
  private markerClickSubscription: Subscription = new Subscription();
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.initMap();
  }
  @ViewChild('mapElement', { static: false }) mapElement!: ElementRef;

  map!: google.maps.Map;
  directionsService!: google.maps.DirectionsService;
  directionsRenderer!: google.maps.DirectionsRenderer;
  points: Atrakcja[] = [];
  selectedMarkerIndex: number | null = null; // Keep track of the selected marker index
  markers: google.maps.Marker[] = [];

  ngAfterViewInit() {
    this.initMap();

    this.markerClickSubscription = this.authService.markerClickSubject.subscribe((index: number) => {
      this.onMarkerClick(index);
    });
    this.authService.mapComponentDrawRouteSubject.subscribe(() => {
      //this.directionsRenderer.setMap(null);
      this.drawRoute();
  });
  
  }
  ngOnDestroy() {
    // Zakończ subskrypcję w momencie zniszczenia komponentu
    this.markerClickSubscription.unsubscribe();
    // Wyczyszczenie listy punktów przy zniszczeniu komponentu
    this.authService.points = [];
    this.authService.routeName = '';
    this.authService.routeDescription ='';
    this.authService.edition = false;
    
  }

  initMap() {
    const mapProperties = {
      center: new google.maps.LatLng(51.9189046, 19.1343786),
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    this.map = new google.maps.Map(
      this.mapElement.nativeElement,
      mapProperties
    );

    this.map.addListener('click', (event: any) => {
      this.onMapClick(event);
    });
    this.drawRoute();
  }

  drawRoute() {
    if (this.directionsRenderer) {
      this.directionsRenderer.setMap(null);
    }

    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer({
    preserveViewport: true, // Dodaj tę opcję, aby zachować bieżący widok mapy
  });
    this.directionsRenderer.setMap(this.map);
    if(this.authService.points[0]){
      const start = new google.maps.LatLng(this.authService.points[0].wspolrzednaX, this.authService.points[0].wspolrzednaY);
      const end = new google.maps.LatLng(this.authService.points[this.authService.points.length - 1].wspolrzednaX, this.authService.points[this.authService.points.length - 1].wspolrzednaY);
      const waypoint: google.maps.DirectionsWaypoint[] = [];

      for (let i = 1; i < this.authService.points.length - 1; i++) {
        waypoint.push({
          location: new google.maps.LatLng(this.authService.points[i].wspolrzednaX, this.authService.points[i].wspolrzednaY),
          stopover: true,
        });
      }

      const request = {
        origin: start,
        waypoints: waypoint,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
      };

      this.directionsService.route(request, (response: any, status: any) => {
        if (status === 'OK') {
          this.directionsRenderer.setDirections(response);
          const legs = response.routes[0].legs;
          this.authService.legDurations = legs.map((leg: any) => {
            const legDurationSeconds = leg.duration.value;
            
            // Konwertuj sekundy na format hh:mm:ss
            const hours = Math.floor(legDurationSeconds / 3600);
            const minutes = Math.floor((legDurationSeconds % 3600) / 60);
            const seconds = legDurationSeconds % 60;
    
            return `${hours} godz. ${minutes} min. ${seconds} sek.`;
          });
          this.authService.routeLength = legs.reduce((total:number, leg:any) => total + leg.distance.value, 0) / 1000; // Convert to kilometers
        } else {
          console.error('Error calculating route:', status);
          //this.points.splice(this.points.length-1, 1);
          this.markers.splice(this.points.length-1, 1);
          this.authService.points.splice(this.points.length-1, 1);
          this.drawRoute();
        }
      });
  }
  }

  onMapClick(event: any) {
    this.authService.convertCoordinatesToAddress(event.latLng.lat(), event.latLng.lng())
      .then((newPoint: Atrakcja) => {
        // Add the new point to the map service
        this.authService.points.push(newPoint);
  
        // Redraw the route
        this.drawRoute();
      })
      .catch((error: any) => {
        console.error('Error converting coordinates to address:', error);
      });
  }
  
  

  onMarkerClick(index: number) {
    // Usuń znacznik z mapy
    if (this.markers[index]) {
      this.markers[index].setMap(null);
    }

    // Usuń punkt z listy
    this.points.splice(index, 1);

    // Usuń znacznik z listy znaczników
    this.markers.splice(index, 1);

    // Przerysuj trasę
    this.drawRoute();
  }

  
  

}
