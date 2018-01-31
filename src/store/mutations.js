import * as types from './mutation-types'

export const mutations = {
    [types.LOGIN] (state,data) {
        //console.log(data.token)
        localStorage.setItem('token',data.token)
        state.token = data.token
        localStorage.setItem('username',data.name)
        state.username = data.name
    },
    [types.LOGINOUT] (state) {
        localStorage.removeItem('token')
        state.token = null
        localStorage.removeItem('username')
        state.username = null
    }
}

export default mutations