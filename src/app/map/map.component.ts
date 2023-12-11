import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { MapService } from '../services/map.service';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { Atrakcja } from '../interfaces/atrakcja';


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
  constructor(private mapService: MapService) {}
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

    this.markerClickSubscription = this.mapService.markerClickSubject.subscribe((index: number) => {
      this.onMarkerClick(index);
    });
    this.mapService.mapComponentDrawRouteSubject.subscribe(() => {
      //this.directionsRenderer.setMap(null);
      this.drawRoute();
  });
  
  }
  ngOnDestroy() {
    // Zakończ subskrypcję w momencie zniszczenia komponentu
    this.markerClickSubscription.unsubscribe();
    // Wyczyszczenie listy punktów przy zniszczeniu komponentu
    this.mapService.points = [];
    this.mapService.routeName = '';
    this.mapService.routeDescription ='';
    this.mapService.edition = false;
    
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
    console.log("został uruchomiony drawRoute")
    if (this.directionsRenderer) {
      this.directionsRenderer.setMap(null);
    }

    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer({
    preserveViewport: true, // Dodaj tę opcję, aby zachować bieżący widok mapy
  });
    this.directionsRenderer.setMap(this.map);
    if(this.mapService.points[0]){
      const start = new google.maps.LatLng(this.mapService.points[0].wspolrzednaX, this.mapService.points[0].wspolrzednaY);
      const end = new google.maps.LatLng(this.mapService.points[this.mapService.points.length - 1].wspolrzednaX, this.mapService.points[this.mapService.points.length - 1].wspolrzednaY);
      const waypoint: google.maps.DirectionsWaypoint[] = [];

      for (let i = 1; i < this.mapService.points.length - 1; i++) {
        waypoint.push({
          location: new google.maps.LatLng(this.mapService.points[i].wspolrzednaX, this.mapService.points[i].wspolrzednaY),
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
          this.mapService.legDurations = legs.map((leg: any) => {
            const legDurationSeconds = leg.duration.value;
            
            // Konwertuj sekundy na format hh:mm:ss
            const hours = Math.floor(legDurationSeconds / 3600);
            const minutes = Math.floor((legDurationSeconds % 3600) / 60);
            const seconds = legDurationSeconds % 60;
    
            return `${hours} godz. ${minutes} min. ${seconds} sek.`;
          });
          this.mapService.routeLength = legs.reduce((total:number, leg:any) => total + leg.distance.value, 0) / 1000; // Convert to kilometers
        } else {
          console.error('Error calculating route:', status);
          console.log(this.mapService.points);
          //this.points.splice(this.points.length-1, 1);
          this.markers.splice(this.points.length-1, 1);
          this.mapService.points.splice(this.points.length-1, 1);
          this.drawRoute();
        }
      });
  }
  }

  onMapClick(event: any) {
    this.mapService.convertCoordinatesToAddress(event.latLng.lat(), event.latLng.lng())
      .then((newPoint: Atrakcja) => {
        // Add the new point to the map service
        this.mapService.points.push(newPoint);
  
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
