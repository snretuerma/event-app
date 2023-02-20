import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Events',
    component: () => import(/* webpackChunkName: "events" */ '../views/EventView.vue')
  },
  {
    path: '/calendar',
    name: 'Calendar View',
    component: () => import(/* webpackChunkName: "events" */ '../views/CalendarView.vue')
  },
  {
    path: '/users',
    name: 'Users',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "users" */ '../views/UserView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
