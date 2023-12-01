import { Trasa } from './trasa';


export class User {
    constructor(
    private id : string,
    private username: string,
    private email: string,
    private password: string,
    private firstName: string,
    private lastName: string,
    private token: string,
    private ulubioneTrasy: Trasa[],
    ){}

    set IdUzytkownik(idUzytkownik: string) {
        this.id = idUzytkownik;
      }
    get IdUzytkownik(): string {
    return this.id;
    }
    
    set Nazwa(nazwa: string) {
        this.username = nazwa;
    }
    get Nazwa(): string {
        return this.username;
    }

    set Haslo(haslo: string) {
    this.password = haslo;
    }
    get Haslo(): string {
    return this.password;
    }

    set Email(email: string) {
        this.email = email;
    }
    get Email(): string {
        return this.email;
    }

    set FirstName(firstName: string) {
        this.firstName = firstName;
    }
    get FirstName(): string {
        return this.firstName;
    }
    set LastName(lastName: string) {
        this.lastName = lastName;
    }
    get LastName(): string {
        return this.lastName;
    }
    set Token(token: string) {
        this.token = token;
    }
    get Token(): string {
        return this.token;
    }
    set UlubioneTrasy(ulubioneTrasy: Trasa[]) {
        this.ulubioneTrasy = ulubioneTrasy;
    }
    get UlubioneTrasy(): Trasa[] {
        return this.ulubioneTrasy;
    }
    
}


