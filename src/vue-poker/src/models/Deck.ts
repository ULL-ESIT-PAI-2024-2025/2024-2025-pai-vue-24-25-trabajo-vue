import { Card } from './Card';
import { Suit, CardValue } from '../types/enums';

export class Deck {
  private _cards: Card[];

  constructor() {
    this._cards = [];
    this.initialize();
  }

  /**
   * Crea un mazo estándar de 52 cartas
   */
  private initialize(): void {
    this._cards = [];
    const suits = Object.values(Suit);

    // Crear las 52 cartas (13 cartas por cada uno de los 4 palos)
    for (const suit of suits) {
      for (let value = CardValue.TWO; value <= CardValue.ACE; value++) {
        this._cards.push(new Card(suit, value));
      }
    }
  }

  /**
   * Mezcla las cartas del mazo de forma aleatoria
   */
  shuffle(): void {
    for (let i = this._cards.length - 1; i > 0; i--) {
      // Algoritmo de Fisher-Yates
      const j = Math.floor(Math.random() * (i + 1));
      [this._cards[i], this._cards[j]] = [this._cards[j], this._cards[i]];
    }
  }

  /**
   * Saca una carta del tope del mazo
   */
  dealCard(faceUp = false): Card | undefined {
    const card = this._cards.pop();
    if (card && faceUp) {
      card.turnFaceUp();
    }
    return card;
  }

  /**
   * Reparte un número específico de cartas
   */
  dealCards(count: number, faceUp = false): Card[] {
    const cards: Card[] = [];
    for (let i = 0; i < count; i++) {
      const card = this.dealCard(faceUp);
      if (card) {
        cards.push(card);
      }
    }
    return cards;
  }

  /**
   * Añade cartas al mazo
   */
  addCards(cards: Card[]): void {
    this._cards.push(...cards);
  }

  /**
   * Devuelve todas las cartas al mazo y las mezcla
   */
  reset(): void {
    this.initialize();
    this.shuffle();
  }

  /**
   * Obtiene el número de cartas restantes en el mazo
   */
  get remainingCards(): number {
    return this._cards.length;
  }

  /**
   * Comprueba si el mazo está vacío
   */
  get isEmpty(): boolean {
    return this._cards.length === 0;
  }
}