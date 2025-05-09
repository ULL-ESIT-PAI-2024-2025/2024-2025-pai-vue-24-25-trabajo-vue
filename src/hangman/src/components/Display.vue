<script setup lang="ts">
import { computed } from 'vue';
import { Letter } from '../hangman-essentials';

const props = defineProps({
  word: {
    type: String,
    required: true
  },
  correctGuesses: {
    type: Array as () => string[],
    required: true
  }
});

const displayWord = computed(() => {
  if (!props.word) return [];
  
  return props.word.split('').map(letter => ({
    letter: letter,
    revealed: props.correctGuesses.includes(letter.toLowerCase() as Letter)
  }));
});
</script>

<template>
  <div class="word-display">
    <div class="word-container has-text-centered">
      <div class="letter-container" v-for="(char, index) in displayWord" :key="index">
        <span class="letter" :class="{ 'is-hidden': !char.revealed }">
          {{ char.letter.toUpperCase() }}
        </span>
        <div class="underline"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.word-display {
  width: 100%;
  padding: 0.5rem 0;
}

.word-container {
  display: flex;
  justify-content: center;
  margin: 0.5rem 0;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.letter-container {
  position: relative;
  width: 1.5rem;
  height: 2.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.letter {
  font-size: 1.4rem;
  font-weight: bold;
}

.is-hidden {
  visibility: hidden;
}

.underline {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 3px;
  background-color: #363636;
  border-radius: 2px;
}
</style>