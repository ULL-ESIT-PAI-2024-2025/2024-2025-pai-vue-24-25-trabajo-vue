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
    <h2>Objetos Reactivos con Pinia</h2>
    <p>Usuario: {{ store.name }} {{ store.surname }}</p>
    <p>Edad: {{ store.age }}</p>
    
    <input 
      v-model="nameInput" 
      placeholder="Nombre"
      @input="updateStore()">
      
    <input 
      v-model="surnameInput" 
      placeholder="Apellido"
      @input="updateStore()">
      
    <input 
      v-model.number="ageInput" 
      type="number" 
      placeholder="Edad"
      @input="updateStore()">
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted} from 'vue';
import { useRegisterStore } from '../store/name-register';

export default defineComponent({
  name: 'ObjetosComponent',
  setup() {
    const store = useRegisterStore();
    
    // Local refs for form inputs
    const nameInput = ref(store.name || 'Juan');
    const surnameInput = ref(store.surname || 'Pérez');
    const ageInput = ref(store.age || 30);
    
    // Initialize store with default values if empty
    onMounted(() => {
      if (!store.name && !store.surname && !store.age) {
        store.saveRegister(nameInput.value, surnameInput.value, ageInput.value);
      }
    });
    
    // Update store when any input changes
    const updateStore = () => {
      store.saveRegister(nameInput.value, surnameInput.value, ageInput.value);
    };
    
    return { 
      store,
      nameInput,
      surnameInput,
      ageInput,
      updateStore
    };
  }
});
</script>