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
  <div class="hangman-image-wrapper">
    <figure class="image is-256x256">
      <img :src="imageUrl" alt="Hangman state - Failed attempts: {{ attempts }}">
    </figure>
  </div>
</template>

<style scoped>
.hangman-image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 768px) {
  .image.is-256x256 {
    width: 200px;
    height: 200px;
  }
}

@media screen and (max-height: 600px) {
  .image.is-256x256 {
    width: 180px;
    height: 180px;
  }
}
</style>