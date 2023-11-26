import { Atrakcja } from './atrakcja';

export class Trasa {
    constructor(private idTrasa: number,
        private nazwa: string,
        private opis: string,
        private atrakcje: Atrakcja[]) {}
  
    set IdTrasa(idTrasa: number) {
        this.idTrasa = idTrasa;
    }
    get IdTrasa(): number {
        return this.idTrasa;
    }
  
    set Nazwa(nazwa: string) {
        this.nazwa = nazwa;
    }
    get Nazwa(): string {
        return this.nazwa;
    }

    set Opis(opis: string) {
        this.opis = opis;
    }
    get Opis(): string {
        return this.opis;
    }

    set Atrakcje(atrakcje: Atrakcja[]) {
        this.atrakcje = atrakcje;
    }
    get Atrakcje(): Atrakcja[] {
        return this.atrakcje;
    }
  }