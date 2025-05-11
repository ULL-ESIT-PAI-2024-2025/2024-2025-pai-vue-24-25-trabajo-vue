import { Card } from '../models/Card';
import { Hand } from '../models/Hand';
import { HandRank, Suit, CardValue } from '../types/enums';

export class HandEvaluator {
  /**
   * Evalúa una mano de póker y determina su clasificación
   * @param hand Mano a evaluar
   * @param communityCards Cartas comunitarias (para póker Texas Hold'em)
   * @returns La mano evaluada con su rango actualizado
   */
  static evaluate(hand: Hand, communityCards: Card[] = []): Hand {
    // Combinar las cartas de la mano con las cartas comunitarias
    const allCards = [...hand.cards, ...communityCards];

    // Crear una copia de la mano
    const evaluatedHand = hand.clone();

    // Si no hay suficientes cartas para evaluar
    if (allCards.length < 5) {
      evaluatedHand.setRank(HandRank.HIGH_CARD, [], []);
      return evaluatedHand;
    }

    // Ordenar las cartas por valor (de mayor a menor)
    allCards.sort((a, b) => b.value - a.value);

    // Buscar la mejor combinación posible
    const royalFlush = this.findRoyalFlush(allCards);
    if (royalFlush) {
      evaluatedHand.setRank(HandRank.ROYAL_FLUSH, royalFlush, []);
      return evaluatedHand;
    }

    const straightFlush = this.findStraightFlush(allCards);
    if (straightFlush) {
      evaluatedHand.setRank(HandRank.STRAIGHT_FLUSH, straightFlush, []);
      return evaluatedHand;
    }

    const fourOfAKind = this.findFourOfAKind(allCards);
    if (fourOfAKind) {
      const [quads, kickers] = fourOfAKind;
      evaluatedHand.setRank(HandRank.FOUR_OF_A_KIND, quads, kickers);
      return evaluatedHand;
    }

    const fullHouse = this.findFullHouse(allCards);
    if (fullHouse) {
      const [trips, pair] = fullHouse;
      evaluatedHand.setRank(HandRank.FULL_HOUSE, [...trips, ...pair], []);
      return evaluatedHand;
    }

    const flush = this.findFlush(allCards);
    if (flush) {
      evaluatedHand.setRank(HandRank.FLUSH, flush, []);
      return evaluatedHand;
    }

    const straight = this.findStraight(allCards);
    if (straight) {
      evaluatedHand.setRank(HandRank.STRAIGHT, straight, []);
      return evaluatedHand;
    }

    const threeOfAKind = this.findThreeOfAKind(allCards);
    if (threeOfAKind) {
      const [trips, kickers] = threeOfAKind;
      evaluatedHand.setRank(HandRank.THREE_OF_A_KIND, trips, kickers);
      return evaluatedHand;
    }

    const twoPair = this.findTwoPair(allCards);
    if (twoPair) {
      const [pairs, kickers] = twoPair;
      evaluatedHand.setRank(HandRank.TWO_PAIR, pairs, kickers);
      return evaluatedHand;
    }

    const onePair = this.findOnePair(allCards);
    if (onePair) {
      const [pair, kickers] = onePair;
      evaluatedHand.setRank(HandRank.ONE_PAIR, pair, kickers);
      return evaluatedHand;
    }

    // Si no hay ninguna combinación, es carta alta
    const highCards = allCards.slice(0, 5);
    evaluatedHand.setRank(HandRank.HIGH_CARD, [highCards[0]], highCards.slice(1));
    return evaluatedHand;
  }

  /**
   * Encuentra una escalera real (A, K, Q, J, 10 del mismo palo)
   */
  private static findRoyalFlush(cards: Card[]): Card[] | null {
    // Primero buscamos si hay un straight flush
    const straightFlush = this.findStraightFlush(cards);

    // Si hay un straight flush y la carta más alta es un As, es una escalera real
    if (straightFlush && straightFlush[0].value === CardValue.ACE) {
      return straightFlush;
    }

    return null;
  }

  /**
   * Encuentra una escalera de color (cinco cartas consecutivas del mismo palo)
   */
  private static findStraightFlush(cards: Card[]): Card[] | null {
    // Agrupar las cartas por palo
    const suitGroups = this.groupBySuit(cards);

    // Para cada grupo de cartas del mismo palo, buscar una escalera
    for (const suitCards of Object.values(suitGroups)) {
      if (suitCards.length >= 5) {
        const straight = this.findStraight(suitCards);
        if (straight) {
          return straight;
        }
      }
    }

    return null;
  }

  /**
   * Encuentra un póker (cuatro cartas del mismo valor)
   */
  private static findFourOfAKind(cards: Card[]): [Card[], Card[]] | null {
    // Agrupar las cartas por valor
    const valueGroups = this.groupByValue(cards);

    // Buscar un grupo con exactamente 4 cartas
    for (const value in valueGroups) {
      const group = valueGroups[value];
      if (group.length === 4) {
        // Encontramos un póker
        const quads = [...group];
        // Kickers (la carta más alta que no forma parte del póker)
        const kickers = cards
          .filter(card => card.value !== parseInt(value))
          .slice(0, 1);

        return [quads, kickers];
      }
    }

    return null;
  }

