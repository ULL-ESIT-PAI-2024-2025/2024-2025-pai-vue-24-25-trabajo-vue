<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/Header.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="80" height="80" />

    <div class="wrapper">
      <HelloWorld msg="Ejemplos de Vue" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to ="/button">Button</RouterLink>
        <RouterLink to ="/reactividad">Reactivity</RouterLink>
        <RouterLink to ="/names-pinia">Names Pinia</RouterLink>
        <RouterLink to="/figures">Figures</RouterLink>
        <RouterLink to ="/lissajous">Lissajous</RouterLink>
      </nav>
    </div>
  </header>

  <div class="content">
    <div class="view-container">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
header {
  line-height: 1.2;
  max-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: var(--color-background);
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 0.75rem 1rem;
}

.content {
  margin-top: 120px; /* Reduced from 180px */
  display: flex;
  justify-content: center;
  width: 100%;
}

.view-container {
  width: 100%;
  max-width: 1000px; /* Adjust as needed based on your content */
  padding: 0 1rem;
}

.logo {
  display: block;
  margin: 0 auto 0.75rem; /* Reduced from 2rem */
}

nav {
  width: 100%;
  font-size: 11px; /* Reduced from 12px */
  text-align: center;
  margin-top: 0.75rem; /* Reduced from 2rem */
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 0.75rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }

  .logo {
    margin: 0 1.5rem 0 0; /* Reduced from 2rem */
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 0.9rem; /* Reduced from 1rem */
    padding: 0.5rem 0; /* Reduced from 1rem */
    margin-top: 0.5rem; /* Reduced from 1rem */
  }
}
</style>