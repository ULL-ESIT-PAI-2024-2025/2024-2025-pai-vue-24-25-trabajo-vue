<script setup>
import { ref } from 'vue';

const keyboardLayout = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

const disabledLetters = ref([]);

const emit = defineEmits(['letter-pressed']);

const letterClicked = (letter) => {
  if (!disabledLetters.value.includes(letter)) {
    disabledLetters.value.push(letter);
    emit('letter-pressed', letter);
  }
};

// Add a reset method
const resetKeyboard = () => {
  disabledLetters.value = [];
};

// Add a method to disable all keys when game is lost
const disableAllKeys = () => {
  const allLetters = keyboardLayout.flat();
  disabledLetters.value = allLetters;
};

// Expose the methods to parent components
defineExpose({
  resetKeyboard,
  disableAllKeys
});
</script>

<template>
  <div class="keyboard-container">
    <div v-for="row in keyboardLayout" :key="row.join('')" class="buttons is-centered my-2">
      <button 
        v-for="letter in row" 
        :key="letter"
        :disabled="disabledLetters.includes(letter)"
        @click="letterClicked(letter)"
        class="button is-medium mx-1"
        :class="{'is-light': !disabledLetters.includes(letter), 'is-dark': disabledLetters.includes(letter)}"
      >
        {{ letter }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.keyboard-container {
  margin: 20px 0;
}
</style>