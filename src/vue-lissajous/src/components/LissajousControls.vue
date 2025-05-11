<!--
  Universidad de La Laguna
  Escuela Superior de Ingeniería y Tecnología
  Grado en Ingeniería Informática
  Programación de Aplicaciones Interactivas

  Componente que define los controles de la app de Lissajous
-->
<template>
  <div class="controls">
    <h2>Parámetros</h2>

    <h4>Frecuencia A:</h4>
    <input v-model.number="localA" type="number" step="1" />

    <h4>Frecuencia B:</h4>
    <input v-model.number="localB" type="number" step="1" />

    <h4>Fase (φ):</h4>
    <input v-model.number="localPhi" type="number" step="0.01" />

    <button @click="$emit('toggleAnimation')">
      {{ animationOn ? 'Detener animación' : 'Animar' }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, defineProps, defineEmits } from 'vue';

const props = defineProps<{
  variableA: number;
  variableB: number;
  phi: number;
  animationOn: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:variableA', value: number): void;
  (e: 'update:variableB', value: number): void;
  (e: 'update:phi', value: number): void;
  (e: 'toggleAnimation'): void;
}>();

// local copies to avoid syncing every keystroke until input is committed
const localA = ref(props.variableA);
const localB = ref(props.variableB);
const localPhi = ref(props.phi);

// emit changes when inputs update
watch(localA, (val) => emit('update:variableA', val));
watch(localB, (val) => emit('update:variableB', val));
watch(localPhi, (val) => emit('update:phi', val));
</script>