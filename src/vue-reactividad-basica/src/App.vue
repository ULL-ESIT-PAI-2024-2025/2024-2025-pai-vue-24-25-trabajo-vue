<!-- 
  Universidad de La Laguna
  Escuela Superior de Ingeniería y Tecnología
  Grado en Ingeniería Informática
  Programación de Aplicaciones Interactivas

  @description App Vue principal que importa el componente ReactividadContainer y lo renderiza en la vista.
  @author Álvaro Pérez Ramos
  @file App.vue
  @since 10 MAY 2025
-->

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