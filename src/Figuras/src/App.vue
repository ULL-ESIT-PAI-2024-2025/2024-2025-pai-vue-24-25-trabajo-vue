<template>
  <div id="app">
    <CanvasFiguras />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CanvasFiguras from './components/CanvasFiguras/CanvasFiguras.vue'

export default defineComponent({
  name: 'App',
  components: {
    CanvasFiguras
  }
});
</script>