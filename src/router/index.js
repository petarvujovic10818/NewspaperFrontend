import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "about" */ '../views/Admin.vue')
  },
  {
    path: '/new-user',
    name: 'NewUser',
    component: () => import(/* webpackChunkName: "about" */ '../views/NewUser.vue')
  },
  {
    path: '/new-news',
    name: 'NewNews',
    component: () => import(/* webpackChunkName: "about" */ '../views/NewNews.vue')
  },
  {
    path: '/user/:email',
    name: 'EditUser',
    component: () => import(/* webpackChunkName: "about" */ '../views/EditUser.vue')
  },
  {
    path: '/categories',
    name: 'Kategorije',
    component: () => import(/* webpackChunkName: "about" */ '../views/Kategorije.vue')
  },
  {
    path: '/new-category',
    name: 'NewCategory',
    component: () => import(/* webpackChunkName: "about" */ '../views/NewCategory.vue')
  },
  {
    path: '/new/:id',
    name: 'EditNews',
    component: () => import(/* webpackChunkName: "about" */ '../views/EditNews.vue')
  },
  {
    path: '/category/:id',
    name: 'EditCategory',
    component: () => import(/* webpackChunkName: "about" */ '../views/EditCategory.vue')
  },
  {
    path: '/home/:name',
    name: 'Home',
    component: Home
  },
  {
    path: '/preview/:id',
    name: 'PreviewNews',
    component: () => import(/* webpackChunkName: "about" */ '../views/PreviewNews.vue')
  },
  {
    path: '/add-comment/:id',
    name: 'AddComment',
    component: () => import(/* webpackChunkName: "about" */ '../views/AddComment.vue')
  },
  {
    path: '/homepage',
    name: 'HomePage',
    component: () => import(/* webpackChunkName: "about" */ '../views/HomePage.vue')
  },
  {
    path: '/najcitanije',
    name: 'Najcitanije',
    component: () => import(/* webpackChunkName: "about" */ '../views/Najcitanije.vue')
  },
  {
    path: '/news/:tag',
    name: 'FilterByTags',
    component: () => import(/* webpackChunkName: "about" */ '../views/FilterByTags.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
