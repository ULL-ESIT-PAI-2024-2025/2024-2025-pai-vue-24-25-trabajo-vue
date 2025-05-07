<template>
  <div id="app">
    <ReactividadBasica />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ReactividadBasica from './components/ ReactividadBasica/ReactivdadBasica.vue';

export default defineComponent({
  name: 'App',
  components: {
    ReactividadBasica
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>