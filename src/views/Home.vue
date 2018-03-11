<template lang="pug">
  // 布局:
                                          -----  el-header
                                          -- --  el-aside  el-main
                                          -----  el-footer
  div
    el-container
      el-header
        NavMenu(菜单)
      // 中
      el-container
        el-aside
          side-bar(侧边菜单)
        el-main
          WorkSpace(工作区)
      // 底
      //el-footer
        AppFooter
</template>

<script>
//import { mapActions } from "vuex";
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      //user: { name: "" }
    };
  },
 /*  methods: {
    ...mapActions(["userLoginOut"]),
    loginOut() { // 登出
      this.userLoginOut();
      this.user.name = null; // name置null
      if (!this.$store.state.token) {
        this.$router.push("/auth/login");
        this.$message.success("登出成功");
      } else { this.$message.success("登出失败"); }
    }
  }, */
 /*  beforeCreate() {
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
  } */
}
</script>

<style lang="stylus">

</style>

