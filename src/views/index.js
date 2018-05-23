/**** 全局组件注册 ***/
import Vue from 'vue'
// 指令
import drag from './packages/directive/drag'

// layout
import NavMenu from './layout/nav/nav'
import Popover from './layout/nav/popover'
import User from './layout/nav/user'
import Search from './layout/nav/search' // navmenu
import SideBar from './layout/sidebar/sidebar'
import WorkSpace from './layout/workspace/workspace'
import xFooter from './layout/footer'
// workspace
//import xNavMenu from './layout/workspace/nav/nav'
//import NavOne from './layout/workspace/nav/nav-one.vue'
//import NavTwo from './layout/workspace/nav/nav-two.vue'
//import NavThree from './layout/workspace/nav/nav-three.vue' // wNavMenu
// packages
import xCard from './packages/card'
import xTable from './packages/table'
import multiMenu from './packages/multi-menu'
// plugin
//import ContextMenu from './packages/contextmenu' // ie 报错
// 


const components = [

  //
  NavMenu,
  Popover,
  User,
  Search,
  SideBar,
  WorkSpace,
  xFooter,
  //
  xCard,
  xTable,
  multiMenu
];

components.map(component => {
    Vue.component(component.name, component);
  });

//Vue.prototype.$contextmenu = ContextMenu;

Vue.directive('drag',drag)

Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
  