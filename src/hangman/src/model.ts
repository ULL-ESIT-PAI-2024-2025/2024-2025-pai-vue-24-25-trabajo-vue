/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * 
 * @author Jose Angel Portillo Garcia
 * @since 05/05/2025
 * @desc Model
 *       The model definition for the Hangman Game
 * 
 * @see {@link https://es.wikipedia.org/wiki/Ahorcado_(juego)}
 */

import { Letter } from './hangman-essentials.ts';
import animalsNames from './data/animals.json';

/**
 * Model class for the Hangman game
 * Manages the game state, word selection, and guess processing
 */
export class Model {
  private currentWord = '';
  private correctGuesses: string[] = [];
  private attempts = 6;
  private hangedManStage = './img/Hangman-0.png';

  /**
   * Initializes a new Hangman game model
   * @param dictionary Array of words that can be selected for the game
   */
  constructor(private dictionary: string[] = animalsNames) {
    this.selectRandomWord();
  }

  /**
   * Selects a random index from the dictionary
   * @returns A random index within the bounds of the dictionary array
   * @throws Error if the dictionary is empty
   */
  private selectRandomIndex(): number {
    if (this.dictionary.length === 0) {
      throw new Error('Dictionary is empty');
    }
    return Math.floor(Math.random() * this.dictionary.length);
  }

  /**
   * Selects a random word from the dictionary and sets it as the current word
   */
  private selectRandomWord() {
    this.currentWord = this.dictionary[this.selectRandomIndex()];
  }

  /**
   * Checks if the current word has been completely guessed
   * @returns True if all letters in the current word have been guessed, false otherwise
   */
  isGuessed(): boolean {
    for (const letter of this.currentWord) {
      if (!this.correctGuesses.includes(letter)){
        return false;
      }
    }
    return true;
  }

  /**
   * Processes a letter guess and updates the game state
   * @param letter The letter that the player guessed
   * @returns True if the letter appears in the word, false otherwise
   */
  guessLetter(letter: Letter): boolean {
    if (this.currentWord.includes(letter)) {
      this.correctGuesses.push(letter);
      return true;
    } else {
      this.attempts -= 1;
      this.hangedManStage = `./img/Hangman-${6 - this.attempts}.png`;
      return false;
    }
  }

  /**
   * Resets the game state for a new game
   */
  reset() {
    this.correctGuesses = [];
    this.attempts = 6;
    this.hangedManStage = './img/Hangman-0.png';
    this.selectRandomWord();
    console.log(this.currentWord);
  }

  /**
   * Gets the current hangman image path
   * @returns The path to the current hangman stage image
   */
  get hangedMan() {
    return this.hangedManStage;
  }

  /**
   * Gets the current word being guessed
   * @returns The current word
   */
  get word() {
    return this.currentWord;
  }

  /**
   * Gets the remaining number of attempts
   * @returns The number of remaining attempts
   */
  get attemptNumber() {
    return this.attempts;
  }
}