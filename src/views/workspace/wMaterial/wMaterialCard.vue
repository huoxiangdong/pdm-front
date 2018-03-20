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
           template(slot="prepend") 库存数量小位数

 
</template>

<script>
import Data from "./wMaterialData";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      titles: Data.titles,
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
      var state = function() {
        setTimeout(function() {
          self.getNavTwoKey(~~0);
        }, 1000);
      };

      console.log("new: %s, old: %s", val, oldVal);

      if (val == 2) {
        this.formMaterial = {};
        state();
      } else if (val === 3) {  // 保存
        console.log('提交内容')
      /*  var sb = Object.keys(this.formMaterial).map((data,index) => {
         //[data]:this.formMaterial[data].value}
         //var j = Object.assign({},data[index],data)
         return data})
       var sb1 = sb.map((data,index)=> { return index})
       var obj = Object.assign({},sb[0])
       var obj2 = Object.assign({},obj) */
       let obj = {}
       for (let key in this.formMaterial) {
          obj[key] = this.formMaterial[key].value   
       }
        console.log(obj)

        
        if (this.$rest) {
          this.$rest.submit
            .addMaterial(this.formMaterial) // 提交
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
      } else if (val === 4) {
        if (this.$rest) {
          this.$rest.submit
            .queryMaterial(this.formMaterial) // 提交
            .then(res => {
              if (!res.success) {
                this.$message.error(res.message);
              } else {
                this.formMaterial = res.data;
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
