<template>
  <div id="app">
    <ReactividadContainer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ReactividadContainer from './components/ReactividadBasica/ReactividadContainer.vue';

export default defineComponent({
  name: 'App',
  components: {
    ReactividadContainer
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