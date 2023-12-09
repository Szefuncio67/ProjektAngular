import { Injectable } from '@angular/core';
import { Atrakcja } from '../interfaces/atrakcja';
import { Subject } from 'rxjs';
import { Trasa } from '../interfaces/trasa';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MapService {

  constructor(
    private authService: AuthService,
  ) { }
  points: Atrakcja[] = [];
  markerClickSubject = new Subject<number>();
  mapComponentDrawRouteSubject = new Subject<void>();

  
  // Metoda do powiadamiania o kliknięciu znacznika
  onMarkerClick(index: number) {
    this.markerClickSubject.next(index);
  }

  addAllPoints(nazwa: string, opis: string) {
    // Skopiuj wszystkie punkty do innej tablicy (możesz użyć .slice() lub innych metod)
    const allPoints = this.points.slice();
    const trasa = new Trasa(0,nazwa, opis, allPoints);
    console.log(trasa);
    const email = sessionStorage.getItem('email') ?? '';
    console.log(email);
    let idUser =10;
    this.authService.getUserByEmail(email).subscribe(
      response=>{
        this.authService.setTrasainUser(response[0].id, trasa);
      }
    );
    // constructor(private idTrasa: number,
    //   private nazwa: string,
    //   private opis: string,
    //   private atrakcje: Atrakcja[]) {}
    
    // Zeruj listę punktów
    this.points = [];

    // Dodaj wszystkie punkty do tablicy (np. możesz przekazać je do innego serwisu, komponentu, itp.)
    console.log('All points:', allPoints);
  }

  drawRoute() {
    // Emit an event to notify subscribers (e.g., MapComponent) to redraw the route
    this.mapComponentDrawRouteSubject.next();
  }
  
  convertCoordinatesToAddress(latitude: number, longitude: number): Promise<Atrakcja> {
    const geocoder = new google.maps.Geocoder();
    const wspolrzedne = new google.maps.LatLng(latitude, longitude);
  
    return new Promise((resolve, reject) => {
      geocoder.geocode({ location: wspolrzedne }, (results: any, status: any) => {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results && results.length > 0) {
            const nazwaMiejscowosci = results[0].formatted_address;
  
            const nowyPunkt: Atrakcja = new Atrakcja(this.points.length, nazwaMiejscowosci, latitude, longitude);
  
            resolve(nowyPunkt);
          } else {
            console.log('Brak wyników geokodowania');
            reject('Brak wyników geokodowania');
          }
        } else {
          console.error('Błąd geokodowania:', status);
          reject('Błąd geokodowania');
        }
      });
    });
  }

  convertAddressToCoordinates(address: string): Promise<any> {
    const geocoder = new google.maps.Geocoder();

    return new Promise((resolve, reject) => {
      geocoder.geocode({ address: address }, (results: any, status: any) => {
        if (status === google.maps.GeocoderStatus.OK) {
          const location = results[0].geometry.location;
          resolve({
            latitude: location.lat(),
            longitude: location.lng(),
          });
        } else {
          reject('Nie udało się przekształcić nazwy na współrzędne');
        }
      });
    });
    
  }
  
  

  
}
