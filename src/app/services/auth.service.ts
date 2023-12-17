import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Trasa } from '../models/trasa';
import { Atrakcja } from '../models/atrakcja';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject = new BehaviorSubject<User | null>(null);
  user = this.userSubject.asObservable();
  private trasySubject = new BehaviorSubject<Trasa[] | null>(null);
  trasa: Trasa[] = [];

  routeName:string = '';
  routeDescription:string = '';
  routeLength: number = 0;
  points: Atrakcja[] = [];
  markerClickSubject: Subject<number> = new Subject<number>();
  mapComponentDrawRouteSubject: Subject<void> = new Subject<void>();
  legDurations: string[] = [];
  edition: boolean = false;
  idTrasa: number = 0;
  currentEditedRoute: Trasa | null = null;

  private baseUrl = 'http://localhost:3000';


  constructor(private http: HttpClient) { }

  registerUser(userDetails: User) {
    return this.http.post(`${this.baseUrl}/users`, userDetails);
  }

  getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users?email=${email}`)
  }
  getTrasaById(userId: number): Observable<Trasa[]> {
    return this.http.get<Trasa[]>(`${this.baseUrl}/users/${userId}/ulubioneTrasy`);
  }

  setTrasainUser(userId: number, newFavoriteRoute: Trasa) {
    this.getUserById(userId).subscribe(
      (user: User) => {
        const updateAtrakcje = newFavoriteRoute.Atrakcje.map(element => ({
          idAtrakcja: element.idAtrakcja,
          nazwa: element.nazwa,
          wspolrzednaX: element.wspolrzednaX,
          wspolrzednaY: element.wspolrzednaY,
        }));
  
        const updatedTrasy = {
          Nazwa: newFavoriteRoute.Nazwa,
          Opis: newFavoriteRoute.Opis,
          Atrakcje: updateAtrakcje,
        };
  
        this.http.post(`${this.baseUrl}/users/${userId}/ulubioneTrasy`, updatedTrasy)
          .subscribe(
            () => {
              console.log('Favorite route set successfully');
            },
            error => {
              console.error('Error setting favorite route:', error);
            }
          );
      },
      error => {
        console.error('Error fetching user by ID:', error);
      }
    );
  }
  
  private getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${userId}`);
  }

  removeTrasaFromUser(trasaId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/ulubioneTrasy/${trasaId}`);
  }

  saveEditionToBase(userId:number, trasa:Trasa){

    const updateAtrakcje = trasa.Atrakcje.map(element => ({
      idAtrakcja: element.idAtrakcja,
      nazwa: element.nazwa,
      wspolrzednaX: element.wspolrzednaX,
      wspolrzednaY: element.wspolrzednaY,
    }));

    const updatedTrasy = {
      Nazwa: trasa.Nazwa,
      Opis: trasa.Opis,
      Atrakcje: updateAtrakcje,
      user_id: userId,
    };

    return this.http.put(`${this.baseUrl}/ulubioneTrasy/${trasa.id}`,updatedTrasy).subscribe(
      () => {
        console.log('Favorite route set successfully');
      },
      error => {
        console.error('Error setting favorite route:', error);
      }
    );

  }

  setUser(user: User): void {
    this.userSubject.next(user);
  }

  getUser(): Observable<User | null> {
    return this.user;
  }

  setTrasa(trasy: Trasa[]): void {
    this.trasa = trasy;
    this.trasySubject.next(trasy); // Emit the value
  }

  getTrasa(): Observable<Trasa[] | null> {
    return this.trasySubject.asObservable();
  }

  removeTrasa(trasaId: number): void {
    const currentTrasy = this.trasySubject.value || [];
    const updatedTrasy = currentTrasy.filter(trasa => trasa.id !== trasaId);
    this.trasa = updatedTrasy;
    this.trasySubject.next(updatedTrasy);
  }


  onMarkerClick(index: number) {
    this.markerClickSubject.next(index);
  }

  addAllPoints(routeName: string, routeDescription: string) {
    // Skopiuj wszystkie punkty do innej tablicy (możesz użyć .slice() lub innych metod)
    if(!this.edition){
    const allPoints = this.points.slice();
    const trasa = new Trasa(0,routeName,routeDescription, allPoints);
    const email = sessionStorage.getItem('email') ?? '';
    this.getUserByEmail(email).subscribe(
      response=>{
        this.setTrasainUser(response[0].id, trasa);
      }
      //dodać obsługe wyjątku
    );
    }
    // constructor(private idTrasa: number,
    //   private nazwa: string,
    //   private opis: string,
    //   private atrakcje: Atrakcja[]) {}
    
    // Zeruj listę punktów
    this.points = [];
    this.routeName='';
    this.routeDescription='';
    this.idTrasa = 0;
    this.edition = false;
    this.routeLength = 0;
    this.legDurations = [];
    this.drawRoute();

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
            const addressComponents = results[0].address_components;
  
            // Zbuduj adres bez kodu Plus Code
            let formattedAddress = '';
            for (let i = 0; i < addressComponents.length; i++) {
              const component = addressComponents[i];
              if (component.types.includes('street_number') || component.types.includes('route')) {
                formattedAddress += component.long_name + ' ';
              } else if (component.types.includes('locality')) {
                formattedAddress += component.long_name;
              } else if (component.types.includes('postal_code')) {
                // Dodaj kod pocztowy do adresu
                formattedAddress += ' ' + component.long_name;
              } else if (component.types.includes('country')) {
                // Dodaj kraj do adresu
                formattedAddress += ', ' + component.long_name;
              }
              // Dodaj dodatkowe sprawdzenia dla innych składowych, jeśli to konieczne
            }
  
            const nowyPunkt: Atrakcja = new Atrakcja(this.points.length, formattedAddress, latitude, longitude);
  
            resolve(nowyPunkt);
          } else {
            reject('Brak wyników geokodowania');
          }
        } else {
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

  editing(trasa:Trasa){
    this.points = trasa.Atrakcje;
    this.routeName=trasa.Nazwa;
    this.routeDescription=trasa.Opis;
    this.edition = true;
    this.idTrasa = trasa.id;
    this.drawRoute();
  }


// Dodaj metodę do ustawiania aktualnie edytowanej trasy
  setEditedRoute(trasa: Trasa | null) {
    this.currentEditedRoute = trasa;
  }

  saveEdition(routeName: string, routeDescription: string){

      const allPoints = this.points.slice();
      const trasa = new Trasa(this.idTrasa,routeName,routeDescription, allPoints);
      const email = sessionStorage.getItem('email') ?? '';
      this.getUserByEmail(email).subscribe(
        response=>{
      this.saveEditionToBase(response[0].id, trasa);
        }
      );
      this.addAllPoints(routeName, routeDescription);
      
  }
  clear(){
    this.trasySubject.next(null);

  }


}
