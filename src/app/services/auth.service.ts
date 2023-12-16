import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { Trasa } from '../interfaces/trasa';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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
  
  // Helper method to fetch user by ID
  private getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${userId}`);
  }

  removeTrasaFromUser(trasaId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/ulubioneTrasy/${trasaId}`);
  }

  saveEdition(userId:number, trasa:Trasa){

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


}
