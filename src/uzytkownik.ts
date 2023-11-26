import { Trasa } from './trasa';

export class Uzytkownik {
    constructor(private idUzytkownik: number,
        private nazwa: string,
        private haslo: string,
        private email: string,
        private ulubioneTrasy: Trasa[]) {}
  
    set IdUzytkownik(idUzytkownik: number) {
      this.idUzytkownik = idUzytkownik;
    }
    get IdUzytkownik(): number {
      return this.idUzytkownik;
    }
  
    set Nazwa(nazwa: string) {
      this.nazwa = nazwa;
    }
    get Nazwa(): string {
      return this.nazwa;
    }
  
    set Haslo(haslo: string) {
      this.haslo = haslo;
    }
    get Haslo(): string {
      return this.haslo;
    }

    set Email(email: string) {
        this.email = email;
    }
    get Email(): string {
        return this.email;
    }

    set UlubioneTrasy(ulubioneTrasy: Trasa[]) {
        this.ulubioneTrasy = ulubioneTrasy;
    }
    get UlubioneTrasy(): Trasa[] {
        return this.ulubioneTrasy;
    }
  }