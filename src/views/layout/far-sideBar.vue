<template lang="pug">
  // collapse="!isCollapse" 控制展开收起
      default-active="1-4-1" 
  transition(name="el-zoom-in-center")    
   el-menu(
     id="sidebar"
    
     :collapse="collapse" 
     @select="handleSelect"
     ) 
     el-menu-item(index="1")
       i(class="el-icon-menu")
       span(slot="title") BOM
     el-menu-item(index="2")
       i(class="el-icon-menu")
       span(slot="title") 电缆设计
     el-menu-item(index="3")
       i(class="el-icon-setting")
       span(slot="title") {{collapse}}
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
     return { // 静态数据
       
       //isCollapse: this.$store.state.isCollapse
     }
  },
  computed: { // 动态的数据要放在computed内
    //...mapState(['isCollapse'])
    collapse(){ return this.$store.state.isCollapse }
  },
  methods: {
      handleSelect(index,indexPath) {
          this.$emit('setActiveItem',index)
      }
    }
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
