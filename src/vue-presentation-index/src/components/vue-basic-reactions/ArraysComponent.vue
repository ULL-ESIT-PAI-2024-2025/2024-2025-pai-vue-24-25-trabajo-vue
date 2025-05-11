<!-- 
  Universidad de La Laguna
  Escuela Superior de Ingeniería y Tecnología
  Grado en Ingeniería Informática
  Programación de Aplicaciones Interactivas

  @description Componente Vue para gestionar un array reactivo de tareas. 
               Permite agregar y eliminar tareas de la lista.
  @author Álvaro Pérez Ramos
  @file ArraysComponent.vue
  @since 10 MAY 2025
-->

<template>
  <section class="seccion">
    <h2>Arrays Reactivos</h2>
    <ul>
      <li v-for="(item, index) in tareas" :key="index">
        {{ item }}
        <button @click="eliminarTarea(index)">Eliminar</button>
      </li>
    </ul>
    <input v-model="nuevaTarea" @keyup.enter="agregarTarea" placeholder="Nueva tarea">
    <button @click="agregarTarea">Agregar</button>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ArraysComponent',
  setup() {
    const tareas = ref(['Aprender Vue', 'Practicar reactividad']);
    const nuevaTarea = ref('');
    
    const agregarTarea = () => {
      if (nuevaTarea.value.trim()) {
        tareas.value.push(nuevaTarea.value);
        nuevaTarea.value = '';
      }
    };
    
    const eliminarTarea = (index: number) => {
      tareas.value.splice(index, 1);
    };
    
    return { tareas, nuevaTarea, agregarTarea, eliminarTarea };
  }
});
</script>