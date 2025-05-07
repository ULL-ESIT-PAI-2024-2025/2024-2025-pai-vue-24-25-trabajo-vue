<script setup>
const emit = defineEmits(['reset-game']);

const resetGame = () => {
  emit('reset-game');
};
</script>

<template>
  <div class="container has-text-centered my-4">
    <button 
      @click="resetGame" 
      class="button is-primary is-medium"
    >
      <span class="icon">
        <i class="fas fa-sync-alt"></i>
      </span>
      <span>New Game</span>
    </button>
  </div>
</template>