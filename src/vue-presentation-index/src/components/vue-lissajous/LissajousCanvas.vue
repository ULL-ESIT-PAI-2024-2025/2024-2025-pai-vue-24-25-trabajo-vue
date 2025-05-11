<!--
  Universidad de La Laguna
  Escuela Superior de Ingeniería y Tecnología
  Grado en Ingeniería Informática
  Programación de Aplicaciones Interactivas

  Componente que define el componente canvas de Lissajous
-->
<template>
  <canvas ref="canvas" id="lissajousCanvas" width="600" height="600"></canvas>
</template>

<script lang="ts" setup>
import { onMounted, ref, defineExpose } from 'vue';
import type { LissajousModel } from '../../composables/lissajous/model';

const props = defineProps<{ model: LissajousModel }>();
const canvas = ref<HTMLCanvasElement | null>(null);

function draw() {
  if (!canvas.value) return;
  const ctx = canvas.value.getContext('2d')!;
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);

  // Grid
  const gridSize = 20;
  ctx.strokeStyle = "#e0e0e0";
  ctx.lineWidth = 0.5;
  for (let x = 0; x <= canvas.value.width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.value.height);
    ctx.stroke();
  }
  for (let y = 0; y <= canvas.value.height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.value.width, y);
    ctx.stroke();
  }

  // Curve
  const points = props.model.getPoints();
  const scale = Math.min(canvas.value.width, canvas.value.height) / 2 * 0.8;
  const centerX = canvas.value.width / 2;
  const centerY = canvas.value.height / 2;

  ctx.beginPath();
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;
  points.forEach((p, i) => {
    const x = centerX + p.variableX * scale;
    const y = centerY + p.variableY * scale;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.stroke();
}

onMounted(draw);
defineExpose({ draw });
</script>