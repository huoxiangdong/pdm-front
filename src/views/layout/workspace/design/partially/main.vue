<template lang="pug">
  div()
   x-card(  
     :inputGrid="inputGrid"
     :baseData="baseData")
   x-table(:tableData="tableData"
           :columns="columns"
           ref="egrid")
</template>

<script>
import { mapState, mapActions } from "vuex";

import Data from "./data";
export default {
  data() {
    return {
      inputGrid: {
        display: "grid",
        "grid-template-columns": "1fr 1fr",
        "grid-row-gap": "10px",
        "grid-column-gap": "30px"
      },
      tableData: Data.data,
      columns: Data.columns,
      baseData: Data.base
    };
  },
  computed: {
    ...mapState(["multiMenuIndex"]),
    observerValue: {
      // 获取input值
      get: function() {
        let obj = {};
        for (let item in this.baseData) {
          this.baseData[item].map(data => {
            obj[data.key] = data.value;
          });
        }

        return obj;
      },
      set: function(val) {
        let obj = {};
        for (let item in this.baseData) {
          this.baseData[item].forEach(data => {
            if (val[data.key] == data.value) {
              data.value = val[data.key]; // 这儿如果返回的数据和input数据一样，input样式会错位？？？
            } else {
              console.log(val[data.key]);
              data.value = val[data.key];
            }
          });
        }
        console.log(
          `修改 or 响应后变化的input数据:\n`,
          JSON.stringify(this.observerValue, null, 2)
        );
      }
    }
  },
  methods: {
    ...mapActions(["getMultiMenuState"]),
    addPartiallyData() {
      // input数据保存提交
      const { tableData,observerValue } = this
      const h = this.$createElement;
      this.$rest
        ? this.$rest.submit
            .addPartiallyData([observerValue,tableData])
            .then(res => {
              !res.success
                ? (console.log(JSON.stringify(res, null, 2)),
                  this.$message({
                    showClose: true,
                    type: "error",
                    message: h("div", null, [
                      h("p", null, JSON.stringify(res.data.errors, null, 2)),
                      h("p",
                        { style: "margin-top:3px" },
                        res.data.errors[0].validatorKey)])})
                        ): this.$message.success(res.message);
            })
            .catch(err => this.$message.error(`${err.message}`)
            ): this.$message.error("请求方法未挂载,请刷新试试"); // 提交请求响应过程
    },
    
  },
  watch: {
    "multiMenuIndex.value": {
      deep: true,
      handler: function(val, oldVal) {
        var { observerValue,tableData } = this;
            //  this.tableData.map(obj => {
            //    obj['MatNumber'] = observerValue.MatNumber
            //  })
        switch (val) {
          case "work1":
            //console.log(observerValue[Object.keys(observerValue)[0]])
            this.addPartiallyData();
            break;
        }
      }
    }
  }
};
</script>

<style module>
.red {
  color: red;
}
</style>
