<!-- CompositionAPI.vue -->
<template>
  <div>
    <p>Hola, {{ name }}</p>
    <input v-model="name" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const name = ref('Juan');
</script>
