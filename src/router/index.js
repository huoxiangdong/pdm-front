import Vue from 'vue'
import Router from 'vue-router'
// 引入组件
import Home from '@/views/Home'
import Register from '@/views/Register'
import Login from '@/views/Login'
import lo from '@/views/lo'

// 注册路由
Vue.use(Router)

// 配置路由
const router = new Router({
  routes: [
  {
    path: '/',
    name: 'home',
    // 路由元信息
    meta: {
      requireAuth: true // 添加该字段表示该路由需要登录
    },
    component: Home
  }
  ,{
    path: '/login',
    name: 'login',
    component: Login
  }
  ,{
    path: '/register',
    name: 'register',
    component: Register
  }
  // test
  ,{
    path: '/lo',
    name: 'lo',
    component: lo
  }
]
})  // new Router



// 设置路由拦截
// 在vue-router的全局钩子中设置拦截
// 每个路由皆会的钩子函数
// to 进入 from 离开 next 传递
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  if (to.meta.requireAuth) {
    if (token) {
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})

export default router

