<script setup lang="ts">
import StudentImage from '../components/StudentImage.vue';
</script>

<template>
  <main>
    <h1>Page made by: </h1>
    <div class="welcome-row">
      <StudentImage 
        imageUrl="../../public/student-icon/joseaportillo-transparent.png"
        imageAlt="Image of the student Jose Angel"
        name="José Ángel Portillo García"
        email="jose.portillo.11@ull.edu.es"
      />
      <StudentImage 
        imageUrl="../../public/student-icon/alvaro-transparent.png"
        imageAlt="Image of the student Alvaro"
        name="Álvaro Pérez Ramos"
        email="alvaro.perez.ramos.23@ull.edu.es"
      />
      <StudentImage 
        imageUrl="../../public/student-icon/diego-transparent.png"
        imageAlt="Image of the student Diego"
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