<!--
  Universidad de La Laguna
  Grado en Ingeniería Informática
  Asignatura: Programación de Aplicaciones Web

  @author: Álvaro Pérez Ramos
  @date: 10 MOY 2025
-->

<div id="app">
  <input type="text" v-model="url" placeholder="Ingresa una URL">
  <!-- Enlace completo -->
  <a v-bind:href="url" target="_blank">Visitar enlace</a>
  <!-- Forma abreviada -->
  <img :src="imagenURL" :alt="descripcion">
</div>

<script>
  new Vue({
    el: '#app',
    data: {
      url: 'https://vuejs.org',
      imagenURL: 'https://vuejs.org/images/logo.png',
      descripcion: 'Logo de Vue.js'
    }
  })
</script>