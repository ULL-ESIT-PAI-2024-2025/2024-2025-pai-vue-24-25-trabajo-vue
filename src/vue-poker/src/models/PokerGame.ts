import { Player } from './Player';
import { Deck } from './Deck';
import { Card } from './Card';
import { Hand } from './Hand';
import { GameState, PlayerAction, HandRank } from '../types/enums';
import { HandEvaluator } from '../utils/handEvaluator';

interface GameConfig {
  smallBlind: number;
  bigBlind: number;
  minPlayers: number;
  maxPlayers: number;
  startingChips: number;
}

export class PokerGame {
  private _players: Player[];
  private _activePlayers: Player[];
  private _deck: Deck;
  private _communityCards: Card[];
  private _pots: Array<{ amount: number, eligiblePlayers: Player[] }>;
  private _currentPot: number;
  private _currentBet: number;
  private _currentPlayerIndex: number;
  private _dealerIndex: number;
  private _gameState: GameState;
  private _config: GameConfig;
  private _winners: Array<{ player: Player, hand: Hand, potIndex: number, amount: number }>;

  constructor(config: Partial<GameConfig> = {}) {
    this._config = {
      smallBlind: config.smallBlind || 5,
      bigBlind: config.bigBlind || 10,
      minPlayers: config.minPlayers || 2,
      maxPlayers: config.maxPlayers || 10,
      startingChips: config.startingChips || 1000
    };

    this._players = [];
    this._activePlayers = [];
    this._deck = new Deck();
    this._communityCards = [];
    this._pots = [{ amount: 0, eligiblePlayers: [] }];
    this._currentPot = 0;
    this._currentBet = 0;
    this._currentPlayerIndex = 0;
    this._dealerIndex = 0;
    this._gameState = GameState.NOT_STARTED;
    this._winners = [];
  }

  // Getters
  get players(): Player[] {
    return [...this._players];
  }

  get activePlayers(): Player[] {
    return [...this._activePlayers];
  }

  get communityCards(): Card[] {
    return [...this._communityCards];
  }

  get pots(): Array<{ amount: number, eligiblePlayers: Player[] }> {
    return [...this._pots];
  }

  get currentPot(): number {
    return this._currentPot;
  }

  get currentBet(): number {
    return this._currentBet;
  }

  get gameState(): GameState {
    return this._gameState;
  }

  get currentPlayer(): Player | null {
    if (this._activePlayers.length === 0) return null;
    return this._activePlayers[this._currentPlayerIndex];
  }

  get dealer(): Player | null {
    if (this._players.length === 0) return null;
    return this._players[this._dealerIndex];
  }

  get winners(): Array<{ player: Player, hand: Hand, potIndex: number, amount: number }> {
    return [...this._winners];
  }

  get smallBlind(): number {
    return this._config.smallBlind;
  }

  get bigBlind(): number {
    return this._config.bigBlind;
  }

  /**
   * Añade un jugador al juego
   */
  addPlayer(name: string, chips = this._config.startingChips): Player {
    if (this._players.length >= this._config.maxPlayers) {
      throw new Error(`No se pueden añadir más de ${this._config.maxPlayers} jugadores`);
    }

    const id = `player_${Date.now()}_${this._players.length}`;
    const player = new Player(id, name, chips);
    this._players.push(player);

    return player;
  }

  /**
   * Elimina un jugador del juego
   */
  removePlayer(playerId: string): void {
    const index = this._players.findIndex(p => p.id === playerId);
    if (index !== -1) {
      this._players.splice(index, 1);
      // Ajustar el dealer index si es necesario
      if (this._dealerIndex >= this._players.length) {
        this._dealerIndex = this._players.length > 0 ? this._players.length - 1 : 0;
      }
    }
  }

  /**
   * Inicia una nueva ronda de poker
   */
  startNewRound(): boolean {
    // Verificar que hay suficientes jugadores
    if (this._players.length < this._config.minPlayers) {
      return false;
    }

    // Resetear el estado del juego
    this._activePlayers = this._players.filter(p => !p.isBankrupt);
    this._deck = new Deck();
    this._deck.shuffle();
    this._communityCards = [];
    this._pots = [{ amount: 0, eligiblePlayers: [...this._activePlayers] }];
    this._currentPot = 0;
    this._currentBet = 0;
    this._winners = [];

    // Reiniciar a todos los jugadores para la nueva ronda
    this._players.forEach(p => p.resetForNewRound());

    // Mover el dealer button
    this.moveDealer();

    // Asignar roles y cobrar blinds
    this.assignRoles();
    this.collectBlinds();

    // Repartir las cartas iniciales
    this.dealPlayerCards();

    // Establecer el jugador actual (el que está después del big blind)
    this._currentPlayerIndex = this.getNextActivePlayerIndex(this.getBigBlindIndex());

    // Cambiar el estado del juego
    this._gameState = GameState.PREFLOP;

    return true;
  }

