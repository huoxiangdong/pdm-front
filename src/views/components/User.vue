<template lang="pug">
  el-menu-item(index="5" :style="{float: 'right'}")
      //  如果用户不存在，跳到登录
      router-link(v-show="!user.name" to="/auth/login") 登录
      // 个人中心
      el-dropdown(@command="loginOut" placement='bottom-start')
        span(v-show="user.name") {{user.name}}
          img(src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png")
          //i(class="el-icon-caret-bottom el-icon--right")
        // 下拉菜单
        el-dropdown-menu(slot="dropdown")
          el-dropdown-item 
            i(class="iconfont icon-dengluzhanghao") 
            i  个人中心
          el-dropdown-item 
            i(class="iconfont icon-shezhi") 
            i  设置
          el-dropdown-item(command)
            i(class="iconfont icon-tuichu") 
            i  退出登录
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      user: { name: "" }
    }
  },
  methods: {
    ...mapActions([
      'userLoginOut'
    ]),
    loginOut() { // 登出
      this.userLoginOut();
      this.user.name = null; // name置null
      if (!this.$store.state.token) {
        this.$router.push("/auth/login");
        this.$message.success("登出成功");
      } else { this.$message.success("登出失败"); }
    }
  },
  beforeCreate() {
    // 第二次拦截 当主页刷新时，如果服务端设置的token的时效到了的话，便会提示未登录
    if (this.$rest) {  // this.$rest 只读
      this.$rest.user
        .token() // 验证 token
        .then(res => { //console.log(this.$rest)
          if (!res.success) {
            this.userLoginOut();
            this.$message.error(res.message); // Cannot set property 'type' of undefined
            this.user.name = null;
          } else {
            let username = localStorage.getItem("username");
            if (username) {
              this.user.name = username;
            }
          }
        })
        .catch(err => { this.$message.error(`${err.message}`, "ERROR!"); }); //console.log(err);
    }
  }
}
</script>

<style lang="stylus">
// 用户头像
.el-dropdown > span > img 
  width: 20px
  height: 20px
  margin-bottom: 5px;
</style>
