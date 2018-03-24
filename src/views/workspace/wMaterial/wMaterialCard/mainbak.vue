<template lang="pug">
  el-card(
      class="box-card" 
      :body-style="{ margin:'0px auto',background:'#eee' }"
      )
   // 槽 插到 slot header内
      <div class="el-card__header" v-if="$slots.header || header">
      <slot name="header">{{ header }}</slot>
      有个具名插槽header，将基本信息代码段插到header插槽
   div(slot="header")
      span(style="font-size:13px;font-weight:bolder;") {{ cardHeaderTitle }}
   el-form(
       class="el-from"
       :model="baseData" 
       )
    div(:style="inputGrid")
      template(v-for="(value, key, index) in baseData")
         el-input(v-model="value['value']")
            template(slot="prepend") {{ value['title'] }}
</template>

<script>

import { mapState, mapActions } from "vuex";
export default {
  name:'wCard',
  props: {
   /*  data: {
      type: Array,
      default () {
        return []
      }
    }, */
/* 

    columnType: [String, Array],

    columnKeyMap: Object,

    columnsProps: Object,

    columnsSchema: Object,

    columnsHandler: Function, */
    baseData: Object,

    cardHeaderTitle: {
      type: String,
      required: true
    },
    inputGrid: [Object]
  },
  data() {
    return {
      
    };
  },
  computed: {
    ...mapState(["navTwoKey"]),
    // input值,获取当前input数据,用于表单提交
    observerValue: {
      get: function() {
        let obj = {}
        for (let key in this.baseData) { obj[key] = this.baseData[key].value }
        return obj
      },
      //  后端返回的input数据,用于查询显示等,
      set: function(val) {
         console.log('获取的内容')
        //console.log(val) 
        let obj = {}
        for (let key in val) { this.baseData[key].value = val[key]}  
        console.log(this.baseData)
        
        //return 
        //for (let key in this.baseData) { this.materialValue = this.baseData[key].value  }
      }
    },
    // 表单提交内容
    /* formData: function() {
       let formData = {}
       for (let key in this.baseData) { formData[key] = this.baseData[key].value }
       return formData
    } */
  },
  methods: {
    ...mapActions(["getNavTwoIndex"])
  },
  watch: {
    navTwoKey: function(val, oldVal) {
      var self = this;
      // 重置菜单点击状态
      var state = function() {
        setTimeout(function() {
          self.getNavTwoIndex(~~0);
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
       
      console.log("new: %s, old: %s", val, oldVal);

       if (val === 2) { // 新增
         for (let key in this.baseData) { this.baseData[key].value = '' }
        state();  
      } else if (val === 3) {  // 保存
     
        if (this.$rest) {
          this.$rest.submit
            .addMaterial(this.observerValue) // 提交
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
            .queryMaterial(this.observerValue) // 提交
            .then(res => {
              if (!res.success) {
                this.$message.error(res.message);
              } else {
                //console.log(this.materialValue)
                this.observerValue = res.data
               /*  for (let key in res.data) { 
                  this.materialValue = res.data
                  //console.log(res.data[key])
                  //console.log(this.formMaterial[key].value)
                 } */
                //this.formMaterial = res.data;
                this.$message.success(res.message);
              }
            })
            .catch(err => {
              this.$message.error(`${err.message}`);
            });
        } else {
          this.$message.error("😝 我也不晓得咋办了");
          return false;
        }
        state();
      } else if (val === 1) {
        console.log(this.observerValue);
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
*/

// 滚动
.el-carousel__item.is-active {
  overflow-y: auto;
  overflow-x: hidden;
} 
</style>