  /**
   * Mueve el dealer button al siguiente jugador no eliminado
   */
  private moveDealer(): void {
    if (this._players.length === 0) return;

    let newDealerIndex = (this._dealerIndex + 1) % this._players.length;

    // Buscar el siguiente jugador no eliminado
    while (this._players[newDealerIndex].isBankrupt) {
      newDealerIndex = (newDealerIndex + 1) % this._players.length;
      // Si hemos dado la vuelta completa y no encontramos ningún jugador no eliminado
      if (newDealerIndex === this._dealerIndex) break;
    }

    this._dealerIndex = newDealerIndex;
    this._players[this._dealerIndex].isDealer = true;
  }

  /**
   * Asigna los roles de small blind y big blind
   */
  private assignRoles(): void {
    const activePlayers = this._players.filter(p => !p.isBankrupt);
    if (activePlayers.length < 2) return;

    // Small blind es el jugador después del dealer
    const smallBlindIndex = this.getNextActivePlayerIndex(this._dealerIndex);
    this._players[smallBlindIndex].isSmallBlind = true;

    // Big blind es el jugador después del small blind
    const bigBlindIndex = this.getNextActivePlayerIndex(smallBlindIndex);
    this._players[bigBlindIndex].isBigBlind = true;
  }

  /**
   * Cobra las ciegas (blinds) a los jugadores correspondientes
   */
  private collectBlinds(): void {
    // Encontrar el small blind y big blind
    const smallBlindPlayer = this._players.find(p => p.isSmallBlind);
    const bigBlindPlayer = this._players.find(p => p.isBigBlind);

    if (smallBlindPlayer && bigBlindPlayer) {
      // Cobrar small blind
      const smallBlindAmount = smallBlindPlayer.placeBet(this._config.smallBlind);
      this._pots[0].amount += smallBlindAmount;
      this._currentBet = smallBlindAmount;

      // Cobrar big blind
      const bigBlindAmount = bigBlindPlayer.placeBet(this._config.bigBlind);
      this._pots[0].amount += bigBlindAmount;
      this._currentBet = bigBlindAmount;
    }
  }

  /**
   * Obtiene el índice del jugador small blind
   */
  private getSmallBlindIndex(): number {
    return this._players.findIndex(p => p.isSmallBlind);
  }

  /**
   * Obtiene el índice del jugador big blind
   */
  private getBigBlindIndex(): number {
    return this._players.findIndex(p => p.isBigBlind);
  }

  /**
   * Reparte las cartas iniciales a los jugadores
   */
  private dealPlayerCards(): void {
    this._activePlayers.forEach(player => {
      const cards = this._deck.dealCards(2);
      player.receiveCards(cards);
    });
  }

  /**
   * Obtiene el índice del siguiente jugador activo
   */
  private getNextActivePlayerIndex(currentIndex: number): number {
    if (this._players.length === 0) return 0;

    let nextIndex = (currentIndex + 1) % this._players.length;

    // Buscar el siguiente jugador activo y no eliminado
    while (nextIndex !== currentIndex) {
      if (!this._players[nextIndex].isBankrupt) {
        return nextIndex;
      }
      nextIndex = (nextIndex + 1) % this._players.length;
    }

    return currentIndex;
  }

  /**
   * Avanza al siguiente jugador activo
   */
  private moveToNextPlayer(): void {
    if (this._activePlayers.length <= 1) return;

    let nextIndex = (this._currentPlayerIndex + 1) % this._activePlayers.length;
    this._currentPlayerIndex = nextIndex;
  }

