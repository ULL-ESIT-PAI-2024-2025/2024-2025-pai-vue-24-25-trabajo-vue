import { Card } from './Card';
import { HandRank } from '../types/enums';

export class Hand {
  private _cards: Card[];
  private _rank?: HandRank;
  private _rankCards?: Card[];  // Cartas que forman la combinación ganadora
  private _kickers?: Card[];    // Cartas desempatadoras

  constructor(cards: Card[] = []) {
    this._cards = [...cards];
  }

  /**
   * Añade una carta a la mano
   */
  addCard(card: Card): void {
    this._cards.push(card);
    // Invalidar el ranking calculado anteriormente
    this._rank = undefined;
    this._rankCards = undefined;
    this._kickers = undefined;
  }

  /**
   * Añade varias cartas a la mano
   */
  addCards(cards: Card[]): void {
    this._cards.push(...cards);
    // Invalidar el ranking calculado anteriormente
    this._rank = undefined;
    this._rankCards = undefined;
    this._kickers = undefined;
  }

  /**
   * Elimina todas las cartas de la mano
   */
  clear(): void {
    this._cards = [];
    this._rank = undefined;
    this._rankCards = undefined;
    this._kickers = undefined;
  }

  /**
   * Obtiene las cartas de la mano
   */
  get cards(): Card[] {
    return [...this._cards];
  }

  /**
   * Obtiene el número de cartas en la mano
   */
  get size(): number {
    return this._cards.length;
  }

  /**
   * Establece el ranking de la mano (usado por el evaluador)
   */
  setRank(rank: HandRank, rankCards: Card[], kickers: Card[]): void {
    this._rank = rank;
    this._rankCards = rankCards;
    this._kickers = kickers;
  }

  /**
   * Obtiene el ranking de la mano
   */
  get rank(): HandRank | undefined {
    return this._rank;
  }

  /**
   * Obtiene las cartas que forman la combinación ganadora
   */
  get rankCards(): Card[] | undefined {
    return this._rankCards ? [...this._rankCards] : undefined;
  }

  /**
   * Obtiene las cartas desempatadoras
   */
  get kickers(): Card[] | undefined {
    return this._kickers ? [...this._kickers] : undefined;
  }

  /**
   * Compara dos manos para determinar cuál es mejor
   * Retorna un número positivo si esta mano es mejor,
   * un número negativo si la otra mano es mejor,
   * o cero si son iguales
   */
  compareTo(other: Hand): number {
    if (!this._rank || !other._rank) {
      throw new Error("Las manos deben ser evaluadas antes de compararlas");
    }

    // Primero comparamos por el rango de la mano
    if (this._rank !== other._rank) {
      return this._rank - other._rank;
    }

    // Si los rangos son iguales, comparamos las cartas que forman la combinación
    if (this._rankCards && other._rankCards) {
      for (let i = 0; i < this._rankCards.length; i++) {
        const valueComparison = this._rankCards[i].value - other._rankCards[i].value;
        if (valueComparison !== 0) {
          return valueComparison;
        }
      }
    }

    // Si aún hay empate, comparamos los kickers
    if (this._kickers && other._kickers) {
      for (let i = 0; i < this._kickers.length; i++) {
        const valueComparison = this._kickers[i].value - other._kickers[i].value;
        if (valueComparison !== 0) {
          return valueComparison;
        }
      }
    }

    // Si todo es igual, es un empate
    return 0;
  }

  /**
   * Ordena las cartas por valor de mayor a menor
   */
  sortByValue(): void {
    this._cards.sort((a, b) => b.value - a.value);
  }

  /**
   * Devuelve una copia de esta mano
   */
  clone(): Hand {
    const hand = new Hand(this._cards.map(card => card.clone()));
    if (this._rank !== undefined && this._rankCards && this._kickers) {
      hand.setRank(
        this._rank,
        this._rankCards.map(card => card.clone()),
        this._kickers.map(card => card.clone())
      );
    }
    return hand;
  }

  /**
   * Devuelve una representación de texto de la mano
   */
  toString(): string {
    return this._cards.map(card => card.toString()).join(' ');
  }
}