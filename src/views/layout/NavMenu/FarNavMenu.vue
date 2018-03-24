<template lang="pug">
  el-menu(
    :default-active="$route.path" 
    router
    class="el-menu-demo" 
    mode="horizontal"
    @select="handleSelect")
    // 1 @click.native="isCollapse=!isCollapse" 点击事件，控制sidebar
    el-menu-item(
      :index="item.index"
      v-for="(item,index) in items" 
      :key="item.id")
      template(slot="title") {{ item.title }}
    //el-menu-item(index="/workspace/design")
      template(slot="title") 产品设计
    //el-menu-item(index="/workspace/material")
      template(slot="title") 物料管理
    // 4 个人中心
    far-user
    // 消息
    Popover
      
</template>


<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      //activeIndex: "index" // 菜单默认活动状态
      /* items: {
         index:['index','/workspace/design','/workspace/material'],
         title:['处理中心','产品管理','物料管理']
      } */
      items: [
        {
          title: "处理中心",
          index: "index"
        },
        { 
          title: "产品管理", 
          index: "/workspace/design" 
          },
        { 
          title: "物料管理", 
          index: "/workspace/MaterialBill" 
          }
      ]
    };
  },
  computed: {
    ...mapState(["navIndex"])
  },
  methods: {
    ...mapActions([
      "isCollapse", // sidebar激活状态
      "getNavIndex"
    ]),
    handleSelect(key, keyPath) {
      this.getNavIndex(key)
      console.log(key)
      if(key === 'index') {
           this.isCollapse()
      }
    }
  }
};
</script>

<style lang="stylus">
#center {
  margin-right: 19px;
}
</style>


