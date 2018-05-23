// 改变的数据
import * as types from './mutation-types' // 引入所有为 types

export const mutations = {
  [types.LOGIN](state, data) {  // 登录  
    localStorage.setItem('token', data.token)
    state.token = data.token
    localStorage.setItem('username', data.name)
    state.username = data.name
  },
  [types.LOGINOUT](state) { // 登出
    localStorage.removeItem('token')
    state.token = ''
    localStorage.removeItem('username')
    state.username = ''
  },
  [types.ISCOLLAPSE](state) { // SideBar折叠
    localStorage.setItem('isCollapse', !state.isCollapse)
    state.isCollapse = !state.isCollapse
  },
  [types.SIDEBARINDEX](state,index) { // 获取SideBar index
    state.sideBarIndex = index
  },
  [types.OPENADDLAYER](state) { // 打开添加工序
    state.isOpenAddLayer = !state.isOpenAddLayer
  },
  [types.NAVINDEX](state,index) { // 获取主菜单index
    //console.log(index)
    localStorage.setItem('navIndex',index)
    state.navIndex = index
  },
  [types.MULTIMENUINDEX](state,index) { // 获取multiMenu index
    // type: icon0 text10 cell20 table30
    state.multiMenuIndex = {
      value: index,
      radom: Math.random() // 使 watch每次触发
    }  
  },
  [types.OBSERVERVALUES](state,value) { // 获取基础物料提交数据
    state.observerValues = value
  },
  [types.ISREADONLY](state) { // cell可编辑
    state.readonly = !state.readonly
  },
  [types.CARSCROLL](state,scrollTop) {
    state.carScroll = scrollTop
  }
}

export default mutations