  /**
   * Procesa la acción de un jugador
   */
  playerAction(action: PlayerAction, betAmount = 0): boolean {
    const player = this.currentPlayer;
    if (!player) return false;

    switch (action) {
      case PlayerAction.FOLD:
        player.fold();
        this._activePlayers = this._activePlayers.filter(p => p.isActive);
        break;

      case PlayerAction.CHECK:
        // Solo se puede hacer check si no hay apuesta o si ya se ha igualado
        if (this._currentBet > player.bet) {
          return false;
        }
        player.check();
        break;

      case PlayerAction.CALL:
        // Calcular la cantidad a igualar
        const callAmount = this._currentBet - player.bet;
        if (callAmount <= 0) {
          return false;
        }

        // El jugador iguala la apuesta
        const actualCallAmount = player.call(callAmount);
        this._pots[this._currentPot].amount += actualCallAmount;
        break;

      case PlayerAction.RAISE:
        // Verificar que la subida es válida
        if (betAmount <= this._currentBet) {
          return false;
        }

        // El jugador sube la apuesta
        const raiseAmount = player.raise(betAmount);
        this._pots[this._currentPot].amount += raiseAmount;
        this._currentBet = player.bet;
        break;

      case PlayerAction.ALL_IN:
        // El jugador apuesta todo
        const allInAmount = player.allIn();
        this._pots[this._currentPot].amount += allInAmount;

        // Si la apuesta all-in es mayor que la apuesta actual, actualizar la apuesta actual
        if (player.bet > this._currentBet) {
          this._currentBet = player.bet;
        }

        // Crear side pots si es necesario
        this.createSidePots();
        break;

      default:
        return false;
    }

    // Si solo queda un jugador activo, terminar la ronda
    if (this._activePlayers.length === 1) {
      this.endRound();
      return true;
    }

    // Verificar si la ronda de apuestas ha terminado
    if (this.isRoundComplete()) {
      this.moveToNextStreet();
      return true;
    }

    // Pasar al siguiente jugador
    this.moveToNextPlayer();
    return true;
  }

  /**
   * Verifica si la ronda de apuestas actual ha terminado
   */
  private isRoundComplete(): boolean {
    // Si hay menos de 2 jugadores activos, la ronda ha terminado
    if (this._activePlayers.length < 2) {
      return true;
    }

    // La ronda termina cuando todos los jugadores activos han igualado la apuesta máxima
    // o están all-in
    return this._activePlayers.every(player =>
      player.bet === this._currentBet || player.isAllIn
    );
  }

  /**
   * Crea side pots cuando un jugador va all-in
   */
  private createSidePots(): void {
    // Ordenar jugadores por la cantidad apostada (de menor a mayor)
    const sortedPlayers = [...this._activePlayers].sort((a, b) => a.bet - b.bet);

    let previousBet = 0;

    for (let i = 0; i < sortedPlayers.length; i++) {
      const player = sortedPlayers[i];

      // Si el jugador va all-in y su apuesta es diferente a la anterior
      if (player.isAllIn && player.bet > previousBet) {
        // Calcular la contribución de cada jugador a este pot
        const contribution = player.bet - previousBet;

        // Crear un nuevo pot con los jugadores elegibles
        const eligiblePlayers = sortedPlayers.slice(i);
        const pot = {
          amount: contribution * eligiblePlayers.length,
          eligiblePlayers
        };

        // Añadir el nuevo pot
        this._pots.push(pot);

        previousBet = player.bet;
      }
    }
  }

  /**
   * Avanza a la siguiente fase del juego
   */
  private moveToNextStreet(): void {
    switch (this._gameState) {
      case GameState.PREFLOP:
        // Pasar al flop (mostrar 3 cartas comunitarias)
        this._gameState = GameState.FLOP;
        this.dealCommunityCards(3);
        break;

      case GameState.FLOP:
        // Pasar al turn (mostrar 4ª carta comunitaria)
        this._gameState = GameState.TURN;
        this.dealCommunityCards(1);
        break;

      case GameState.TURN:
        // Pasar al river (mostrar 5ª carta comunitaria)
        this._gameState = GameState.RIVER;
        this.dealCommunityCards(1);
        break;

      case GameState.RIVER:
        // Pasar al showdown (mostrar cartas y determinar ganador)
        this._gameState = GameState.SHOWDOWN;
        this.determineWinners();
        break;

      case GameState.SHOWDOWN:
        // Fin del juego
        this._gameState = GameState.GAME_OVER;
        break;
    }

    // Resetear la apuesta actual para la nueva ronda de apuestas
    this._currentBet = 0;
    this._activePlayers.forEach(p => p.check());

    // El primer jugador en hablar es el que está después del dealer
    if (this._activePlayers.length > 1) {
      this._currentPlayerIndex = 0; // Simplificado para este ejemplo
    }
  }

