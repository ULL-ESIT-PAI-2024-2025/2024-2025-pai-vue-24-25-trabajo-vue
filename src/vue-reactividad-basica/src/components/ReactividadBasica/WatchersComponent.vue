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