<template>
  <div>
    <!-- logo -->
    <div class="logo">
      <img src="../assets/logo.png" alt="">
    </div>
    <!-- 登录 -->
    <el-card class="box-card">
      <el-form :model="formLogin" :rules="rules" ref="formLogin">
        <!-- $refs 只在组件渲染完成后才填充，并且它是非响应式的。它仅仅作为一个直接访问子组件的应急方案——应当避免在模版或计算属性中使用 $refs 。 -->
        <el-form-item label="账号" prop="name" prefix-icon="">
          <el-input v-model="formLogin.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="formLogin.password"></el-input>
        </el-form-item>
        <!-- <el-form-item label="确认密码:" prop="checkPassword">
            <el-input v-model="formLogin.checkPassword"></el-input>
          </el-form-item> -->
        <!-- 站位 -->
        <el-form-item></el-form-item>

        <el-form-item>
          <el-button type="success" size="medium" @click="login">登录</el-button>
          <!-- <el-button @click="resetForm">取消</el-button> -->
        </el-form-item>
        <el-form-item></el-form-item>
        <!--  <el-form-item>
            <span style="cursor:pointer;" @click="GoGithub">
              <i class="el-icon-fa-github"></i>
            </span>
          </el-form-item> -->
        <el-form-item>
          <router-link to="/register"> <!-- 路由跳转到注册页 -->
            <el-button plain size="small">没有账号，立即注册
              <i class="el-icon-arrow-right el-icon--right"></i>
            </el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>


<script type="text/javascript">
  // 引入vuex /src/helper.js中的辅助函数，
  // 将actions中的方法直接转为组件中的方法
  import { mapActions } from 'vuex'

  export default {
    data () {
      let checkUserName = (rule, value, cb) => {
        if (!value) {
          return cb(new Error('账户不能为空!'))
        } else {
          cb() // 将判断传递给后面
        }
      } // 判断账号
      let checkPassword = (rule, value, cb) => {
        if (!value) {
          return cb(new Error('密码不能为空!'))
        } else {
          cb()
        }
      } // 判断密码
      /* let checkPasswordAgain = (rule, value, cb) => {
        if (!value) {
          return cb(new Error('再次输入密码不能为空!'))
        } else if (value !== this.formLogin.password) {
          return cb(new Error('两次输入密码不一致!'))
        } else {
          cb()
        }
      } */
      return {
        /* 表单数据初始化 */
        formLogin: {
          name: '',
          password: '',
          //checkPassword: ''
        },
        rules: {
          name: [{
            validator: checkUserName, // 验证方式
            trigger: 'blur'  // 失去焦点触发
          }],
          password: [{
            validator: checkPassword,
            trigger: 'blur'
          }]
          /* checkPassword: [{
            validator: checkPasswordAgain,
            trigger: 'blur'
          }] */
        }
      }
    },
    methods: {
      ...mapActions(['userLogin']),
      // 向登录接口发起请求
      login () {
        let user = this.formLogin
        let formData = {
          name: user.name,
          password: user.password
        }
        // 表单验证
        this.$refs['formLogin'].validate((valid) => {
          if (valid) {
            // 通过验证之后才请求登录接口
            // 表单验证通过--> config:user.login --> /api/login
            this.$rest.user.login(formData).then(res => { 
              
              if (res.success) {
                //console.log(this.userLogin)
                this.userLogin(res.data) // store 本地存储token
                
                this.$message.success(res.message)
                
                // 登录成功 跳转至首页
                this.$router.push('/')
              } else {
                this.$message.error(res.message)
                return false
              }
            })
            .catch(err => {
             console.log(err)
             this.$message.error(`本地没有token!`, 'ERROR!')
            })
          } else {
            this.$message.error('请输入账号、密码!')
            return false
          }
        })
        
      },

      // 表单重置
      resetForm () {
        this.$refs['formLogin'].resetFields()
      }
    }
  }

</script>

<style>
/* 背景色 */
body {
  background-color: #f9f9f9;
}
/* logo */
.logo{
  margin:50px auto;
}

.el-card {
  margin: 0 auto;
  /* margin-top: 3%; */
  width: 300px;
}
/* 登录字体 */
.el-form-item__label {
  font-size: 16px;
  font-weight: bold;
  color: #000
}
/* 登录按钮 */
.el-button--medium, .el-button--medium.is-round{
  width:100%
}
/* 输入框 */
.el-input .el-input__inner{
  height: 36px;
}
.el-form-item__content{
 
  line-height: 36px;
}



</style>

