import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/login/index'
import Home from '@/views/home/index'
import Layout from '@/views/layout/index'
import Article from '@/views/article/index'
import Publish from '@/views/publish/index'
import Image from '@/views/image/index'
import Comment from '@/views/comment/index'
import Melog from '@/views/log/index'

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
      },
      {
        path: '/article',
        name:'article',
        component: Article
      },
      {
        path: '/publish',
        name:'publish',
        component: Publish
      },
      {
        path: '/image',
        name:'image',
        component: Image
      },
      {
        path: '/comment',
        name:'comment',
        component: Comment
      },
      {
        path: '/melog',
        name:'melog',
        component: Melog
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

// 路由导航守卫：说白了所有页面的导航都会经过这里
// 守卫页面的导航的
// to：要去的路由信息
// from：来自哪里的路由信息
// next：放行方法
router.beforeEach((to, from, next) => {
  const user = JSON.parse(window.localStorage.getItem('user'))

  // 校验非登录页面的登录状态
  if (to.path !== '/login') {
    if (user) {
      // 已登录，允许通过
      next()
    } else {
      // 没有登录，跳转到登录页面
      next('/login')
    }
  } else {
    // 登录页面，正常允许通过
    next()
  }
})

export default router
