<!--
Universidad de La Laguna
Escuela Superior de Ingeniería y Tecnología
Grado en Ingeniería Informática
Programación de Aplicaciones Interactivas

@author Álvaro Pérez Ramos
@file FiguresView.vue
@since 10 MAY 2025
@description Vista que define la pagina de las figuras.
-->

<template>
  <div class="canvas-container">
    <h1>Figuras en Canvas</h1>
    <canvas ref="canvas" width="800" height="350"></canvas>
    
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
      
      <label>Número de figuras: 
        <input type="number" v-model.number="numFiguras" min="1" max="100">
      </label>
    </div>

    <div class="buttons">
      <button @click="dibujarFigura">Dibujar</button>
      <button @click="limpiarCanvas">Limpiar</button>
      <button @click="generarFigurasAleatorias">Generar Aleatorias</button>
    </div>
  </div>
</template>

<script lang="ts">
import CanvasFigurasComponent from '../composables/figures/figures';
export default CanvasFigurasComponent;
</script>

<style scoped src="../assets/figures.css"></style>