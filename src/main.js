// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'

import './views/layout'

// element ui
import Element from 'element-ui'
//import 'element-ui/lib/theme-chalk/index.css'
import './assets/style/element-variables.scss'

// icon
import './assets/icon/iconfont.css'


// 拦截
import axios from './middleware/interceptor'
Vue.prototype.$http = axios

// api 
import rest from './middleware/rest'

Vue.config.productionTip = false



Vue.use(Element)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  rest,
  render: h => h(App)
  //components: { App },
  //template: '<App/>'
})
