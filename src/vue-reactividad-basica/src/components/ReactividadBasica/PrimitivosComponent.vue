<template>
  <section class="seccion">
    <h2>Datos Primitivos</h2>
    <p>Contador: {{ contador }}</p>
    <button @click="incrementar">Incrementar</button>
    <button @click="decrementar">Decrementar</button>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'PrimitivosComponent',
  setup() {
    const contador = ref(0);
    
    const incrementar = () => contador.value++;
    const decrementar = () => contador.value--;
    
    return { contador, incrementar, decrementar };
  }
});
</script>