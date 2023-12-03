import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';

declare var google: any;

export type Point = {
  latitude: number,
  longitude: number
};

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  imports: [GoogleMapsModule,CommonModule]
})
export class MapComponent implements AfterViewInit {
  @ViewChild('mapElement', { static: false }) mapElement!: ElementRef;

  map!: google.maps.Map;
  directionsService!: google.maps.DirectionsService;
  directionsRenderer!: google.maps.DirectionsRenderer;
  points: Point[] = [];
  selectedMarkerIndex: number | null = null; // Keep track of the selected marker index
  markers: google.maps.Marker[] = [];

  ngAfterViewInit() {
    this.initMap();
  }

  initMap() {
    const mapProperties = {
      center: new google.maps.LatLng(51.5074, 0.1278),
      zoom: 10,
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
    this.directionsRenderer = new google.maps.DirectionsRenderer();
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
      }
    });
  }

  onMapClick(event: any) {
    this.points.push({
      latitude: event.latLng.lat(),
      longitude: event.latLng.lng(),
    });
    this.selectedMarkerIndex = null; // Reset the selected marker index
    this.drawRoute();
  }

  onMarkerClick(index: number) {
    this.selectedMarkerIndex = index;
    if (this.selectedMarkerIndex !== null) {
      this.points.splice(this.selectedMarkerIndex, 1);
      this.selectedMarkerIndex = null; // Reset the selected marker index
      this.drawRoute();
    }
  }

}
