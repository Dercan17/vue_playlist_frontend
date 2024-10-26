import { createRouter, createWebHistory } from 'vue-router'
import ShowPlayListComponent from '@/components/ShowPlayListComponent.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ShowPlayListComponent
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ]
})

export default router
