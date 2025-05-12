<!--
Universidad de La Laguna
Escuela Superior de Ingeniería y Tecnología
Grado en Ingeniería Informática
Programación de Aplicaciones Interactivas

@author Jose Angel Portillo Garcia
@file LissajousView.vue
@since 10 MAY 2025
@description Componente Vue que define la vista de Lissajous
-->
<template>
  <div>
    <h1>Curvas de Lissajous</h1>
    <div class="container">
      <LissajousCanvas ref="canvasComponent" :model="model" />
      <LissajousControls
        v-model:variableA="variableA"
        v-model:variableB="variableB"
        v-model:phi="phi"
        :animationOn="animationOn"
        @toggleAnimation="toggleAnimation"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { LissajousModel } from '../composables/lissajous/model';
import LissajousCanvas from '../components/vue-lissajous/LissajousCanvas.vue';
import LissajousControls from '../components/vue-lissajous/LissajousControls.vue';

const variableA = ref(3);
const variableB = ref(2);
const phi = ref(1.5);
const animationOn = ref(false);
const model = new LissajousModel(variableA.value, variableB.value, phi.value);
const canvasComponent = ref<InstanceType<typeof LissajousCanvas> | null>(null);
let animationId = 0;

function toggleAnimation() {
  animationOn.value = !animationOn.value;
  if (animationOn.value) animate();
  else cancelAnimationFrame(animationId);
}

function animate() {
  model.animationValuesUpdate();
  canvasComponent.value?.draw();
  animationId = requestAnimationFrame(animate);
}

watch([variableA, variableB, phi], () => {
  model.setParameters(variableA.value, variableB.value, phi.value);
  canvasComponent.value?.draw();
});
</script>

<style scoped src="../assets/lissajous.css"></style>