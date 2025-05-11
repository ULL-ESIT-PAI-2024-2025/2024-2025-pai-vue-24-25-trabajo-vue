<!--
Universidad de La Laguna
Escuela Superior de Ingeniería y Tecnología
Grado en Ingeniería Informática
Programación de Aplicaciones Interactivas

@author Álvaro Pérez Ramos
@file CanvasFiguras.vue
@since 10 MAY 2025
@description Componente Vue para dibujar figuras en un canvas HTML5. Permite seleccionar la figura, color, posición, rotación y dimensiones.
-->

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
/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Programación de Aplicaciones Web
 * 
 * @author: Álvaro Pérez Ramos
 * @file: canvas-figuras.ts
 * @description: Componente de Vue para dibujar figuras en un canvas HTML5.
 * @date: 10 MAY 2025
 */

import { defineComponent } from 'vue';

// Definición de la interfaz para los datos del componente
interface CanvasFigurasData {
  figuraSeleccionada: string;
  color: string;
  posX: number;
  posY: number;
  rotacion: number;
  lado: number;
  ancho: number;
  alto: number;
  radio: number;
  base: number;
  altura: number;
  mostrarLado: boolean;
  mostrarAncho: boolean;
  mostrarAlto: boolean;
  mostrarRadio: boolean;
  mostrarBase: boolean;
  mostrarAltura: boolean;
  numFiguras: number;
  ctx: CanvasRenderingContext2D | null;
}

// Funciones de utilidad
function actualizarInputs(component: any) {
  // Resetear todos los controles a falso
  component.mostrarLado = false;
  component.mostrarAncho = false;
  component.mostrarAlto = false;
  component.mostrarRadio = false;
  component.mostrarBase = false;
  component.mostrarAltura = false;

  // Mostrar los controles según la figura seleccionada
  switch (component.figuraSeleccionada) {
    case 'cuadrado':
    case 'pentagono':
      component.mostrarLado = true;
      break;
    case 'triangulo':
      component.mostrarBase = true;
      component.mostrarAltura = true;
      break;
    case 'rectangulo':
      component.mostrarAncho = true;
      component.mostrarAlto = true;
      break;
    case 'circulo':
      component.mostrarRadio = true;
      break;
  }
}

/**
 * Limpia el canvas
 * @param ctx - Contexto del canvas
 * @param canvas - Elemento canvas
 */
function limpiarCanvas(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/**
 * Dibuja la figura seleccionada en el canvas
 * @param component - Componente Vue
 * @param ctx - Contexto del canvas
 * @returns {void}
 */
function dibujarFigura(component: any, ctx: CanvasRenderingContext2D) {
  if (!component.figuraSeleccionada) return;

  const x = component.posX || 0;
  const y = component.posY || 0;
  const angle = (component.rotacion || 0) * Math.PI / 180;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.fillStyle = component.color;
  ctx.beginPath();

  switch (component.figuraSeleccionada) {
    case 'cuadrado': {
      const size = component.lado || 50;
      ctx.fillRect(-size / 2, -size / 2, size, size);
      break;
    }
    case 'rectangulo': {
      const w = component.ancho || 80;
      const h = component.alto || 40;
      ctx.fillRect(-w / 2, -h / 2, w, h);
      break;
    }
    case 'triangulo': {
      const b = component.base || 60;
      const h = component.altura || 50;
      ctx.moveTo(0, -h / 2);
      ctx.lineTo(-b / 2, h / 2);
      ctx.lineTo(b / 2, h / 2);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case 'circulo': {
      const r = component.radio || 30;
      ctx.arc(0, 0, r, 0, 2 * Math.PI);
      ctx.fill();
      break;
    }
    case "pentagono": {
      const l = component.lado || 50;
      const angle = Math.PI * 2 / 5;
      ctx.moveTo(0, -l);
      for (let i = 1; i < 5; i++) {
        ctx.lineTo(l * Math.sin(i * angle), -l * Math.cos(i * angle));
      }
      ctx.closePath();
      ctx.fill();
      break;
    }
  }

  ctx.restore();
}

export default defineComponent({
  name: 'CanvasFiguras',
  data(): CanvasFigurasData {
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
      numFiguras: 5,
      ctx: null
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
    },
    generarFigurasAleatorias() {
      if (!this.ctx || !this.$refs.canvas) return;
      
      this.limpiarCanvas();
      const canvas = this.$refs.canvas as HTMLCanvasElement;
      
      for (let i = 0; i < this.numFiguras; i++) {
        // Configuración aleatoria
        const figuraAleatoria = ['cuadrado', 'triangulo', 'rectangulo', 'circulo', 'pentagono'][
          Math.floor(Math.random() * 5)
        ];
        const colorAleatorio = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
        const posXAleatoria = Math.random() * canvas.width;
        const posYAleatoria = Math.random() * canvas.height;
        const rotacionAleatoria = Math.random() * 360;
        
        // Guardar configuración actual
        const configOriginal = {
          figuraSeleccionada: this.figuraSeleccionada,
          color: this.color,
          posX: this.posX,
          posY: this.posY,
          rotacion: this.rotacion,
          lado: this.lado,
          ancho: this.ancho,
          alto: this.alto,
          radio: this.radio,
          base: this.base,
          altura: this.altura
        };
        
        // Configurar valores aleatorios
        this.figuraSeleccionada = figuraAleatoria;
        this.color = colorAleatorio;
        this.posX = posXAleatoria;
        this.posY = posYAleatoria;
        this.rotacion = rotacionAleatoria;
        
        // Configurar dimensiones según la figura
        const size = 30 + Math.random() * 70; // Tamaño entre 30 y 100
        switch (figuraAleatoria) {
          case 'cuadrado':
          case 'pentagono':
            this.lado = size;
            break;
          case 'rectangulo':
            this.ancho = size;
            this.alto = size * (0.5 + Math.random());
            break;
          case 'triangulo':
            this.base = size;
            this.altura = size * (0.5 + Math.random());
            break;
          case 'circulo':
            this.radio = size / 2;
            break;
        }
        
        // Dibujar la figura
        this.dibujarFigura();
        
        // Restaurar configuración original
        Object.assign(this, configOriginal);
      }
    }
  }
});
</script>

<style scoped>
.canvas-container {
  font-family: Arial, sans-serif;
  text-align: center;
  background-color: #f4f4f4;
  margin: 20px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

canvas {
  background: white;
  border: 1px solid #ddd;
  display: block;
  margin: 20px auto;
  box-shadow: 0 0 5px rgba(0,0,0,0.1);
}

.controls {
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
}

.controls label {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}

.inputs {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.inputs label {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
}

.inputs input[type="number"],
.inputs input[type="color"] {
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.inputs input[type="number"] {
  width: 70px;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}

button:active {
  background-color: #3e8e41;
}

button:nth-child(2) {
  background-color: #f44336;
}

button:nth-child(2):hover {
  background-color: #d32f2f;
}

button:nth-child(3) {
  background-color: #2196F3;
}

button:nth-child(3):hover {
  background-color: #0b7dda;
}
</style>