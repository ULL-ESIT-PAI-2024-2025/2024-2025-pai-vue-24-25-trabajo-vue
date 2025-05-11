<!--
  Universidad de La Laguna
  Escuela Superior de Ingeniería y Tecnología
  Grado en Ingeniería Informática
  Programación de Aplicaciones Interactivas

  Componente raíz de la aplicación
-->
<template>
  <LissajousApp />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LissajousApp from './components/LissajousApp.vue';

export default defineComponent({
  name: 'App',
  components: {
    LissajousApp
  }
});
</script>