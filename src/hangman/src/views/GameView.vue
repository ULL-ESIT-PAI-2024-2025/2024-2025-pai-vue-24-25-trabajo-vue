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
    <div class="game-layout">
      <!-- Left column: Game controls -->
      <div class="game-controls">
        <div class="notifications-area">
          <div v-if="isGameWon" class="notification is-success has-text-centered">
            <p class="title is-5 notification-title">Congratulations!</p>
            <p class="subtitle is-6">You guessed: <strong>{{ model.word.toUpperCase() }}</strong></p>
          </div>
          <div v-else-if="isGameLost" class="notification is-danger has-text-centered">
            <p class="title is-5 notification-title">Game Over!</p>
            <p class="subtitle is-6">The word was: <strong>{{ model.word.toUpperCase() }}</strong></p>
          </div>
          <div v-else class="notification-placeholder"></div>
        </div>
        
        <Display :word="model.word" :correctGuesses="correctGuesses" />
        
        <div class="keyboard-wrapper">
          <Keyboard @letter-pressed="handleLetterPress" ref="keyboardRef" />
        </div>
        
        <div class="reset-button-container">
          <ResetButton @reset-game="resetGame" />
        </div>
      </div>
      
      <!-- Right column: Hangman image -->
      <div class="hangman-container">
        <HangManImage :imageUrl="model.hangedMan" :attempts="6 - model.attemptNumber" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Game page fills available space without scrolling */
.game-page {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 52px; /* Account for navbar height */
}

/* Main layout using grid for responsive behavior */
.game-layout {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 2rem;
  width: 100%;
  height: 100%;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 100vw;
  max-height: calc(100vh - 52px);
}

/* Left column with game controls */
.game-controls {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: space-between;
}

/* Right column with hangman image */
.hangman-container {
  justify-self: end;
  align-self: center;
}

/* Notifications styling - UPDATED */
.notifications-area {
  flex: 0 0 auto;
  min-height: 100px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}

.notification {
  width: 100%;
  padding: 1rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.notification-title {
  margin-bottom: 0 !important;
}

.notification .subtitle {
  margin-top: 0 !important;
  line-height: 1.3;
  white-space: normal;
  word-break: break-word;
}

.keyboard-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}

.reset-button-container {
  margin-top: 1rem;
  text-align: center;
  flex: 0 0 auto;
}

/* Responsive adjustments */
@media screen and (max-width: 768px) {
  /* Stack elements vertically on mobile */
  .game-layout {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    padding: 1rem;
    overflow-y: auto;
    height: auto;
  }
  
  .hangman-container {
    justify-self: center;
    order: -1; /* Move hangman to top on mobile */
  }
  
  /* Adjust notifications for mobile */
  .notifications-area {
    min-height: 80px;
  }
  
  .notification {
    padding: 0.75rem;
  }
}

/* Adjustments for very small screens */
@media screen and (max-height: 600px) {
  .game-page {
    align-items: flex-start;
    overflow-y: auto;
  }
  
  .game-layout {
    padding: 0.5rem;
  }
  
  .notifications-area {
    min-height: 70px;
  }
  
  .notification {
    padding: 0.5rem;
  }
  
  .notification-title {
    font-size: 1rem !important;
  }
  
  .notification .subtitle {
    font-size: 0.9rem !important;
  }
}
</style>