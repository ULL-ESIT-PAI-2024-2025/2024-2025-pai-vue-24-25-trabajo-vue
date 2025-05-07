<script setup>
import { ref, computed } from 'vue';
import HangManImage from '../components/HangManImage.vue';
import Display from '../components/Display.vue';
import Keyboard from '../components/Keyboard.vue';
import ResetButton from '../components/ResetButton.vue';
import { Model } from '../model';

const model = ref(new Model());
const correctGuesses = ref([]);
const keyboardRef = ref(null);

// Compute if the game is lost (player has run out of attempts)
const isGameLost = computed(() => model.value.attemptNumber <= 0);

// Compute if the game is won (all letters in the word have been guessed)
const isGameWon = computed(() => {
  if (!model.value.word) return false;
  
  // Check if every letter in the word has been guessed
  return model.value.word.split('').every(letter => 
    correctGuesses.value.includes(letter.toLowerCase())
  );
});

// Function to disable all keyboard keys
const disableAllKeys = () => {
  if (keyboardRef.value) {
    keyboardRef.value.disableAllKeys();
  }
};

const handleLetterPress = (letter) => {
  // Don't process further input if game is already over
  if (isGameLost.value || isGameWon.value) return;
  
  const isCorrect = model.value.guessLetter(letter.toLowerCase());
  if (isCorrect) {
    correctGuesses.value.push(letter.toLowerCase());
    
    // Check if this guess resulted in winning
    if (isGameWon.value) {
      disableAllKeys();
    }
  }
  
  // If the game is lost after this guess, disable the keyboard
  if (isGameLost.value) {
    disableAllKeys();
  }
};

const resetGame = () => {
  model.value.reset();
  correctGuesses.value = [];
  // Reset the keyboard's disabled letters
  if (keyboardRef.value) {
    keyboardRef.value.resetKeyboard();
  }
};
</script>

<template>
  <div>
    <HangManImage :imageUrl="model.hangedMan" :attempts="6 - model.attemptNumber" />
    
    <!-- Win Message -->
    <div v-if="isGameWon" class="notification is-success has-text-centered my-4">
      <p class="title">Congratulations!</p>
      <p class="subtitle">You successfully guessed the word: <strong>{{ model.word.toUpperCase() }}</strong></p>
    </div>
    
    <!-- Game Over Message -->
    <div v-if="isGameLost" class="notification is-danger has-text-centered my-4">
      <p class="title">Game Over!</p>
      <p class="subtitle">You failed. The word was: <strong>{{ model.word.toUpperCase() }}</strong></p>
    </div>
    
    <Display :word="model.word" :correctGuesses="correctGuesses" />
    <Keyboard @letter-pressed="handleLetterPress" ref="keyboardRef" />
    <ResetButton @reset-game="resetGame" />
  </div>
</template>