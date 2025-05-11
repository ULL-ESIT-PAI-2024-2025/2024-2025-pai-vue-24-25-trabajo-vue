<!--
  Universidad de La Laguna
  Grado en Ingeniería Informática
  Asignatura: Programación de Aplicaciones Web

  @author: Álvaro Pérez Ramos
  @date: 10 MOY 2025
-->
  
<div id="app">
  <ul>
    <li v-for="item in items">{{ item.texto }}</li>
  </ul>
</div>

<script>
  new Vue({
    el: '#app',
    data: {
      items: [
        { texto: 'Elemento 1' },
        { texto: 'Elemento 2' },
        { texto: 'Elemento 3' }
      ]
    }
  })
</script>