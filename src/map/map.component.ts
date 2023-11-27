import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

declare var google: any;

export type Point= {
    latitude:number,
    longitude:number
}
@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  imports: [GoogleMapsModule]
})
export class MapComponent implements AfterViewInit {
    @ViewChild('mapElement', { static: false }) mapElement!: ElementRef;

    map!: google.maps.Map;
    directionsService!: google.maps.DirectionsService;
        directionsRenderer!: google.maps.DirectionsRenderer;
        points:Point[] = [];
        mapa:any;

    ngAfterViewInit() {
        this.initMap();
    }

    initMap() {
        const mapProperties = {
        center: new google.maps.LatLng(51.5074, 0.1278),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
    }

    drawRoute() {
        this.directionsService = new google.maps.DirectionsService();
        this.directionsRenderer = new google.maps.DirectionsRenderer();
        this.directionsRenderer.setMap(this.map);


            const start = new google.maps.LatLng(this.points[0].latitude, this.points[0].longitude); // Punkt startowy
            const end = new google.maps.LatLng(this.points[this.points.length-1].latitude, this.points[this.points.length-1].longitude); // Punkt końcowy
            const waypoint: google.maps.DirectionsWaypoint[] = [];
            for(let i=1; i < this.points.length - 1; i++)
            {
                waypoint.push({
                    location: new google.maps.LatLng(this.points[i].latitude, this.points[i].longitude),
                    stopover: true,
            });
            }
        const request = {
        origin: start,
        waypoints:waypoint,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING // Tryb podróży - można zmienić na IN_TRANSIT, BICYCLING, WALKING, TRANSIT
        };

        this.directionsService.route(request, (response: any, status: any) => {
        if (status === 'OK') {
            this.directionsRenderer.setDirections(response);
        } else {
            console.error('Błąd przy wyznaczaniu trasy:', status);
        }
        });
    }
    clickedLat: number = 0;
    clickedLng: number = 0;

    onMapClick(event: any) {
        this.clickedLat = event.latLng.lat();
        this.clickedLng = event.latLng.lng();
        console.log("Coords:", this.clickedLat, this.clickedLng)
        this.points.push({latitude:this.clickedLat, longitude:this.clickedLng});
        if(this.points.length >= 2) this.drawRoute();
        }
}
