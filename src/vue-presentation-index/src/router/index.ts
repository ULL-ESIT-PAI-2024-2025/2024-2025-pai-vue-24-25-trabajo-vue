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
  ],
})

export default router
