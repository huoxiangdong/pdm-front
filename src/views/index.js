/**** 全局组件注册 ***/
import Vue from 'vue'
// vue-3d-model
//import { ModelObj } from 'vue-3d-model'
// vue-grid-canvas
//import Grid from 'vue-grid-canvas'
// 粒子效果
import Nest from 'vue-atom-canvas'
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
import wBom from './workspace/wBom.vue'
// wNavMenu
import wNavOne from './workspace/wNavMenu/wNavOne.vue'
import wNavTwo from './workspace/wNavMenu/wNavTwo.vue'
import wNavThree from './workspace/wNavMenu/wNavThree.vue'
import wActiveAreaHeader from './workspace/wNavMenu/wActiveAreaHeader.vue'
// wDraw
import wDrawSpace from './workspace/wDraw/wDrawSpace.vue'
import wDrawControl from './workspace/wDraw/wDrawControl.vue'
// wBom
import wBomData from './workspace/wBom/wBomData.vue'

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
Vue.component('wBom', wBom)
// wNavMenu
Vue.component('wNavOne', wNavOne)
Vue.component('wNavTwo', wNavTwo)
Vue.component('wNavThree', wNavThree)
Vue.component('wActiveAreaHeader',wActiveAreaHeader)
// wDraw
Vue.component('wDrawSpace', wDrawSpace)
//wBom
Vue.component('wBomData', wBomData)
// components
Vue.component('Popover', Popover)
Vue.component('User', User)
Vue.component('IuputSearch', IuputSearch)
Vue.component('wDrawControl', wDrawControl)
// 粒子效果
Vue.component('Nest', Nest)

// vue-3d-model
//Vue.component('ModelObj', ModelObj)
// vue-grid-canvas
//Vue.component('Grid', Grid)


// 引入样式
//import 'vue-easytable/libs/themes-base/index.css'
// 导入 table 和 分页组件
//import {VTable,VPagination} from 'vue-easytable'

// 注册到全局
//Vue.component(VTable.name, VTable)
//Vue.component(VPagination.name, VPagination)