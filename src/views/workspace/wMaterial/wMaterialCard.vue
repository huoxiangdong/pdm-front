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
       :inline="true" 
       :model="formMaterial" 
       size="mini" 
       )
    el-row(type="flex" justify="space-around")
      el-col(:span="8")
          el-input(v-model="formMaterial.MaterialNumber")
            template(slot="prepend") 物料编号
      el-col(:span="8")
          el-input(v-model="formMaterial.Preset")
           template(slot="prepend") 预设来源类型

    el-row(type="flex" justify="space-around")
      el-col(:span="8")
          el-input(v-model="formMaterial.MaterialClass")
           template(slot="prepend") 物料种类
      el-col(:span="8")
          el-input(v-model="formMaterial.BarCode")
           template(slot="prepend") 条形码

    el-row(type="flex" justify="space-around")
      el-col(:span="8")
          el-input(v-model="formMaterial.MaterialName")
           template(slot="prepend") 物料名称
      el-col(:span="8")
          el-input(v-model="formMaterial.BatchNumber")
           template(slot="prepend") 批号控制
    el-row(type="flex" justify="space-around")
      el-col(:span="8")
          el-input(v-model="formMaterial.Standard_1")
           template(slot="prepend") 规格1
      el-col(:span="8")
          el-input(v-model="formMaterial.Standard_2")
           template(slot="prepend") 规格2
    el-row(type="flex" justify="space-around")
      el-col(:span="8")
          el-input(v-model="formMaterial.Unit")
           
            template(slot="prepend") 库存单位
      el-col(:span="8")
          el-input(v-model="formMaterial.Quantity")
           template(slot="prepend") 库存数量小位数
</template>

<script>
import Data from "./wMaterialData";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      titles: Data.title,
      formMaterial: {
        MaterialNumber: "",
        Preset: "",
        MaterialClass: "",
        BarCode: "",
        MaterialName: "",
        BatchNumber: "",
        Standard_1: "",
        Standard_2: "",
        Unit: "",
        Quantity: ""
      }
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
      } else if (val === 3) {
        // 保存
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
.el-card__header {
  background-color: #999999;
}

.box-card {
  margin: 10px 60px;
}

.el-row {
  margin-bottom: 5px;

  &:last-child {
    margin-bottom: 0;
  }
}

// from
.el-from {
  margin-top: 0px;
}

.el-input-group__prepend {
  width: 100px;
  text-align: left;
}

.el-carousel__item.is-active {
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
