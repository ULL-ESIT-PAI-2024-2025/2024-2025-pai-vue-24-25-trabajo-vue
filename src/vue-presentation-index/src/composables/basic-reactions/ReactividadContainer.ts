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
import PrimitivosComponent from '../../components/vue-basic-reactions/PrimitivosComponent.vue';
import ObjetosComponent from '../../components/vue-basic-reactions/ObjetosComponent.vue';
import ArraysComponent from '../../components/vue-basic-reactions/ArraysComponent.vue';
import WatchersComponent from '../../components/vue-basic-reactions/WatchersComponent.vue';
import SlidersComponent from '../../components/vue-basic-reactions/SlidersComponent.vue';

export default defineComponent({
  name: 'ReactividadContainer',
  components: {
    PrimitivosComponent,
    ObjetosComponent,
    ArraysComponent,
    WatchersComponent,
    SlidersComponent
  },
  setup() {
    const currentComponent = ref('PrimitivosComponent');

    const components = [
      { name: 'PrimitivosComponent', label: 'Datos Primitivos' },
      { name: 'ObjetosComponent', label: 'Objetos Reactivos' },
      { name: 'ArraysComponent', label: 'Arrays Reactivos' },
      { name: 'WatchersComponent', label: 'Watchers' },
      { name: 'SlidersComponent', label: 'Sliders' }
    ];

    return {
      currentComponent,
      components
    };
  }
});