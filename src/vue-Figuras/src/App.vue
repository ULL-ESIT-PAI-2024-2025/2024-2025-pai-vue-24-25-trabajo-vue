<!--  
Universidad de La Laguna
Escuela Superior de Ingeniería y Tecnología
Grado en Ingeniería Informática
Programación de Aplicaciones Interactivas

@author Álvaro Pérez Ramos
@file App.vue
@since 10 MAY 2025
@description Componente principal de la aplicación Vue. Importa el componente CanvasFiguras y lo renderiza en la vista.
-->

<template>
  <div id="app">
    <CanvasFiguras />
  </div>
</template>

<!-- Importing the CanvasFiguras component -->
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