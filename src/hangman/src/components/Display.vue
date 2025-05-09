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
  <div class="section">
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
.word-container {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
  gap: 0.8rem;
}

.letter-container {
  position: relative;
  width: 2rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.letter {
  font-size: 1.8rem;
  font-weight: bold;
}

.is-hidden {
  visibility: hidden;
}

.underline {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 4px;
  background-color: #363636;
  border-radius: 2px;
}
</style>