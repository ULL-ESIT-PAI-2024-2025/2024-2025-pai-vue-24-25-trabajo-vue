import { Hand } from './Hand';
import { Card } from './Card';
import { PlayerAction } from '../types/enums';

export class Player {
  private _id: string;
  private _name: string;
  private _hand: Hand;
  private _chips: number;
  private _bet: number;
  private _isActive: boolean;
  private _isDealer: boolean;
  private _isBigBlind: boolean;
  private _isSmallBlind: boolean;
  private _lastAction?: PlayerAction;

  constructor(id: string, name: string, chips: number = 1000) {
    this._id = id;
    this._name = name;
    this._hand = new Hand();
    this._chips = chips;
    this._bet = 0;
    this._isActive = true;
    this._isDealer = false;
    this._isBigBlind = false;
    this._isSmallBlind = false;
  }

  // Getters y setters
  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get hand(): Hand {
    return this._hand;
  }

  get chips(): number {
    return this._chips;
  }

  get bet(): number {
    return this._bet;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  get isDealer(): boolean {
    return this._isDealer;
  }

  set isDealer(value: boolean) {
    this._isDealer = value;
  }

  get isBigBlind(): boolean {
    return this._isBigBlind;
  }

  set isBigBlind(value: boolean) {
    this._isBigBlind = value;
  }

  get isSmallBlind(): boolean {
    return this._isSmallBlind;
  }

  set isSmallBlind(value: boolean) {
    this._isSmallBlind = value;
  }

  get lastAction(): PlayerAction | undefined {
    return this._lastAction;
  }

  /**
   * Añade cartas a la mano del jugador
   */
  receiveCards(cards: Card[]): void {
    this._hand.addCards(cards);
  }

  /**
   * Descarta las cartas del jugador
   */
  discardHand(): void {
    this._hand.clear();
  }

  /**
   * El jugador realiza una apuesta
   */
  placeBet(amount: number): number {
    const betAmount = Math.min(amount, this._chips);
    this._bet += betAmount;
    this._chips -= betAmount;
    return betAmount;
  }

  /**
   * El jugador recibe chips (ganancias)
   */
  receiveChips(amount: number): void {
    this._chips += amount;
  }

  /**
   * El jugador se retira de la ronda actual
   */
  fold(): void {
    this._isActive = false;
    this._lastAction = PlayerAction.FOLD;
  }

  /**
   * El jugador pasa (no apuesta)
   */
  check(): void {
    this._lastAction = PlayerAction.CHECK;
  }

  /**
   * El jugador iguala la apuesta actual
   */
  call(amount: number): number {
    const callAmount = Math.min(amount - this._bet, this._chips);
    this.placeBet(callAmount);
    this._lastAction = PlayerAction.CALL;
    return callAmount;
  }

  /**
   * El jugador sube la apuesta
   */
  raise(totalBet: number): number {
    const raiseAmount = Math.min(totalBet - this._bet, this._chips);
    this.placeBet(raiseAmount);
    this._lastAction = PlayerAction.RAISE;
    return raiseAmount;
  }

  /**
   * El jugador apuesta todo
   */
  allIn(): number {
    const allInAmount = this._chips;
    this.placeBet(allInAmount);
    this._lastAction = PlayerAction.ALL_IN;
    return allInAmount;
  }

  /**
   * Prepara al jugador para una nueva ronda
   */
  resetForNewRound(): void {
    this._isActive = true;
    this._bet = 0;
    this._lastAction = undefined;
    this._isDealer = false;
    this._isBigBlind = false;
    this._isSmallBlind = false;
    this.discardHand();
  }

  /**
   * Comprueba si el jugador está all-in
   */
  get isAllIn(): boolean {
    return this._chips === 0 && this._isActive;
  }

  /**
   * Comprueba si el jugador está eliminado (sin fichas)
   */
  get isBankrupt(): boolean {
    return this._chips === 0;
  }

  /**
   * Crea una copia del jugador
   */
  clone(): Player {
    const player = new Player(this._id, this._name, this._chips);
    player._hand = this._hand.clone();
    player._bet = this._bet;
    player._isActive = this._isActive;
    player._isDealer = this._isDealer;
    player._isBigBlind = this._isBigBlind;
    player._isSmallBlind = this._isSmallBlind;
    player._lastAction = this._lastAction;
    return player;
  }
}