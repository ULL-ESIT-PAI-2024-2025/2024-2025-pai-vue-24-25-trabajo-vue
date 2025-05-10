<!--
  Universidad de La Laguna
  Escuela Superior de Ingeniería y Tecnología
  Grado en Ingeniería Informática
  Programación de Aplicaciones Interactivas

  @description Componente Vue para mostrar propiedades computadas. 
               Muestra el nombre completo y la cantidad de tareas completadas.
  @author Álvaro Pérez Ramos
  @file ComputadosComponent.vue
  @since 10 MAY 2025
-->

<template>
  <section class="seccion">
    <h2>Propiedades Computadas</h2>
    <p>Nombre completo: {{ nombreCompleto }}</p>
    <p>Tareas completadas: {{ tareasCompletadas }}</p>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, ref } from 'vue';

export default defineComponent({
  name: 'ComputadosComponent',
  setup() {
    const usuario = reactive({
      nombre: 'Juan',
      apellido: 'Pérez'
    });
    
    const tareas = ref(['Tarea 1', 'Tarea 2', 'Tarea 3']);
    
    const nombreCompleto = computed(() => `${usuario.nombre} ${usuario.apellido}`);
    const tareasCompletadas = computed(() => tareas.value.length);
    
    return { nombreCompleto, tareasCompletadas };
  }
});
</script>