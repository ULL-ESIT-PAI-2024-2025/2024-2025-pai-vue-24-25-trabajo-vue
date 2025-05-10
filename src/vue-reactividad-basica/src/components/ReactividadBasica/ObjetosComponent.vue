<!--
  Universidad de La Laguna
  Escuela Superior de Ingeniería y Tecnología
  Grado en Ingeniería Informática
  Programación de Aplicaciones Interactivas

  @description Componente Vue para mostrar objetos reactivos. 
               Permite editar el nombre, apellido y edad de un usuario.
  @author Álvaro Pérez Ramos
  @file ObjetosComponent.vue
  @since 10 MAY 2025
-->

<template>
  <section class="seccion">
    <h2>Objetos Reactivos</h2>
    <p>Usuario: {{ usuario.nombre }} {{ usuario.apellido }}</p>
    <p>Edad: {{ usuario.edad }}</p>
    <input v-model="usuario.nombre" placeholder="Nombre">
    <input v-model="usuario.apellido" placeholder="Apellido">
    <input v-model.number="usuario.edad" type="number" placeholder="Edad">
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'ObjetosComponent',
  setup() {
    const usuario = reactive({
      nombre: 'Juan',
      apellido: 'Pérez',
      edad: 30
    });
    
    return { usuario };
  }
});
</script>