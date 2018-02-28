/**** 全局组件注册 ***/
import Vue from 'vue'
// components
import Popover from './components/Popover.vue'
import User from './components/User.vue'
import IuputSearch from './components/IuputSearch.vue'

//layout
import NavMenu from './layout/NavMenu.vue'
import SideBar from './layout/SideBar.vue'
import WorkSpace from './layout/WorkSpace.vue'
import AppFooter from './layout/AppFooter.vue'
// workspace
import wNavMenu from './workspace/wNavMenu.vue'
import wActiveArea from './workspace/wActiveArea.vue'
import wFrom from './workspace/wFrom.vue'
import wTable from './workspace/wTable.vue'
import wDraw from './workspace/wDraw'
// wNavMenu
import wNavOne from './workspace/wNavMenu/wNavOne.vue'
import wNavTwo from './workspace/wNavMenu/wNavTwo.vue'
import wNavThree from './workspace/wNavMenu/wNavThree.vue'
import wActiveAreaHeader from './workspace/wNavMenu/wActiveAreaHeader.vue'
// wDraw
import wDrawSpace from './workspace/wDraw/wDrawSpace.vue'
// 注册全局组件
Vue.component('NavMenu', NavMenu)
Vue.component('SideBar', SideBar)
Vue.component('WorkSpace', WorkSpace)
Vue.component('AppFooter', AppFooter)
// workspace
Vue.component('wNavMenu',wNavMenu)
Vue.component('wActiveArea',wActiveArea)
Vue.component('wFrom', wFrom)
Vue.component('wTable',wTable)
Vue.component('wDraw', wDraw)
// wNavMenu
Vue.component('wNavOne', wNavOne)
Vue.component('wNavTwo', wNavTwo)
Vue.component('wNavThree', wNavThree)
Vue.component('wActiveAreaHeader',wActiveAreaHeader)
// wDraw
Vue.component('wDrawSpace', wDrawSpace)
// components
Vue.component('Popover', Popover)
Vue.component('User', User)
Vue.component('IuputSearch', IuputSearch)
