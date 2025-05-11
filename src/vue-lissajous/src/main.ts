/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * Archivo principal que crea y monta la App
 */

import './assets/style.css';
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.mount('#app')