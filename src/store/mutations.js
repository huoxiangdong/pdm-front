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
  [types.COLLAPSE](state) {
    state.isCollapse = !state.isCollapse
  }
}

export default mutations
