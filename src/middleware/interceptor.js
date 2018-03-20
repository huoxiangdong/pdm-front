// 拦截请求
import axios from 'axios'
import router from '@/router'

// 超时
axios.default.timeout = 5000
// 请求头
axios.defaults.headers.post['Content-Type'] = 'application/json'

// axios拦截请求
axios.interceptors.request.use(
  config => {
    //console.log(config)
    // 判断localStorage是否存在token，如果存在的话，则每个http header都加上token
    
    if (localStorage.getItem('token')) {
      config.headers.Authorization = `token ${localStorage.getItem('token')}`
        .replace(/(^")|("$)/g, '')
    } else {
      console.log(localStorage.getItem('token'))
      router.replace({
        path: '/auth/login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

// axios拦截响应
 axios.interceptors.response.use(response => {
  //response.config.url.match(/^\/api\/(register|login|token).*/g)
   
  if(response.config.url.match(/^\/api\/(register|login|token).*/g)) {
    if (!response.data.token) { // 后端的checkLogin返回的json数据作为跳转依据
       router.replace({
        path: 'login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      }) 
    }
  }
  return response
}, err => {
  return Promise.reject(err)
}) 

export default axios

