<template lang="pug">
  el-card(
      class="box-card" 
      :body-style="{ margin:'0px auto',background:'#eee' }"
      )
   // 槽 插到 slot header内
      <div class="el-card__header" v-if="$slots.header || header">
      <slot name="header">{{ header }}</slot>
   div(slot="header")
      span(style="font-size:13px;font-weight:bolder;") 基本信息
   el-form(
       class="el-from"
       :model="formMaterial" 
       )
    div(
      :style="{'display':'grid','grid-template-columns':'1fr 1fr','grid-row-gap':'15px','grid-column-gap':'100px'}"
      )
      template(v-for="(value, key, index) in formMaterial")
         el-input(v-model="formMaterial[key].value")
           template(slot="prepend") {{ formMaterial[key].title }}

 
</template>

<script>
import Data from "./wMaterialData";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      formMaterial: Data.formMaterial
    };
  },
  computed: {
    ...mapState(["navTwoKey"])
  },
  methods: {
    ...mapActions(["getNavTwoKey"])
  },
  watch: {
    navTwoKey: function(val, oldVal) {
      var self = this;
      // 重置菜单点击状态
      var state = function() {
        setTimeout(function() {
          self.getNavTwoKey(~~0);
        }, 1000);
      };
      // 获取提交内容
         console.log('提交内容')
      /*  var sb = Object.keys(this.formMaterial).map((data,index) => {
         //[data]:this.formMaterial[data].value}
         //var j = Object.assign({},data[index],data)
         return data})
       var sb1 = sb.map((data,index)=> { return index})
       var obj = Object.assign({},sb[0])
       var obj2 = Object.assign({},obj) */
       let formData = {}
       for (let key in this.formMaterial) { formData[key] = this.formMaterial[key].value }
        console.log(formData)
      console.log("new: %s, old: %s", val, oldVal);

       if (val === 2) {
         for (let key in this.formMaterial) { this.formMaterial[key].value = '' }
        state();  
      } else if (val === 3) {  // 保存
     
        if (this.$rest) {
          this.$rest.submit
            .addMaterial(formData) // 提交
            .then(res => {
              if (!res.success) {
                console.log(res);
                this.$message.error(res.message);
              } else if (res.data !== null && res.data.errno ) {
                console.log(res);
                const h = this.$createElement
                this.$message({
                  showClose: true,
                  type: "error",
                  message: h("div", null, [
                    h("p", null, res.data.sqlMessage),
                    h("p", { style: "margin-top:3px" }, res.data.sql)
                  ])
                });
              }else {
                this.$message.warning(res.message)

              }
            })
            .catch(err => {
              this.$message.error(`${err.message}`);
            });
        } else {
          this.$message.error("请输入账号、密码后再注册!");
          return false;
        }
        state();
      } else if (val === 4) {  // 查询
        if (this.$rest) {
          this.$rest.submit
            .queryMaterial(formData) // 提交
            .then(res => {
              if (!res.success) {
                this.$message.error(res.message);
              } else {
                for (let key in res.data) { 
                  this.formMaterial[key].value = res.data[key]
                  //console.log(res.data[key])
                  //console.log(this.formMaterial[key].value)
                 }
                //this.formMaterial = res.data;
                this.$message.success(res.message);
              }
            })
            .catch(err => {
              this.$message.error(`${err.message}`);
            });
        } else {
          this.$message.error("请输入账号、密码后再注册!");
          return false;
        }
        state();
      } else if (val === 1) {
        console.log(
          JSON.stringify(this.formMaterial[("MaterialNumber", null, 2)])
        );
        state();
      }
    }
  }
};
</script>

<style lang="stylus">
.el-card__header 
  background-color: #999999
.box-card 
  margin: 10px 60px

.el-from 
   margin: auto 50px

// title
.el-input-group__prepend {
  width: 100px;
  text-align: left;
}
/* .el-input__inner
   width: 250px */
/* .el-row {
  margin-bottom: 5px;

  &:last-child {
    margin-bottom: 0;
  }
}

// from
.el-from {
  margin-top: 0px;
}



.el-carousel__item.is-active {
  overflow-y: auto;
  overflow-x: hidden;
} */
</style>
