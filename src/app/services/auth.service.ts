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
    return this.http.get<User[]>(`${this.baseUrl}/users?email=${email}`);
  }
  setTrasainUser(userId: number, newFavoriteRoute: Trasa){
    this.getUserById(userId).subscribe(
      (user: User) => {
        // Clone the existing ulubioneTrasy array and add the new route
        const updatedTrasy = [...user.ulubioneTrasy, newFavoriteRoute];
        
        // Update the user with the modified ulubioneTrasy array
        const updatedUser = { ulubioneTrasy: updatedTrasy };
  
        return this.http.patch(`${this.baseUrl}/users/${userId}`, updatedUser).subscribe();
      },
      error => {
        console.log('Error fetching user by ID:', error);
      }
    );
  }
  
  // Helper method to fetch user by ID
  private getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${userId}`);
  }


}
