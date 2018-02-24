<template lang="pug">
  el-menu(:default-active="activeIndex" class="el-menu-demo" mode="horizontal")
    // 1
    el-menu-item(index="1" @click.native="isCollapse=!isCollapse")
      template(slot="title") 处理中心
    // 2
    el-submenu(index="2")
      template(slot="title") 我的工作台
      el-menu-item(index="2-1") 选项1
      el-menu-item(index="2-2") 选项2
      el-menu-item(index="2-3") 选项3
    // 3
    el-menu-item(index="3")
      a(href="#" target="_blank") 订单管理
    // 4
    el-menu-item(index="4" :style="{float: 'right'}")
      router-link(v-show="!user.name" to="/auth/login") 登录
      el-dropdown(@command="loginOut")
        span(v-show="user.name") {{user.name}}
          img(src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png")
          i(class="el-icon-caret-bottom el-icon--right")

        el-dropdown-menu(slot="dropdown")
          el-dropdown-item command  个人中心
            i(class="iconfont icon-dengluzhanghao")
          
          el-dropdown-item command 个人中心
            i(class="iconfont icon-shezhi")
           
          el-dropdown-item command 退出登录
            i(class="iconfont icon-tuichu")
           
</template>


<script>
export default {
  data() {
    return {
      activeIndex: "1",
      user: { name: "" }
    };
  }
};
</script>

<style lang="stylus">
.el-menu--horizontal > .el-menu-item.is-active, .el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
  margin-right: 110px;
}
</style>
