import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import EventDetailView from '../views/EventDetailView.vue'
import RegisterView from '../views/RegisterView.vue'

const routes = [
  {
    path: '/',
    name: 'events',
    component: EventListView
  },
  {
    path: '/events/:id/register',
    name: 'event-register',
    component: RegisterView
  },
  {
    path: '/events/:id',
    name: 'event-detail',
    component: EventDetailView
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router