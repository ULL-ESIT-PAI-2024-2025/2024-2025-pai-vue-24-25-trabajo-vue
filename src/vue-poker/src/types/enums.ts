// Palos de las cartas
export enum Suit {
  SPADES = "SPADES",     // Picas ♠
  HEARTS = "HEARTS",     // Corazones ♥
  CLUBS = "CLUBS",       // Tréboles ♣
  DIAMONDS = "DIAMONDS"  // Diamantes ♦
}

// Valores de las cartas
export enum CardValue {
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
  SIX = 6,
  SEVEN = 7,
  EIGHT = 8,
  NINE = 9,
  TEN = 10,
  JACK = 11,   // J
  QUEEN = 12,  // Q
  KING = 13,   // K
  ACE = 14     // A (valor alto por defecto)
}

// Jerarquía de las manos de póker (de menor a mayor valor)
export enum HandRank {
  HIGH_CARD = 0,         // Carta alta
  ONE_PAIR = 1,          // Una pareja
  TWO_PAIR = 2,          // Dos parejas
  THREE_OF_A_KIND = 3,   // Trío
  STRAIGHT = 4,          // Escalera
  FLUSH = 5,             // Color
  FULL_HOUSE = 6,        // Full house (trío + pareja)
  FOUR_OF_A_KIND = 7,    // Póker (cuatro cartas iguales)
  STRAIGHT_FLUSH = 8,    // Escalera de color
  ROYAL_FLUSH = 9        // Escalera real
}

// Acciones del jugador
export enum PlayerAction {
  FOLD = "FOLD",         // Retirarse
  CHECK = "CHECK",       // Pasar
  CALL = "CALL",         // Igualar apuesta
  RAISE = "RAISE",       // Subir apuesta
  ALL_IN = "ALL_IN"      // Apostar todo
}

// Estado del juego
export enum GameState {
  NOT_STARTED = "NOT_STARTED",
  PREFLOP = "PREFLOP",         // Antes de mostrar las primeras cartas comunitarias
  FLOP = "FLOP",               // Primeras 3 cartas comunitarias
  TURN = "TURN",               // Cuarta carta comunitaria
  RIVER = "RIVER",             // Quinta y última carta comunitaria
  SHOWDOWN = "SHOWDOWN",       // Mostrar cartas y determinar ganador
  GAME_OVER = "GAME_OVER"
}

// Símbolos para representar los palos
export const SuitSymbol = {
  [Suit.SPADES]: "♠",
  [Suit.HEARTS]: "♥",
  [Suit.CLUBS]: "♣",
  [Suit.DIAMONDS]: "♦"
};

// Colores para los palos
export const SuitColor = {
  [Suit.SPADES]: "black",
  [Suit.HEARTS]: "red",
  [Suit.CLUBS]: "black",
  [Suit.DIAMONDS]: "red"
};

// Representaciones de los valores de las cartas
export const CardValueSymbol = {
  [CardValue.TWO]: "2",
  [CardValue.THREE]: "3",
  [CardValue.FOUR]: "4",
  [CardValue.FIVE]: "5",
  [CardValue.SIX]: "6",
  [CardValue.SEVEN]: "7",
  [CardValue.EIGHT]: "8",
  [CardValue.NINE]: "9",
  [CardValue.TEN]: "10",
  [CardValue.JACK]: "J",
  [CardValue.QUEEN]: "Q",
  [CardValue.KING]: "K",
  [CardValue.ACE]: "A"
};