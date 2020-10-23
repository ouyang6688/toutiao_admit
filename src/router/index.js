import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/login/index'
import Home from '@/views/home/index'
import Layout from '@/views/layout/index'

Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    name:'login',
    component: Login
  },
  {
    path: '/',
    // name:'layout',
    component: Layout,
    children:[
      {
        path: '',
        name:'home',
        component: Home
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
