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
    <div v-for="row in keyboardLayout" :key="row.join('')" class="keyboard-row">
      <button 
        v-for="letter in row" 
        :key="letter"
        :disabled="disabledLetters.includes(letter)"
        @click="letterClicked(letter)"
        class="keyboard-key"
        :class="{'is-active': !disabledLetters.includes(letter), 'is-disabled': disabledLetters.includes(letter)}"
      >
        {{ letter }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.keyboard-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.keyboard-row {
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 0.25rem;
}

.keyboard-key {
  font-size: clamp(1rem, 3vw, 1.5rem);
  font-weight: bold;
  padding: 0;
  height: clamp(3rem, 6vh, 4rem);
  width: clamp(2.5rem, 5vw, 3.5rem);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  border: 2px solid #dbdbdb;
  cursor: pointer;
  transition: all 0.2s ease;
}

.keyboard-key.is-active {
  background-color: white;
  color: #363636;
}

.keyboard-key.is-disabled {
  background-color: #363636;
  color: #f5f5f5;
  opacity: 0.7;
  cursor: not-allowed;
}

.keyboard-key:not([disabled]):hover {
  transform: translateY(-2px);
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
  border-color: #b5b5b5;
}

@media screen and (max-width: 768px) {
  .keyboard-key {
    height: clamp(2.5rem, 5vh, 3.5rem);
    width: clamp(2rem, 4vw, 3rem);
  }
}

@media screen and (max-height: 600px) {
  .keyboard-container {
    gap: 0.25rem;
  }
  
  .keyboard-key {
    height: clamp(2rem, 4vh, 3rem);
  }
}
</style>