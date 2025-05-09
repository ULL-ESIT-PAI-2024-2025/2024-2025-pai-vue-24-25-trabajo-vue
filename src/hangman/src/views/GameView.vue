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
  <div class="game-page">
    <div class="container">
      <div class="game-container">
        <HangManImage :imageUrl="model.hangedMan" :attempts="6 - model.attemptNumber" />
        
        <!-- Fixed position notifications that don't affect layout -->
        <div class="notifications-area">
          <!-- Use v-if/else pattern to ensure only one notification displays -->
          <div v-if="isGameWon" class="notification is-success has-text-centered">
            <p class="title is-5">Congratulations!</p>
            <p class="subtitle is-6">You guessed: <strong>{{ model.word.toUpperCase() }}</strong></p>
          </div>
          <div v-else-if="isGameLost" class="notification is-danger has-text-centered">
            <p class="title is-5">Game Over!</p>
            <p class="subtitle is-6">The word was: <strong>{{ model.word.toUpperCase() }}</strong></p>
          </div>
          <!-- Empty div to maintain spacing when no notification is shown -->
          <div v-else class="notification-placeholder"></div>
        </div>
        
        <Display :word="model.word" :correctGuesses="correctGuesses" />
        <Keyboard @letter-pressed="handleLetterPress" ref="keyboardRef" />
        <div class="has-text-centered mt-4">
          <ResetButton @reset-game="resetGame" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom game page container that fits in viewport without scrolling */
.game-page {
  height: calc(100vh - 52px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.game-container {
  width: 100%;
  max-width: 700px;
  height: auto;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  position: relative;
}

/* Simple container for notifications */
.notifications-area {
  width: 100%;
  position: relative;
  min-height: 0;
}

/* Style notifications themselves */
.notification {
  width: 100%;
  padding: 1rem;
  margin-bottom: 0;
  margin-top: 0;
}

/* Empty placeholder for consistent spacing */
.notification-placeholder {
  display: none;
}

/* Make the game fit on smaller screens */
@media screen and (max-height: 700px) {
  .game-container {
    gap: 0.75rem;
    padding: 0.75rem;
  }
  
  .notification {
    padding: 0.75rem;
  }
}

@media screen and (max-height: 600px) {
  .game-container {
    gap: 0.5rem;
    padding: 0.5rem;
  }
  
  .notification {
    padding: 0.5rem;
  }
}
</style>