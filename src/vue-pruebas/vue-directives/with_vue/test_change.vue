<!--
  Universidad de La Laguna
  Grado en Ingeniería Informática
  Asignatura: Programación de Aplicaciones Web

  @author: Álvaro Pérez Ramos
  @date: 10 MOY 2025
-->
  
<div id="app">
  <input v-model="mensaje" placeholder="Escribe algo">
  <p>El mensaje es: {{ mensaje }}</p>
</div>

<script>
  new Vue({
    el: '#app',
    data: {
      mensaje: ''
    }
  })
</script>