<template>
  <div>
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
          <!-- <router-link to="/">主页</router-link> -->
          <el-menu-item index="1" @click.native="isCollapse=!isCollapse" class="main">
            <template slot="title">中心</template>
          </el-menu-item>

          <el-submenu index="2">
            <template slot="title">我的工作台</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-submenu>

          <el-menu-item index="3">
            <a href="#" target="_blank">订单管理</a>
          </el-menu-item>

          <el-menu-item index="4" :style="{float: 'right'}">
            <router-link v-show="!user.name" to="/login">登录</router-link>
            <el-dropdown @command="loginOut">
              <span v-show="user.name">
                <img src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"> {{user.name}}
                <i class="el-icon-caret-bottom el-icon--right"></i>

              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command>
                  <i class="iconfont icon-dengluzhanghao"></i>

                  个人中心</el-dropdown-item>
                <el-dropdown-item command>
                  <i class="iconfont icon-shezhi"></i>
                  设置</el-dropdown-item>
                <el-dropdown-item command>
                  <i class="iconfont icon-tuichu"></i>
                  退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-menu-item>
        </el-menu>
      </el-header>
      <el-container>
        <el-aside style="width:200px;margin-top: 20px;margin-left:20px">
          <!-- 左边栏 -->
          <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">导航一</span>
              </template>
              <el-menu-item-group>
                <span slot="title">分组一</span>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <span slot="title">选项4</span>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-setting"></i>
              <span slot="title">导航三</span>
            </el-menu-item>

          </el-menu>
          <div class="line"></div>
          <!-- 卡片 -->

          <!--   <el-card class="box-card"  >
      <p>Hello {{user.name}}</p>
      <i class="iconfont icon-mima"></i>
    </el-card> --></el-aside>
        <el-container>
          <el-main>
            <!-- 走马灯 -->
            <template>
              <el-carousel height="800px" indicator-position="outside" arrow="never" :autoplay="false">
                <el-carousel-item>
                  <!-- 表格 -->
                  <el-table :data="tableData" style="width: 100%">
                    <el-table-column label="日期" width="180">
                      <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.date }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="姓名" width="180">
                      <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                          <p>姓名: {{ scope.row.name }}</p>
                          <p>住址: {{ scope.row.address }}</p>
                          <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.name }}</el-tag>
                          </div>
                        </el-popover>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作">
                      <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-carousel-item>
                <el-carousel-item>
                  <h3>1</h3>
                </el-carousel-item>
              </el-carousel>
            </template>
          </el-main>

        </el-container>
      </el-container>
      <el-footer>
        <pdm-footer></pdm-footer>
      </el-footer>
    </el-container>

  </div>
</template>

<script>
  import { mapActions} from 'vuex'
  export default {
    data () {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        isCollapse: false,
        activeIndex: '1',
        user: { name: '' }
      }
    },
    beforeCreate () {
      // 第二次拦截
      // 当主页刷新时，如果服务端设置的token
      // 的时效到了的话，便会提示未登录
      if(this.$rest){
        this.$rest.user.token().then(res => {
        console.log(this.$rest)
        if (!res.success) {
          this.userLoginOut()
          // Cannot set property 'type' of undefined
          this.$message.error(res.message)
          this.user.name = null
        } else {
          let username = localStorage.getItem('username')
          if (username) {
            this.user.name = username
          }
        }
      })
      .catch(err => {
        console.log(err)
        this.$message.error(`${err.message}`, 'ERROR!')
      })
      }
    },
    methods: {
      ...mapActions(['userLoginOut']),
      // 登出loginOut
      loginOut () {
        this.userLoginOut()
        this.user.name = null
        if (!this.$store.state.token) {
          this.$router.push('/login')
          this.$message.success('登出成功')
        } else {
          this.$message.success('登出失败')
        }
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
/* *{
  font-weight: bold
} */
 .el-dropdown-selfdefine{
   color:#000;
 }

 .el-card{
  margin-top:10%;
  margin-left: 30%;
   width:600px;
   height:500px;
   
 }
 .el-dropdown>span>img {
    width: 24px;
    height: 24px;
    
}     
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .main {
    margin-right: 140px;
  }

  /* 走马灯 */
 
   .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #ff5000;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color:#fff
  }
 
</style>
