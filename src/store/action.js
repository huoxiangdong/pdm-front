import * as types from './mutation-types'

const actions = {
    // this.userLogin(res.data) --> data = { name: user.name,token: createToken(user.name)}
    userLogin ({commit},data) {
        //console.log(data)
        commit(types.LOGIN,data)
    },
    userLoginOut({commit}) {
        commit(types.LOGINOUT)
    }
}


export default actions