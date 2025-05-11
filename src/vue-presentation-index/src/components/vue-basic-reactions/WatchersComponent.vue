<!--
  Universidad de La Laguna
  Escuela Superior de Ingeniería y Tecnología
  Grado en Ingeniería Informática
  Programación de Aplicaciones Interactivas

  @description Componente Vue para mostrar saber cómo funcionan los watchers. 
               Muestra un contador y el último cambio realizado en él.
  @author Álvaro Pérez Ramos
  @file WatchersComponent.vue
  @since 10 MAY 2025
-->

<template>
  <section class="seccion">
    <h2>Watchers</h2>
    <p>Contador: {{ contador }}</p>
    <button @click="incrementar">Incrementar</button>
    <p>Último cambio: {{ ultimoCambio }}</p>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'WatchersComponent',
  setup() {
    const contador = ref(0);
    const ultimoCambio = ref('');
    
    const incrementar = () => contador.value++;
    
    watch(contador, (nuevoValor, viejoValor) => {
      ultimoCambio.value = `Cambió de ${viejoValor} a ${nuevoValor} a las ${new Date().toLocaleTimeString()}`;
    });
    
    return { contador, incrementar, ultimoCambio };
  }
});
</script>