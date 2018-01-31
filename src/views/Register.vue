<template>
  <div>
      <!-- logo -->
    <div class="logo">
      <img src="../assets/logo.png" alt="">
    </div>
<el-card class="box-card">
   
        <el-form  :model="formRegister" :rules="rules" ref="formRegister">
          <el-form-item label="请输入账号" prop="name">
            <el-input v-model="formRegister.name"></el-input>
          </el-form-item>
          <el-form-item label="请输入密码" prop="password">
            <el-input v-model="formRegister.password"></el-input>
          </el-form-item>
          <el-form-item label="请确认密码" prop="checkPassword">
            <el-input v-model="formRegister.checkPassword"></el-input>
          </el-form-item>
          <el-form-item></el-form-item>
          <el-form-item>
            <el-button type="success" size="medium" @click="addUser">立即注册</el-button>
            <!-- <el-button>取消</el-button> -->
          </el-form-item>
        </el-form>
     
  </el-card>


  </div>
</template>

<script type="text/javascript">
  export default {
    data () {
      let checkUserName = (rule, value, cb) => {
        if (!value) {
          return cb(new Error('账户不能为空!'))
        } else {
          cb() // 将判断传递给后面
        }
      }
      let checkPassword = (rule, value, cb) => {
        if (!value) {
          return cb(new Error('密码不能为空!'))
        } else {
          cb()
        }
      }
      let checkPasswordAgain = (rule, value, cb) => {
        if (!value) {
          return cb(new Error('再次输入密码不能为空!'))
        } else if (value !== this.formRegister.password) {
          return cb(new Error('两次输入密码不一致!'))
        } else {
          cb()
        }
      }

      return {
        formRegister: {
          name: '',
          password: '',
          checkPassword: ''
        },
        rules: {
          name: [{
            validator: checkUserName,
            trigger: 'blur'
          }],
          password: [{
            validator: checkPassword,
            trigger: 'blur'
          }],
          checkPassword: [{
            validator: checkPasswordAgain,
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      addUser () {
          //console.log(this.$rest)
        let user = this.formRegister
        let formData = {
          name: user.name,
          password: user.password
        }
        // 表单验证
        this.$refs['formRegister'].validate((valid) => {
          if (valid) {
            this.$rest.user.register(formData)
              .then(res => {
                if (!res.success) {
                  this.$message.error(res.message)
                } else {
                  this.$message.success(res.message)
                  this.$router.push('/login')
                }
              })
              .catch(err => {
                this.$message.error(`${err.message}`)
              })
          } else {
            this.$message.error('请输入账号、密码后再注册!')
            return false
          }
        })
      }
    }
  }

</script>

<style>
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
