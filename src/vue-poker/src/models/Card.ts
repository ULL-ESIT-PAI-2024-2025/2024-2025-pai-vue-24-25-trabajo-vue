import { Suit, CardValue, SuitSymbol, CardValueSymbol } from '../types/enums';

export class Card {
  private readonly _suit: Suit;
  private readonly _value: CardValue;
  private _faceUp: boolean;

  constructor(suit: Suit, value: CardValue, faceUp = false) {
    this._suit = suit;
    this._value = value;
    this._faceUp = faceUp;
  }

  // Getters
  get suit(): Suit {
    return this._suit;
  }

  get value(): CardValue {
    return this._value;
  }

  get isFaceUp(): boolean {
    return this._faceUp;
  }

  // Métodos
  flip(): void {
    this._faceUp = !this._faceUp;
  }

  turnFaceUp(): void {
    this._faceUp = true;
  }

  turnFaceDown(): void {
    this._faceUp = false;
  }

  /**
   * Obtiene la representación del palo como símbolo
   */
  getSuitSymbol(): string {
    return SuitSymbol[this._suit];
  }

  /**
   * Obtiene la representación del valor como símbolo
   */
  getValueSymbol(): string {
    return CardValueSymbol[this._value];
  }

  /**
   * Obtiene el color asociado al palo (rojo o negro)
   */
  getColor(): string {
    return this._suit === Suit.HEARTS || this._suit === Suit.DIAMONDS ? 'red' : 'black';
  }

  /**
   * Devuelve una representación legible de la carta
   */
  toString(): string {
    return `${this.getValueSymbol()}${this.getSuitSymbol()}`;
  }

  /**
   * Devuelve un identificador único para la carta
   */
  getId(): string {
    return `${this._value}_${this._suit}`;
  }

  /**
   * Compara dos cartas por su valor
   */
  compareTo(other: Card): number {
    return this._value - other._value;
  }

  /**
   * Crea una copia de la carta
   */
  clone(): Card {
    return new Card(this._suit, this._value, this._faceUp);
  }
}