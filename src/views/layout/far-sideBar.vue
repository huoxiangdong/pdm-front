<template lang="pug">
  // collapse="!isCollapse" 控制展开收起
      default-active="1-4-1" 
  transition(name="el-zoom-in-center")    
   el-menu(
     id="sidebar"
     :collapse="collapse" 
     @select="handleSelect"
     ) 
     template(v-for="(item,index) in sideBarTitle" )
      el-menu-item(:index="String(index)")
        i(class="el-icon-menu")
        span(slot="title" ) {{ item }}
      //el-menu-item(index="2")
        i(class="el-icon-menu")
        span(slot="title") {{ item }}
     //el-menu-item(index="3")
       i(class="el-icon-setting")
       span(slot="title") {{collapse}}
</template>

<script>
import { mapState,mapActions } from 'vuex'
import Data from './sideBar/far-sideBarTitle'
export default {
  data() {
     return { // 静态数据
       title: null
     }
  },
  computed: { // 动态的数据要放在computed内
    ...mapState(['sideBarTitle']),
    collapse(){ return this.$store.state.isCollapse }
  },
  methods: {
    //...mapActions(['sideBarTitle']),
      handleSelect(index,indexPath) {
          console.log(index)
          this.$emit('setActiveItem',index)
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
