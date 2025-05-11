/*
  Universidad de La Laguna
  Escuela Superior de Ingeniería y Tecnología
  Grado en Ingeniería Informática
  Programación de Aplicaciones Interactivas

  @description Lógica del componente contenedor de reactividad
  @author Álvaro Pérez Ramos
  @file ReactividadContainer.ts
  @since 10 MAY 2025
*/

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

    return {
      currentComponent,
      components
    };
  }
});