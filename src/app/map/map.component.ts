import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { MapService } from '../services/map.service';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { Point } from '../interfaces/point';


declare var google: any;


@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  imports: [GoogleMapsModule,CommonModule]
})
export class MapComponent implements AfterViewInit, OnDestroy {
  private markerClickSubscription: Subscription = new Subscription();
  constructor(private mapService: MapService) {}
  @ViewChild('mapElement', { static: false }) mapElement!: ElementRef;

  map!: google.maps.Map;
  directionsService!: google.maps.DirectionsService;
  directionsRenderer!: google.maps.DirectionsRenderer;
  points: Point[] = [];
  selectedMarkerIndex: number | null = null; // Keep track of the selected marker index
  markers: google.maps.Marker[] = [];

  ngAfterViewInit() {
    this.initMap();

    this.markerClickSubscription = this.mapService.markerClickSubject.subscribe((index: number) => {
      this.onMarkerClick(index);
    });
    this.mapService.mapComponentDrawRouteSubject.subscribe(() => {
      this.directionsRenderer.setMap(null);
      this.points = [];
  });
  }
  ngOnDestroy() {
    // Zakończ subskrypcję w momencie zniszczenia komponentu
    this.markerClickSubscription.unsubscribe();
    // Wyczyszczenie listy punktów przy zniszczeniu komponentu
    this.mapService.points = [];
    
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

    const start = new google.maps.LatLng(this.points[0].latitude, this.points[0].longitude);
    const end = new google.maps.LatLng(this.points[this.points.length - 1].latitude, this.points[this.points.length - 1].longitude);
    const waypoint: google.maps.DirectionsWaypoint[] = [];

    for (let i = 1; i < this.points.length - 1; i++) {
      waypoint.push({
        location: new google.maps.LatLng(this.points[i].latitude, this.points[i].longitude),
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
      } else {
        console.error('Error calculating route:', status);
        this.points.splice(this.points.length-1, 1);
        //this.markers.splice(this.points.length-1, 1);
        this.mapService.points.splice(this.points.length, 1);
        this.drawRoute();
      }
    });
  }

  onMapClick(event: any) {

    this.points.push({
      latitude: event.latLng.lat(),
      longitude: event.latLng.lng(),
    });
    this.mapService.points.push({
      latitude: event.latLng.lat(),
      longitude: event.latLng.lng(),
    });
    this.drawRoute();
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
