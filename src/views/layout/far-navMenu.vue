<template lang="pug">
  el-menu(
    :default-active="$route.path" 
    router
    class="el-menu-demo" 
    mode="horizontal"
    @select="handleSelect")
    // 1 @click.native="isCollapse=!isCollapse" 点击事件，控制sidebar
    el-menu-item(
      index="" 
      id="center"
      @click="collapse" 
      )
      template(slot="title") 处理中心
    // 2
    el-menu-item(index="/workspace/design")
      template(slot="title") 产品设计 
    // 3
    el-menu-item(index="")
      template(slot="title") 物料管理
    // 4 个人中心
    User
    // 消息
    Popover
      
</template>


<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      activeIndex: "1" // 菜单默认活动状态
    };
  },
  methods: {
    ...mapActions([
      "collapse" // sidebar激活状态
    ]),
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="stylus">
#center {
  margin-right: 19px;
}
</style>


