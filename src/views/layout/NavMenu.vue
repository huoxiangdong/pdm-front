<template lang="pug">
  el-menu(:default-active="activeIndex" class="el-menu-demo" mode="horizontal")
    // 1 @click.native="isCollapse=!isCollapse" 点击事件，控制sidebar
    el-menu-item(index="1" @click.native="collapse()" id="center")
      template(slot="title") &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp处理中心&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
    // 2
    el-menu-item(index="2")
      template(slot="title") 我的工作台
      
    // 3
    el-menu-item(index="3")
      template(slot="title") 订单管理
    // 4 个人中心
    User
    // 消息
    Popover
      
</template>


<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      activeIndex: "1", // 菜单默认活动状态
      
    };
  },
  methods: {
    ...mapActions([
      'collapse', // sidebar激活状态
      //'userLoginOut'
    ]),
    /* loginOut() { // 登出
      this.userLoginOut();
      this.user.name = null; // name置null
      if (!this.$store.state.token) {
        this.$router.push("/auth/login");
        this.$message.success("登出成功");
      } else { this.$message.success("登出失败"); }
    } */
  }
  
};
</script>

<style lang="stylus">
#center 
  margin-right: 19px
</style>


