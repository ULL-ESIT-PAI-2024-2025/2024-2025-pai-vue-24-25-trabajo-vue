<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="app-wrapper">
    <!-- Bulma Navbar -->
    <nav class="navbar is-primary is-fullwidth" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <RouterLink to="/" class="navbar-item">
          <img alt="Vue logo" src="@/assets/logo.svg" width="28" height="28" />
        </RouterLink>

        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu">
        <div class="navbar-start">
          <RouterLink to="/" class="navbar-item">Home</RouterLink>
          <RouterLink to="/about" class="navbar-item">About</RouterLink>
          <RouterLink to="/game" class="navbar-item">Hang Man</RouterLink>
        </div>
      </div>
    </nav>

    <div class="full-page-content">
      <RouterView />
    </div>
  </div>
</template>

<style>
/* Import Bulma from CDN */
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";

/* Additional custom styles */
.navbar-item.router-link-exact-active {
  background-color: rgba(255, 255, 255, 0.2);
}

/* Full page layout */
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

/* Make navbar fill the full width */
.navbar.is-fullwidth {
  width: 100%;
  max-width: 100%;
  padding-left: 0;
  padding-right: 0;
}

.full-page-content {
  flex: 1;
  padding: 0;
  width: 100%;
  max-width: none;
  display: flex;
  flex-direction: column;
}

/* Remove default padding from sections if needed */
.section {
  padding: 0;
}

/* Override container constraints when needed */
.container.is-fluid {
  max-width: none;
  width: 100%;
  padding: 0;
}

/* Ensure no margin or padding on html/body */
html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}
</style>