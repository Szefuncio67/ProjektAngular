
export class Atrakcja {
private _idAtrakcja: number;
private _nazwa: string;
private _wspolrzednaX: number;
private _wspolrzednaY: number;

constructor(
    idAtrakcja: number,
    nazwa: string,
    wspolrzednaX: number,
    wspolrzednaY: number
) {
    this._idAtrakcja =idAtrakcja;
    this._nazwa =nazwa;
    this._wspolrzednaX =wspolrzednaX;
    this._wspolrzednaY =wspolrzednaY;
}

    

  set idAtrakcja(value: number) {
      this._idAtrakcja = value;
  }
  get idAtrakcja(): number {
      return this._idAtrakcja;
  }

  set nazwa(value: string) {
      this._nazwa = value;
  }
  get nazwa(): string {
      return this._nazwa;
  }

  set wspolrzednaX(value: number) {
      this._wspolrzednaX = value;
  }
  get wspolrzednaX(): number {
      return this._wspolrzednaX;
  }

  set wspolrzednaY(value: number) {
      this._wspolrzednaY = value;
  }
  get wspolrzednaY(): number {
      return this._wspolrzednaY;
  }
}