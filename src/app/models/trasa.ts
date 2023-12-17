import { Atrakcja } from './atrakcja';

export class Trasa {
    constructor(private idTrasa: number,
        private nazwa: string,
        private opis: string,
        private atrakcje: Atrakcja[]) {}
  
    set id(idTrasa: number) {
        this.idTrasa = idTrasa;
    }
    get id(): number {
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