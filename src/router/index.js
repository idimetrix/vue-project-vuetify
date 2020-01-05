import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/users',
    name: 'users',
    component: () => import(/* webpackChunkName: "users" */ '../views/Users')
  },
  {
    path: '/posts',
    name: 'posts',
    component: () => import(/* webpackChunkName: "posts" */ '../views/Posts')
  },
  {
    path: '/comments',
    name: 'comments',
    component: () => import(/* webpackChunkName: "comments" */ '../views/Comments')
  },
  {
    path: '/albums',
    name: 'albums',
    component: () => import(/* webpackChunkName: "albums" */ '../views/Albums')
  },
  {
    path: '/photos',
    name: 'photos',
    component: () => import(/* webpackChunkName: "photos" */ '../views/Photos')
  },
  {
    path: '/page1',
    name: 'page1',
    component: () => import(/* webpackChunkName: "page1" */ '../views/Page1')
  },
  {
    path: '/page2',
    name: 'page2',
    component: () => import(/* webpackChunkName: "page2" */ '../views/Page2')
  },
  {
    path: '/page3',
    name: 'page3',
    component: () => import(/* webpackChunkName: "page3" */ '../views/Page3')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
