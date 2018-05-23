import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import * as getters from './getters'
// 注册
Vue.use(Vuex)

const state = {
  token: null,
  username: '',
  isCollapse: false,
  isOpenAddLayer: false,
  navIndex:'',
  sideBarIndex: '',
  multiMenuIndex: {},
  observerValues:'', // 基础物料提交数据
  readonly: true,
  carScroll: 0 // carousel滚动高度
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
