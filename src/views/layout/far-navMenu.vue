<template lang="pug">
  el-menu(
    :default-active="$route.path" 
    router
    class="el-menu-demo" 
    mode="horizontal"
    @select="handleSelect")
    // 1 @click.native="isCollapse=!isCollapse" 点击事件，控制sidebar
    el-menu-item(
      index
      id="center"
      @click="isCollapse" 
      )
      template(slot="title") 处理中心
    // 2
    el-menu-item(index="/workspace/design")
      template(slot="title") 产品设计 
    // 3
    el-menu-item(index="/workspace/material")
      template(slot="title") 物料管理
    // 4 个人中心
    User
    // 消息
    Popover
      
</template>


<script>
import { mapState,mapActions } from "vuex";
export default {
  data() {
    return {
      activeIndex: "1" // 菜单默认活动状态
    };
  },
  computed: {
      ...mapState(['navIndex'])
  },
  methods: {
    ...mapActions([
      "isCollapse", // sidebar激活状态
      "setNavIndex"
    ]),
    handleSelect(key, keyPath) {
      //console.log(this.$route.name)
      this.setNavIndex(this.$route.name)
      //console.log(this);
      //console.log(this.navIndex)
    }
  }
};
</script>

<style lang="stylus">
#center {
  margin-right: 19px;
}
</style>


