
export class Atrakcja {
    constructor(private idAtrakcja: number,
        private nazwa: string,
        private wspolrzednaX: number,
        private wspolrzednaY: number) {}
  
    set IdAtrakcja(idAtrakcja: number) {
        this.idAtrakcja = idAtrakcja;
    }
    get IdAtrakcja(): number {
        return this.idAtrakcja;
    }
  
    set Nazwa(nazwa: string) {
        this.nazwa = nazwa;
    }
    get Nazwa(): string {
        return this.nazwa;
    }

    set WspolrzednaX(wspolrzednaX: number) {
        this.wspolrzednaX = wspolrzednaX;
    }
    get WspolrzednaX(): number {
        return this.wspolrzednaX;
    }

    set WspolrzednaY(wspolrzednaY: number) {
        this.wspolrzednaY = wspolrzednaY;
    }
    get WspolrzednaY(): number {
        return this.wspolrzednaY;
    }
  }