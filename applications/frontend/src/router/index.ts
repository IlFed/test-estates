import { createRouter, createWebHistory } from 'vue-router';
import EstatesPage from '@/views/EstatesPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/estates',
    },
    {
      path: '/estates',
      name: 'Estates',
      component: EstatesPage,
    },
  ],
});

export default router;
