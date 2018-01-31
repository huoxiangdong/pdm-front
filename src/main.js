// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'

// element ui
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 拦截
import axios from './rest/interceptor.js'
Vue.prototype.$http = axios

// api 
import rest from './rest'
Vue.config.productionTip = false



Vue.use(Element)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  rest,
  components: { App },
  template: '<App/>'
})
