/**** 全局组件注册 ***/
import Vue from 'vue'
// vue-3d-model
//import { ModelObj } from 'vue-3d-model'
// vue-grid-canvas
//import Grid from 'vue-grid-canvas'
// 粒子效果
import Nest from 'vue-atom-canvas'

// layout
import farSideBar from './layout/far-sideBar'
import farWorkSpace from './layout/far-workSpace'
import farFooter from './layout/far-footer'
// navmenu
import farNavMenu from './layout/far-navMenu.vue'
import farPopover from './layout/navmenu/far-popover'
import farUser from './layout/navmenu/far-user.vue'
import farIuputSearch from './layout/navmenu/far-popover'

// workspace
import wNavMenu from './workspace/w-navMenu.vue'
import wActiveArea from './workspace/w-activeArea.vue'
import wFrom from './workspace/w-from.vue'
import wTable from './workspace/w-table.vue'
import wDraw from './workspace/w-draw'
import wBom from './workspace/w-bom.vue'
// wNavMenu
import wNavOne from './workspace/wNavMenu/w-navOne.vue'
import wNavTwo from './workspace/wNavMenu/w-navTwo.vue'
import wNavThree from './workspace/wNavMenu/w-navThree.vue'
import wActiveAreaHeader from './workspace/wNavMenu/w-activeAreaHeader.vue'
// wDraw
import wDrawSpace from './workspace/wDraw/w-drawSpace.vue'
import wDrawControl from './workspace/wDraw/w-drawControl.vue'
// wBom
import wBomData from './workspace/wBom/w-bomData.vue'
// wTable
import wBomTable from './workspace/wTable/w-bomTable.vue'
import wMainBomTable from './workspace/wTable/w-mainBomTable.vue'

// 注册全局组件

// layout
Vue.component('NavMenu', farNavMenu)
Vue.component('SideBar', farSideBar)
Vue.component('WorkSpace', farWorkSpace)
Vue.component('AppFooter', farFooter)
Vue.component('Popover', farPopover)
Vue.component('User', farUser)
Vue.component('IuputSearch', farIuputSearch)

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
//wTable
Vue.component('wBomTable', wBomTable)
Vue.component('wMainBomTable', wMainBomTable)
// components
//Vue.component('wDrawControl', w-DrawControl)
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