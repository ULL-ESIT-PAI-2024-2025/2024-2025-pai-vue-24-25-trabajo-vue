import { defineComponent, ref, reactive, computed, watch } from 'vue';

export default defineComponent({
  name: 'ReactividadBasica',

  setup() {
    // 1. Reactividad con datos primitivos
    const contador = ref(0);
    const ultimoCambioContador = ref('');

    const incrementar = () => contador.value++;
    const decrementar = () => contador.value--;

    // 2. Reactividad con objetos
    const usuario = reactive({
      nombre: 'Juan',
      apellido: 'Pérez',
      edad: 30
    });

    // 3. Reactividad con arrays
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

    // 4. Computed properties
    const nombreCompleto = computed(() => `${usuario.nombre} ${usuario.apellido}`);
    const tareasCompletadas = computed(() => tareas.value.length);

    // 5. Watchers
    watch(contador, (nuevoValor, viejoValor) => {
      ultimoCambioContador.value = `Contador cambió de ${viejoValor} a ${nuevoValor} a las ${new Date().toLocaleTimeString()}`;
    });

    return {
      contador,
      incrementar,
      decrementar,
      usuario,
      tareas,
      nuevaTarea,
      agregarTarea,
      eliminarTarea,
      nombreCompleto,
      tareasCompletadas,
      ultimoCambioContador
    };
  }
});