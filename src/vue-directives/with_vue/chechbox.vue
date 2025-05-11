<!--
  Universidad de La Laguna
  Grado en Ingeniería Informática
  Asignatura: Programación de Aplicaciones Web

  @author: Álvaro Pérez Ramos
  @date: 10 MOY 2025
-->
  
<div id="app">
  <button @click="mostrar = !mostrar">Alternar</button>
  
  <p v-if="mostrar">Este contenido es visible</p>
  <p v-else>Este contenido alternativo es visible</p>
</div>

<script>
  new Vue({
    el: '#app',
    data: {
      mostrar: true
    }
  })
</script>