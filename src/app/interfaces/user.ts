import { Trasa } from './trasa';

export class User {
  private _idUzytkownik: number;
  private _nazwa: string;
  private _haslo: string;
  private _email: string;
  private _ulubioneTrasy: Trasa[];

  constructor(
    idUzytkownik: number,
    nazwa: string,
    haslo: string,
    email: string,
    ulubioneTrasy: Trasa[]
  ) {
    this._idUzytkownik = idUzytkownik;
    this._nazwa = nazwa;
    this._haslo = haslo;
    this._email = email;
    this._ulubioneTrasy = ulubioneTrasy;
  }

  // Accessor methods for each property
  get id(): number {
    return this._idUzytkownik;
  }

  set id(value: number) {
    this._idUzytkownik = value;
  }

  get nazwa(): string {
    return this._nazwa;
  }

  set nazwa(value: string) {
    this._nazwa = value;
  }

  get haslo(): string {
    return this._haslo;
  }

  set haslo(value: string) {
    this._haslo = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get ulubioneTrasy(): Trasa[] {
    return this._ulubioneTrasy;
  }

  set ulubioneTrasy(value: Trasa[]) {
    this._ulubioneTrasy = value;
  }
}
