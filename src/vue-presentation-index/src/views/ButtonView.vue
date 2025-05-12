<!--
Universidad de La Laguna
Escuela Superior de Ingeniería y Tecnología
Grado en Ingeniería Informática
Programación de Aplicaciones Interactivas

@author Jose Angel Portillo Garcia
@file ButtonView.vue
@since 10 MAY 2025
@description Componente Vue para dibujar figuras en un canvas HTML5.
-->

<script lang="ts" setup>
import { ref } from 'vue'

const message = ref("Hello PAI class")
function updateMessage() {
  message.value = "Hi, there!"
}
</script>

<template>
 <div class="button-demo">
  <button class="big-button" @click="updateMessage">Update</button>
  <p class="message-text">{{ message }}</p> 
 </div>
</template>

<style scoped>
.button-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  text-align: center;
}

.big-button {
  font-size: 1.5rem;
  padding: 1rem 2.5rem;
  border-radius: 8px;
  background-color: #41b883; /* Vue green */
  color: white;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.big-button:hover {
  background-color: #35495e; /* Vue dark blue */
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.message-text {
  font-size: 2rem;
  font-weight: 600;
  color: #35495e;
  padding: 1rem;
  border-radius: 8px;
  background-color: #f5f5f5;
  min-width: 300px;
  transition: all 0.3s ease;
}
</style>