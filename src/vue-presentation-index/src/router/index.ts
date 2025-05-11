/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Programación de Aplicaciones Web
 * 
 * @author: Jose Angel Portillo Garcia
 * @file: index.ts
 * @description: Index del router de la aplicación, donde se gestionan todas las direcciones
 * @date: 10 MAY 2025
 */

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/figures',
      name: 'figures',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/FiguresView.vue'),
    },
    {
      path: '/names-pinia',
      name: 'names-pinia',
      component: () => import('../views/NamePiniaView.vue'),
    },
    {
      path: '/reactividad',
      name: 'reactividad',
      component: () => import('../views/ReactividadView.vue'),
    },
  ],
})

export default router
