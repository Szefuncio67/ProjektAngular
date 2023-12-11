// user.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { Trasa } from '../interfaces/trasa';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user = this.userSubject.asObservable();
  private trasySubject = new BehaviorSubject<Trasa[] | null>(null);
  trasa: Trasa[] = [];

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

}
