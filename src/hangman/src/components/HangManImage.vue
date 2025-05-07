<script setup>
defineProps({
  imageUrl: {
    type: String,
    required: true
  },
  attempts: {
    type: Number,
    default: 0
  }
});
</script>

<template>
  <div class="container">
    <div class="has-text-centered">
      <figure class="image is-256x256 is-inline-block">
        <img :src="imageUrl" alt="Hangman state - Failed attempts: {{ attempts }}">
      </figure>
    </div>
  </div>
</template>

<style scoped>
/* Additional styling if needed - most styling comes from Bulma */
.container {
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}
</style>