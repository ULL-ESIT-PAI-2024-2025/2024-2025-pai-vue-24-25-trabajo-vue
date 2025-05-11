<script setup lang="ts">
// You can define props to make this component reusable
defineProps({
  imageUrl: {
    type: String,
    default: '@/assets/logo.svg' // Path to a default image
  },
  imageAlt: {
    type: String,
    default: 'Vue logo'
  },
  name: {
    type: String,
    default: 'John Doe'
  },
  email: {
    type: String,
    default: 'aluXXX@ull.edu.es'
  }
})
</script>

<template>
  <div class="welcome-container">
    <img :src="imageUrl" :alt="imageAlt" class="welcome-image">
    <p class="welcome-text">{{ name }}</p>
    <p class="welcome-text">{{ email }}</p>
  </div>
</template>

<style scoped>
.welcome-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  text-align: center;
}

.welcome-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 2rem;
  /* Default size if none provided */
  width: 200px;
}

.welcome-text {
  font-size: 1.2rem;
  line-height: 1.6;
  color: var(--color-text);
}
</style>