  /**
   * Reparte cartas comunitarias
   */
  private dealCommunityCards(count: number): void {
    const cards = this._deck.dealCards(count, true);
    this._communityCards.push(...cards);
  }

  /**
   * Termina la ronda actual
   */
  private endRound(): void {
    // Si solo queda un jugador, ese jugador gana todos los pots
    if (this._activePlayers.length === 1) {
      const winner = this._activePlayers[0];

      // Sumar todos los pots
      const totalAmount = this._pots.reduce((sum, pot) => sum + pot.amount, 0);

      // El ganador recibe el total
      winner.receiveChips(totalAmount);

      // Registrar al ganador
      this._winners.push({
        player: winner,
        hand: winner.hand,
        potIndex: 0,
        amount: totalAmount
      });

      this._gameState = GameState.GAME_OVER;
    } else {
      // Si llegamos aquí por otra razón (por ejemplo, todos los jugadores han hecho check en el river)
      // pasar al showdown
      this._gameState = GameState.SHOWDOWN;
      this.determineWinners();
    }
  }

  /**
   * Determina los ganadores de la ronda
   */
  private determineWinners(): void {
    // Evaluamos las manos de todos los jugadores activos
    this._activePlayers.forEach(player => {
      HandEvaluator.evaluate(player.hand, this._communityCards);
    });

    // Procesar cada pot por separado
    this._pots.forEach((pot, potIndex) => {
      // Filtrar solo los jugadores elegibles para este pot
      const eligiblePlayers = pot.eligiblePlayers.filter(p => p.isActive);

      if (eligiblePlayers.length === 0) return;
      if (eligiblePlayers.length === 1) {
        // Si solo hay un jugador elegible, gana todo el pot
        const winner = eligiblePlayers[0];
        winner.receiveChips(pot.amount);

        this._winners.push({
          player: winner,
          hand: winner.hand,
          potIndex,
          amount: pot.amount
        });

        return;
      }

      // Encontrar la mejor mano entre los jugadores elegibles
      let bestHandPlayers = [eligiblePlayers[0]];
      let bestHand = eligiblePlayers[0].hand;

      for (let i = 1; i < eligiblePlayers.length; i++) {
        const player = eligiblePlayers[i];
        const comparison = player.hand.compareTo(bestHand);

        if (comparison > 0) {
          // Esta mano es mejor que la mejor actual
          bestHandPlayers = [player];
          bestHand = player.hand;
        } else if (comparison === 0) {
          // Esta mano es igual a la mejor actual (empate)
          bestHandPlayers.push(player);
        }
      }

      // Dividir el pot entre los ganadores
      const winAmount = Math.floor(pot.amount / bestHandPlayers.length);
      const remainder = pot.amount % bestHandPlayers.length;

      bestHandPlayers.forEach(winner => {
        winner.receiveChips(winAmount);

        this._winners.push({
          player: winner,
          hand: winner.hand,
          potIndex,
          amount: winAmount
        });
      });

      // Si hay un residuo, dárselo al primer ganador
      if (remainder > 0 && bestHandPlayers.length > 0) {
        bestHandPlayers[0].receiveChips(remainder);
      }
    });

    this._gameState = GameState.GAME_OVER;
  }

  /**
   * Obtiene una descripción textual de la mano de un jugador
   */
  getHandDescription(player: Player): string {
    if (!player.hand.rank) {
      HandEvaluator.evaluate(player.hand, this._communityCards);
    }

    switch (player.hand.rank) {
      case HandRank.ROYAL_FLUSH:
        return "Escalera real";
      case HandRank.STRAIGHT_FLUSH:
        return "Escalera de color";
      case HandRank.FOUR_OF_A_KIND:
        return "Póker";
      case HandRank.FULL_HOUSE:
        return "Full house";
      case HandRank.FLUSH:
        return "Color";
      case HandRank.STRAIGHT:
        return "Escalera";
      case HandRank.THREE_OF_A_KIND:
        return "Trío";
      case HandRank.TWO_PAIR:
        return "Doble pareja";
      case HandRank.ONE_PAIR:
        return "Pareja";
      default:
        return "Carta alta";
    }
  }
}