  /**
   * Encuentra un full house (trío + pareja)
   */
  private static findFullHouse(cards: Card[]): [Card[], Card[]] | null {
    // Agrupar las cartas por valor
    const valueGroups = this.groupByValue(cards);

    // Buscar un trío
    let trips: Card[] | null = null;
    for (const value in valueGroups) {
      const group = valueGroups[value];
      if (group.length >= 3) {
        trips = group.slice(0, 3);
        break;
      }
    }

    if (!trips) return null;

    // Buscar una pareja que no sea del mismo valor que el trío
    let pair: Card[] | null = null;
    for (const value in valueGroups) {
      const group = valueGroups[value];
      if (parseInt(value) !== trips[0].value && group.length >= 2) {
        pair = group.slice(0, 2);
        break;
      }
    }

    if (!pair) return null;

    return [trips, pair];
  }

  /**
   * Encuentra un color (cinco cartas del mismo palo)
   */
  private static findFlush(cards: Card[]): Card[] | null {
    // Agrupar las cartas por palo
    const suitGroups = this.groupBySuit(cards);

    // Buscar un grupo con al menos 5 cartas
    for (const suit in suitGroups) {
      const group = suitGroups[suit];
      if (group.length >= 5) {
        // Tomar las 5 cartas más altas
        return group.slice(0, 5);
      }
    }

    return null;
  }

  /**
   * Encuentra una escalera (cinco cartas consecutivas)
   */
  private static findStraight(cards: Card[]): Card[] | null {
    if (cards.length < 5) return null;

    // Eliminar duplicados por valor
    const uniqueCards: Card[] = [];
    const seenValues = new Set<number>();

    for (const card of cards) {
      if (!seenValues.has(card.value)) {
        uniqueCards.push(card);
        seenValues.add(card.value);
      }
    }

    // Si hay menos de 5 valores distintos, no puede haber escalera
    if (uniqueCards.length < 5) return null;

    // Caso especial: Escalera A-5-4-3-2 (el As vale como 1)
    if (uniqueCards[0].value === CardValue.ACE) {
      let isStraight = true;
      let straightCards: Card[] = [];
      const values = [CardValue.FIVE, CardValue.FOUR, CardValue.THREE, CardValue.TWO];

      for (let i = 0; i < values.length; i++) {
        const foundCard = uniqueCards.find(card => card.value === values[i]);
        if (!foundCard) {
          isStraight = false;
          break;
        }
        straightCards.push(foundCard);
      }

      if (isStraight) {
        // Añadir el As como carta baja
        straightCards.push(uniqueCards[0]);
        return straightCards;
      }
    }

    // Buscar escalera normal
    for (let i = 0; i <= uniqueCards.length - 5; i++) {
      if (uniqueCards[i].value === uniqueCards[i + 4].value + 4) {
        return uniqueCards.slice(i, i + 5);
      }
    }

    return null;
  }

  /**
   * Encuentra un trío (tres cartas del mismo valor)
   */
  private static findThreeOfAKind(cards: Card[]): [Card[], Card[]] | null {
    // Agrupar las cartas por valor
    const valueGroups = this.groupByValue(cards);

    // Buscar un grupo con exactamente 3 cartas
    for (const value in valueGroups) {
      const group = valueGroups[value];
      if (group.length === 3) {
        // Encontramos un trío
        const trips = [...group];
        // Kickers (las dos cartas más altas que no forman parte del trío)
        const kickers = cards
          .filter(card => card.value !== parseInt(value))
          .slice(0, 2);

        return [trips, kickers];
      }
    }

    return null;
  }

  /**
   * Encuentra dos parejas
   */
  private static findTwoPair(cards: Card[]): [Card[], Card[]] | null {
    // Agrupar las cartas por valor
    const valueGroups = this.groupByValue(cards);

    // Buscar parejas
    const pairs: Card[] = [];

    for (const value in valueGroups) {
      const group = valueGroups[value];
      if (group.length >= 2) {
        pairs.push(...group.slice(0, 2));

        // Si ya tenemos dos parejas
        if (pairs.length === 4) {
          // Kicker (la carta más alta que no forma parte de las parejas)
          const kickers = cards
            .filter(card => !pairs.some(p => p.value === card.value))
            .slice(0, 1);

          return [pairs, kickers];
        }
      }
    }

    return null;
  }

  /**
   * Encuentra una pareja
   */
  private static findOnePair(cards: Card[]): [Card[], Card[]] | null {
    // Agrupar las cartas por valor
    const valueGroups = this.groupByValue(cards);

    // Buscar una pareja
    for (const value in valueGroups) {
      const group = valueGroups[value];
      if (group.length >= 2) {
        const pair = group.slice(0, 2);
        // Kickers (las tres cartas más altas que no forman parte de la pareja)
        const kickers = cards
          .filter(card => card.value !== parseInt(value))
          .slice(0, 3);

        return [pair, kickers];
      }
    }

    return null;
  }

  /**
   * Agrupa las cartas por palo
   */
  private static groupBySuit(cards: Card[]): Record<string, Card[]> {
    const groups: Record<string, Card[]> = {};

    for (const card of cards) {
      const suit = card.suit;
      if (!groups[suit]) {
        groups[suit] = [];
      }
      groups[suit].push(card);
    }

    // Ordenar cada grupo por valor
    for (const suit in groups) {
      groups[suit].sort((a, b) => b.value - a.value);
    }

    return groups;
  }
  /**
   * Agrupa las cartas por valor