import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home' // 加载组件


// import { navbars } from '@/config/navbar'

//  var children = []
//  const test =  navbars.map(item => {
//  if(item.level == 2) {
//   let obj = {
//     path: 
//   }
//  }

//     //item.path = item.path || item.index
//     //item.component = item.level==1 && (resolve => import(`@/views${item.comp}`).then(resolve) )
   
  
//   return {
//     path: item.path || item.index,
//     component: item.level==1 && (resolve => import(`@/views${item.comp}`).then(resolve) ),
//     children: children
//   }
// })
// console.log(test)
Vue.use(Router)  // 注册路由
//const routes = test.filter(item => item != undefined)
const routes = [ { // 验证
  path: '/',
  component: home,
// 路由元信息
meta: {
requireAuth: true, // 添加该字段表示该路由需要登录,路由验证
//skipAuth: true //略过验证
},
  children: [{
    path:'/Evolution',
    component: () => import("@/views/evolution/index.js")
  },{
    path:'/Report', component: () => import('@/views/layout/report/main')
  },{
    path:'/layout', component: () => import('@/views/packages/layout/index.vue')
  },{
    path: '/WorkSpace',
    component: () => import ('@/views/layout/workspace/workspace'),
    children: [{
      name: 'Design',
      path: 'Design',
      component: () => import ('@/views/layout/workspace/draw/draw')
    },{
      name: 'Bom',
      path: 'Bom',
      component: () => import ('@/views/layout/workspace/design/bom/main')
    },{
      name: 'Partially',
      path: 'Partially',
      component: () => import ('@/views/layout/workspace/design/partially/main')
    }, {
      name: 'MaterialBill',
      path: 'MaterialBill',
      component: () => import ('@/views/layout/workspace/material/material-bill')
    },{
      name: 'Material',
      path: 'Material',
      component: () => import ('@/views/layout/workspace/material/main')
    },{
      name: 'ProcessCard',
      path: 'ProcessCard',
      component: () => import ('@/views/layout/workspace/material/process-card')
    }]
  }]
}, { // 验证
  path: '/auth',
  component: () => import('@/views/auth/auth'),
  children: [{
    path: 'login',
    component: () => import ('@/views/auth/login')
  }, {
    path: 'register',
    component: () => import ('@/views/auth/register')
  }]
}, ]

// 实例路由
const router = new Router({
  mode: 'history',
  routes, // 传入路由配置
  scrollBehavior: (to, from, saved) => {
    if (saved) {
      return saved
    } else if (to.hash) { 
      console.log(to)
      return {
        selector: to.hash
      }
    } else {
      return { x: 0, y: 0 }
    }
  }
})

// 设置路由拦截
// 第一次拦截 home--> beforeCreate () 第二次拦截
// 在vue-router的全局钩子中设置拦截
// 每个路由皆会的钩子函数
// to 进入 from 离开 next 传递
router.beforeEach((to, from, next) => {
  console.log(router)
  //console.log(to.path.match(/.*\/index?$/i))
  //console.log(to)
  // to.path.match(/.*\/index$/i)
  if (to.path.match(/disabled|.*\/index$/g)) { // . ->匹配任意字符 \/ ->转义 * ->全匹配 ? ->匹配字符串 $ ->结尾
    next(false)
  } else if (to.meta.requireAuth) { // 如果访问的路由设置了 meta.requireAuth
    let token = localStorage.getItem('token')
    if (token) {  
      next() } else {
        next({
          path: '/auth/login',
          query: {
            redirect: to.fullPath
          }
        })
      }
  } else {
    next()
  }
})

// 导出路由
export default router
