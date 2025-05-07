<template>
  <div class="canvas-container">
    <h1>Figuras en Canvas</h1>
    <canvas ref="canvas" width="800" height="600"></canvas>
    
    <div class="controls">
      <label><input type="radio" v-model="figuraSeleccionada" value="cuadrado" @change="actualizarInputs"> Cuadrado</label>
      <label><input type="radio" v-model="figuraSeleccionada" value="triangulo" @change="actualizarInputs"> Triángulo</label>
      <label><input type="radio" v-model="figuraSeleccionada" value="rectangulo" @change="actualizarInputs"> Rectángulo</label>
      <label><input type="radio" v-model="figuraSeleccionada" value="circulo" @change="actualizarInputs"> Círculo</label>
      <label><input type="radio" v-model="figuraSeleccionada" value="pentagono" @change="actualizarInputs"> Pentágono</label>
    </div>
    
    <div class="inputs">
      <label>Color: <input type="color" v-model="color"></label>
      <label>Posición X: <input type="number" v-model.number="posX" min="0" max="800"></label>
      <label>Posición Y: <input type="number" v-model.number="posY" min="0" max="600"></label>
      <label>Rotación (°): <input type="number" v-model.number="rotacion" min="0" max="360"></label>
      
      <label v-show="mostrarLado">Lado: <input type="number" v-model.number="lado" min="1"></label>
      <label v-show="mostrarAncho">Ancho: <input type="number" v-model.number="ancho" min="1"></label>
      <label v-show="mostrarAlto">Alto: <input type="number" v-model.number="alto" min="1"></label>
      <label v-show="mostrarRadio">Radio: <input type="number" v-model.number="radio" min="1"></label>
      <label v-show="mostrarBase">Base: <input type="number" v-model.number="base" min="1"></label>
      <label v-show="mostrarAltura">Altura: <input type="number" v-model.number="altura" min="1"></label>
    </div>

    <div class="buttons">
      <button @click="dibujarFigura">Dibujar</button>
      <button @click="limpiarCanvas">Limpiar</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { dibujarFigura, limpiarCanvas, actualizarInputs } from './canvas-figuras';

export default defineComponent({
  name: 'CanvasFiguras',
  data() {
    return {
      figuraSeleccionada: 'cuadrado',
      color: '#000000',
      posX: 100,
      posY: 100,
      rotacion: 0,
      lado: 100,
      ancho: 100,
      alto: 100,
      radio: 50,
      base: 100,
      altura: 100,
      mostrarLado: true,
      mostrarAncho: false,
      mostrarAlto: false,
      mostrarRadio: false,
      mostrarBase: false,
      mostrarAltura: false,
      ctx: null as CanvasRenderingContext2D | null
    }
  },
  mounted() {
    this.inicializarCanvas();
    this.actualizarInputs();
  },
  methods: {
    inicializarCanvas() {
      const canvas = this.$refs.canvas as HTMLCanvasElement;
      this.ctx = canvas.getContext('2d');
    },
    actualizarInputs() {
      actualizarInputs(this);
    },
    dibujarFigura() {
      if (this.ctx) {
        dibujarFigura(this, this.ctx);
      }
    },
    limpiarCanvas() {
      if (this.ctx && this.$refs.canvas) {
        limpiarCanvas(this.ctx, this.$refs.canvas as HTMLCanvasElement);
      }
    }
  }
});
</script>

<style scoped src="./canvas-figuras.css"></style>