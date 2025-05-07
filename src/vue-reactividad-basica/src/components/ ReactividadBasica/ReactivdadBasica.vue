<template>
  <div class="reactividad-container">
    <h1>Reactividad Básica en Vue</h1>
    
    <section class="seccion">
      <h2>Datos Primitivos</h2>
      <p>Contador: {{ contador }}</p>
      <button @click="incrementar">Incrementar</button>
      <button @click="decrementar">Decrementar</button>
    </section>
    
    <section class="seccion">
      <h2>Objetos Reactivos</h2>
      <p>Usuario: {{ usuario.nombre }} {{ usuario.apellido }}</p>
      <p>Edad: {{ usuario.edad }}</p>
      <input v-model="usuario.nombre" placeholder="Nombre">
      <input v-model="usuario.apellido" placeholder="Apellido">
      <input v-model.number="usuario.edad" type="number" placeholder="Edad">
    </section>
    
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
    
    <section class="seccion">
      <h2>Propiedades Computadas</h2>
      <p>Nombre completo: {{ nombreCompleto }}</p>
      <p>Tareas completadas: {{ tareasCompletadas }}</p>
    </section>
    
    <section class="seccion">
      <h2>Watchers</h2>
      <p>Último cambio en contador: {{ ultimoCambioContador }}</p>
    </section>
  </div>
</template>

<script lang="ts" src="./reactividad-basica.ts"></script>
<style src="./reactividad-basica.css"></style>