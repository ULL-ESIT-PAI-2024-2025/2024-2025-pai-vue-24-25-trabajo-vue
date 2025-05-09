<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <!-- Fixed header at the top -->
    <nav class="navbar is-light is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item">
            <img alt="Vue logo" src="@/assets/logo.svg" height="28">
          </a>
          
          <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navMenu">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navMenu" class="navbar-menu">
          <div class="navbar-start">
            <RouterLink to="/" class="navbar-item">Home</RouterLink>
            <RouterLink to="/about" class="navbar-item">About</RouterLink>
            <RouterLink to="/game" class="navbar-item">Hang Man</RouterLink>
          </div>
          
          <div class="navbar-end">
            <div class="navbar-item">
              <HelloWorld msg="You did it!" />
            </div>
          </div>
        </div>
      </div>
    </nav>
    
    <!-- Add padding to body to prevent content from hiding under fixed navbar -->
    <div style="padding-top: 52px;">
      <RouterView />
    </div>
  </div>
</template>

<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";

/* Custom styles for navbar */
.navbar-item.router-link-exact-active {
  background-color: #f5f5f5;
  color: #3273dc;
  font-weight: bold;
}

/* Fix for logo sizing */
.navbar-item img {
  max-height: 28px;
}

/* Custom container padding for better spacing */
.container {
  padding: 0 1rem;
}
</style>