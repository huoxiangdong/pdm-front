<template lang="pug">
  // collapse="!isCollapse" 控制展开收起
      default-active="1-4-1" 
  transition(name="el-zoom-in-center")    
   el-menu(
     :default-active="$route.path" 
     router
     id="sidebar"
     :collapse="collapse" 
     @select="getIndex") 
     el-menu-item(
      :index="item.index"
      v-for="(item,index) in items" 
      :key="item.id")
        i(class="el-icon-menu")
        span(slot="title" v-text="item.title") 
</template>

<script>
import { mapState,mapActions } from 'vuex'
import Data from './SideBarTitle'
export default {
  data() {
     return { // 静态数据
       //titles: Data.Titles
     }
  },
  computed: { // 动态的数据要放在computed内
    ...mapState(['navIndex','sideBarIndex']),
    collapse(){ return this.$store.state.isCollapse },
    items:function(){
      let  { navIndex:index } = this
        if(index == 'index') {
           return Data.default
        }else if(index == '/workspace/design') {
          return Data.designTitle

        }else if(index == '/workspace/MaterialBill') {
          return Data.materialTitle
        }else {
          return Data.default
        }
    }
  },
  methods: {
    ...mapActions(['getSideBarIndex']),
      getIndex(index,indexPath) {
          this.getSideBarIndex(index)
          console.log(this.sideBarIndex)
          //this.$emit('setActiveItem',index)
      }
    },
}
</script>

<style lang="stylus">
#sidebar .el-submenu__title
   // background-color:#000
// 侧边菜单
 .el-aside
   //width:200px!important
   margin-top: 20px
   margin-left:20px
</style>
