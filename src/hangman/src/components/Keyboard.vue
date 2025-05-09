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
    <div v-for="row in keyboardLayout" :key="row.join('')" class="buttons is-centered my-1">
      <button 
        v-for="letter in row" 
        :key="letter"
        :disabled="disabledLetters.includes(letter)"
        @click="letterClicked(letter)"
        class="button mx-1"
        :class="{'is-light': !disabledLetters.includes(letter), 'is-dark': disabledLetters.includes(letter)}"
      >
        {{ letter }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.keyboard-container {
  width: 100%;
  max-width: 600px;
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.buttons {
  margin-top: 0.25rem !important;
  margin-bottom: 0.25rem !important;
}

.button {
  font-size: 1rem;
  padding: 0.5em 1em !important;
  margin: 0 0.25rem !important;
  height: auto !important;
}

/* Still responsive on smaller screens */
@media screen and (max-width: 600px) {
  .keyboard-container {
    max-width: 95%;
  }
  
  .button {
    font-size: 0.9rem;
    padding: 0.4em 0.8em !important;
    margin: 0 0.15rem !important;
  }
}

@media screen and (max-width: 400px) {
  .button {
    font-size: 0.8rem;
    padding: 0.3em 0.6em !important;
    margin: 0 0.1rem !important;
  }
}
</style>