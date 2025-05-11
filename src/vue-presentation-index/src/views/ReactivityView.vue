<!--
  Universidad de La Laguna
  Escuela Superior de Ingeniería y Tecnología
  Grado en Ingeniería Informática
  Programación de Aplicaciones Interactivas

  @description Componente Vue para mostrar botones de navegación y cargar componentes reactivos. 
               Permite navegar entre diferentes componentes que muestran reactividad en Vue.
  @author Álvaro Pérez Ramos
  @file ReactividadContainer.vue
  @since 10 MAY 2025
-->

<template>
  <div class="reactividad-container">
    <h1>Reactividad en Vue</h1>
    
    <nav class="reactividad-nav">
      <button 
        v-for="component in components" 
        :key="component.name"
        @click="currentComponent = component.name"
        :class="{ active: currentComponent === component.name }"
      >
        {{ component.label }}
      </button>
    </nav>
    
    <div class="component-container">
      <component :is="currentComponent" />
    </div>
  </div>
</template>

<script lang="ts" src="../composables/basic-reactions/ReactividadContainer"></script>
<style scoped src="../assets/reactividad.css"></style>