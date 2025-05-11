<!--
  Universidad de La Laguna
  Grado en Ingeniería Informática
  Asignatura: Programación de Aplicaciones Web

  @author: Álvaro Pérez Ramos
  @date: 10 MOY 2025
-->

<div id="app">
  <p>Contador: {{ contador }}</p>
  <button v-on:click="incrementar">Incrementar</button>
  <!-- Forma abreviada -->
  <button @click="decrementar">Decrementar</button>
</div>

<script>
  new Vue({
    el: '#app',
    data: {
      contador: 0
    },
    methods: {
      incrementar() {
        this.contador++;
      },
      decrementar() {
        this.contador--;
      }
    }
  })
</script>