import * as types from './mutation-types'

const actions = {
  // es6 函数写法
  // this.userLogin(res.data) --> data = { name: user.name,token: createToken(user.name)}
  userLogin({ commit }, data) { commit(types.LOGIN, data) },
  userLoginOut({ commit }) { commit(types.LOGINOUT) },
  collapse({commit}) { commit(types.COLLAPSE) },
  openAddLayer({commit}) { commit(types.OPENADDLAYER) }
}

export default actions
