import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/list',
      name: 'List',
      component: () => import('../views/ListView.vue'),
    },
    {
      path: '/detail',
      name: 'Detail',
      component: () => import('../views/DetailView.vue'),
    },
    {
      path: '/detail/:id',
      name: 'DetailWithId',
      component: () => import('../views/DetailView.vue'),
    },
    {
      path: '/publish',
      name: 'Publish',
      component: () => import('../views/PublishView.vue'),
    },
    {
      path: '/message',
      name: 'Message',
      component: () => import('../views/MessageView.vue'),
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/ProfileView.vue'),
    },
    {
      path: '/board',
      name: 'Board',
      component: () => import('../views/BoardView.vue'),
    },
  ],
})

export default router
