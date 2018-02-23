import * as types from './mutation-types'

export const mutations = {
  [types.LOGIN](state, data) {
    localStorage.setItem('token', data.token)
    state.token = data.token
    localStorage.setItem('username', data.name)
    state.username = data.name
  },
  [types.LOGINOUT](state) {
    localStorage.removeItem('token')
    state.token = ''
    localStorage.removeItem('username')
    state.username = ''
  }
}

export default mutations
