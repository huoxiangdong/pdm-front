import * as types from './mutation-types'

const actions = {
  // es6 函数写法
  // this.userLogin(res.data) --> data = { name: user.name,token: createToken(user.name)}
  userLogin({ commit }, data) { commit(types.LOGIN, data) }, // 登录

  userLoginOut({ commit }) { commit(types.LOGINOUT) }, // 登出

  isCollapse({ commit }) { commit(types.ISCOLLAPSE) }, // sidebar折叠

  sideBarTitle({ commit }) { commit(types.SIDEBARTITLE) }, // sidebar菜单

  openAddLayer({ commit }) { commit(types.OPENADDLAYER) },

  setNavIndex( {commit },index) { commit(types.NAVINDEX,index) } // 获取主菜单index


}

export default actions
