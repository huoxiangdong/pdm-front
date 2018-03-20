<template lang="pug">
  el-card(class="box-card" :body-style="bodyStyle")
   div(slot="header")
      span(style="font-size:13px;font-weight:bolder;") {{ cardHeaderTitle }}
   el-form(class="el-from" :model="observerValue" )
    div(:style="inputGrid")
      template(v-for="(value, key, index) in baseData")
         el-input(v-model="value['value']")
            template(slot="prepend") {{ value['title'] }}
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "wCard",
  props: {
    baseData: Object,
    cardHeaderTitle: {
      type: String,
      required: true
    },
    inputGrid: Object,
    initInputData: Object
  },
  data() {
    return {
      bodyStyle: { margin: "0px auto", background: "#eee" }
    };
  },
  computed: {
    ...mapState(["navTwoKey"]),
    observerValue: {
      get: function() {
        let obj = {};
        for (let key in this.baseData) {
          obj[key] = this.baseData[key].value;
        }
        return obj;
      },
      set: function(val) {
        let obj = {};
        for (let key in val) {
          this.baseData[key].value = val[key];
        }
        console.log(`修改 or 响应后变化的input数据:\n`,JSON.stringify(this.baseData,null,2));
      }
    }
  },
  methods: {
    ...mapActions(["getNavTwoKey"]),
    // input数据保存提交
    saveForm() {
      if (this.$rest) {
              this.$rest.submit
                .addMaterial(this.observerValue)
                .then(res => {
                  if (!res.success) {
                    console.log(JSON.stringify(res,null,2));
                    this.$message.error(res.message);
                  } else if (res.data !== null && res.data.errno) {
                    console.log(JSON.stringify(res,null,2));
                    const h = this.$createElement;
                    this.$message({
                      showClose: true,
                      type: "error",
                      message: h("div", null, [
                        h("p", null, res.data.sqlMessage),
                        h("p", { style: "margin-top:3px" }, res.data.sql)
                      ])
                    });
                  } else {
                    this.$message.warning(res.message);
                  }
                })
                .catch(err => {
                  this.$message.error(`${err.message}`);
                }); // 提交请求响应过程
            } else {
              this.$message.error("你真厉害，被你发现了😝");
              return false;
            }
    },
    // 查询input数据
    queryInputData() {
      if (this.$rest) {
          this.$rest.submit
            .queryMaterial(this.observerValue) // 提交
            .then(res => {
              if (!res.success) {
                this.$message.error(res.message);
              } else {
                this.observerValue = res.data
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
    },
    // 初始菜单状态
    initNavSate(val,oldVal) {
        this.getNavTwoKey(~~0);
        console.log("new: %s, old: %s", val, oldVal);
    }
  }, 
  watch: { // 观察菜单状态
    navTwoKey: async function(val, oldVal) {
      switch (val) {
        case 1:
          await console.log(`当前input内数据:\n`,JSON.stringify(this.observerValue,null,2));
          await this.initNavSate(val,oldVal)
          break;
        case 2: // 新增
          await (this.observerValue = this.initInputData);
          await this.initNavSate(val,oldVal)
          break;
        case 3: // 保存
          await this.saveForm()
          await this.initNavSate(val,oldVal)
          break;
        case 4: // 查询
          await this.queryInputData()
          await this.initNavSate(val,oldVal)
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
.el-input-group__prepend 
  width: 100px
  text-align: left


// 滚动
.el-carousel__item.is-active 
  overflow-y: auto
  overflow-x: hidden

</style>
