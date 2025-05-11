<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main>
    <h1>Page made by: </h1>
    <div class="welcome-row">
      <TheWelcome 
        imageUrl="../../public/student-icon/imagen-joseaportillo-pagina.png"
        imageAlt="Description of image"
        name="José Ángel Portillo García"
        email=""
      />
      <TheWelcome 
        imageUrl="../../public/student-icon/imagen-joseaportillo-pagina.png"
        imageAlt="Description of image"
        name="Álvaro Pérez Ramos"
        email="alvaro.perez.ramos.23@ull.edu.es"
      />
      <TheWelcome 
        imageUrl="../../public/student-icon/imagen-joseaportillo-pagina.png"
        imageAlt="Description of image"
        name="Diego Antonio Pi Arteaga"
        email="diego.antonio.pi.19@ull.edu.es"
      />
    </div>
  </main>
</template>

<style scoped>
.welcome-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
}

/* Make TheWelcome components take less space horizontally */
:deep(.welcome-container) {
  width: 300px;
  padding: 1rem;
}

/* Responsive behavior */
@media (max-width: 768px) {
  .welcome-row {
    flex-direction: column;
    align-items: center;
  }
}
</style>