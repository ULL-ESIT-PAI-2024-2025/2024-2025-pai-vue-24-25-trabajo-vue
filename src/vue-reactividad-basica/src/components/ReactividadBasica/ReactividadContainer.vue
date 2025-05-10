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

<script lang="ts">
import { defineComponent, ref } from 'vue';
import PrimitivosComponent from './PrimitivosComponent.vue';
import ObjetosComponent from './ObjetosComponent.vue';
import ArraysComponent from './ArraysComponent.vue';
import ComputadosComponent from './ComputadosComponent.vue';
import WatchersComponent from './WatchersComponent.vue';
import SlidersComponent from './SlidersComponent.vue';

export default defineComponent({
  name: 'ReactividadContainer',
  components: {
    PrimitivosComponent,
    ObjetosComponent,
    ArraysComponent,
    ComputadosComponent,
    WatchersComponent,
    SlidersComponent
  },
  setup() {
    const currentComponent = ref('PrimitivosComponent');
    
    const components = [
      { name: 'PrimitivosComponent', label: 'Datos Primitivos' },
      { name: 'ObjetosComponent', label: 'Objetos Reactivos' },
      { name: 'ArraysComponent', label: 'Arrays Reactivos' },
      { name: 'ComputadosComponent', label: 'Propiedades Computadas' },
      { name: 'WatchersComponent', label: 'Watchers' },
      { name: 'SlidersComponent', label: 'Sliders' }
    ];
    
    return { currentComponent, components };
  }
});
</script>

<style scoped src="./reactividad.css"></style>