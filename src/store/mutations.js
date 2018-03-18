// 改变的数据
import * as types from './mutation-types'

export const mutations = {
  // 登录
  [types.LOGIN](state, data) {  
    localStorage.setItem('token', data.token)
    state.token = data.token
    localStorage.setItem('username', data.name)
    state.username = data.name
  },
  // 登出
  [types.LOGINOUT](state) {
    localStorage.removeItem('token')
    state.token = ''
    localStorage.removeItem('username')
    state.username = ''
  },
  // SideBar折叠
  [types.ISCOLLAPSE](state) {
    state.isCollapse = !state.isCollapse
  },
  // SideBar菜单
  [types.SIDEBARTITLE](state,titles) {
     state.sidebartitle.push(titles)
  },
  // 打开添加工序
  [types.OPENADDLAYER](state) {
    state.isOpenAddLayer = !state.isOpenAddLayer
  },
  // 获取主菜单index
  [types.NAVINDEX](state,index) {
    //console.log(index)
    state.navIndex = index
  },
  // 获取navtwo key
  [types.NAVTWOKEY](state,key) {
    state.navTwoKey = key
  }
}

export default mutations
