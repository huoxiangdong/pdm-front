import Vue from 'vue'
import Router from 'vue-router'
// 加载组件
import Home from '@/views/Home'
//import Register from '@/views/Register'
//import Login from '@/views/Login'

// test
//import NavMenu from '@/views/components/NavMenu'

// 注册路由
Vue.use(Router)

// 配置路由；发
//const router = new Router({
//  routes: [{
//      path: '/',
//      name: 'home',
//      // 路由元信息
//      meta: {
//         requireAuth: true // 添加该字段表示该路由需要登录
//         //skipAuth: true 略过验证
//        
//      },
//      component: Home,
//      children: []
//    }, {
//      path: '/login',
//      name: 'login',
//      component: Login
//    }, {
//      path: '/register',
//      name: 'register',
//      component: Register
//    }
//    // test
//   
//  ]
//}) // new Router

const routes = [
  { // 验证
    path: '/',
    redirect: '/home'
  },{ // 验证
    path: '/home',
    component: Home,
    children: []
  }, { // 验证
    path: '/auth',
    component: resolve => import('@/views/auth/AuthView').then(resolve),
    children: [{
      path: 'login',
      component: resolve => import('@/views/auth/Login').then(resolve)
    },{
      path: 'register',
      component: resolve => import('@/views/auth/register').then(resolve)
    }]
  }
]

// 设置路由拦截
// 第一次拦截 home--> beforeCreate () 第二次拦截
// 在vue-router的全局钩子中设置拦截
// 每个路由皆会的钩子函数
// to 进入 from 离开 next 传递
/* router.beforeEach((to, from, next) => {
  
  let token = localStorage.getItem('token')
  if (to.meta.requireAuth) {  // 如果访问的路由设置了 meta.requireAuth
    console.log('全局拦截')
    if (token) { // 如果有token继续
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
}) */

// 实例路由
const router = new Router({
  mode: 'history',
  routes
}) 

// 导出路由
export default router

