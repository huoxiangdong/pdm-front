<template lang="pug">
div
  el-card(:id="key" class="card" :body-style="bodyStyle" v-for="(item, key, index) in renderInputs" :key="item.id")
   div(slot="header")
      span {{ key }}   
   el-form(class="el-from")
    div(:style="inputGrid")
      el-input(    
        v-for="obj in item" 
        v-model="obj.value" :key="obj.id"
        :style="{ width: obj.width }"
        size="small"
        v-if="obj['isInput']")
        template(slot="prepend") {{ obj['title'] }}
      component(v-else :is="obj.component" v-bind="getValbind(obj)" @bindVal="obj.value = arguments[0]") 
     
</template>

<script>
import { mapState, mapActions } from "vuex";
//import { stringify } from 'querystring';
var obj = {}
const INPUT_ITEM = { component: {} };

export default {
  name: "xCard",
  props: {
    baseData: { // 基本数据
      type: [Object, Array],
      default() {
        return {};
      }
    },
    cardHeaderTitle: { // 卡片标题
      type: String,
      //required: true
    },
    inputGrid: {
      type: Object,
      default() {
        return {
        display: "grid", // grid布局
        "grid-template-columns": "1fr 1fr",// 列
        "grid-row-gap": "10px", // 行距
        "grid-column-gap": "50px" // 列距
      }
     }
    }, // 布局
    // cardStyle: {
    //   type: [Object,String],
    //   default() {
    //     return {
    //       margin: '10px auto'
    //     }
    //   }
    // },
    initInputData: Object,  // 初始化默认 新增
    inputSchema:Object // 自定义模板
  },

  data() {
    return {
      bodyStyle: { margin: "0px auto" },   
      keyMap: new Set
    };
  },
  computed: {
    ...mapState(["multiMenuIndex"]),
  
    observerValue: {  // 获取input值
      get: function() {
       let obj = {}
        for(let item in this.baseData) {
             this.baseData[item].map(data => {
               obj[data.key] = data.value         
             })   
        }
        return obj
      },
      set: function(val) {
        let obj = {};
        for(let item in this.baseData) {
             this.baseData[item].forEach(data => {
            
               if(val[data.key] == data.value){
                 data.value= val[data.key]  // 这儿如果返回的数据和input数据一样，input样式会错位？？？
               }else{
                 console.log(val[data.key])
                 data.value = val[data.key]
               }     
             })   
        }
        console.log(
          `修改 or 响应后变化的input数据:\n`,
          JSON.stringify(this.observerValue, null, 2)
        );
      }
    },
    queryData() { // 查询条件 一般第一栏为关键字
        let obj = {}
        obj[Object.keys(this.observerValue)[0]] = Object.values(this.observerValue)[0]
        return obj
    },
    renderInputs() {
      let { baseData, inputSchema: schema } = this; //// input渲染
     let renderInputs = {}
     Object.keys(baseData).map(title => {
        let item = baseData[title].map(obj => {
             let mix = schema && schema[obj.title] || {}  // schema[obj.key]关键是这个条件判断，只有schema的key===obj.key才会返回

             obj = {...obj,...mix}
             return obj
           })
           baseData[title] = item
         })
      return baseData;
    }
  },
  methods: {
    ...mapActions(["getMultiMenuState","getObserverValues"]),
    
    addMaterialData() { // input数据保存提交
      if (this.$rest) {
        this.$rest.submit
          .addMaterialData(this.observerValue)
          .then(res => {

            if (!res.success) {
              console.log(JSON.stringify(res, null, 2));
              const h = this.$createElement;
              this.$message({
                showClose: true,
                type: "error",
                message: h("div", null, [
                  h("p", null, JSON.stringify(res.data.errors,null,2)),
                  h("p", { style: "margin-top:3px" }, res.data.errors[0].validatorKey)
                ])
              });
              
              return false
            }else { 
              this.$message.success(res.message) }
          }).catch(err => { 
            
            this.$message.error(`${err.message}`) }); // 提交请求响应过程
      }else {
        this.$message.error("你真厉害，被你发现了😝");
        return false; }
   },
    queryMaterialData() {  // 查询
      if (this.$rest) {
        this.$rest.submit
          .queryMaterialData(this.queryData) // 提交
          .then(res => {
            if (!res.success) {
              this.$message.error(res.message);
            } else {
              console.log(res.data)
              
              this.observerValue = res.data;
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
    updateMaterialData() { // 更新数据
     if (this.$rest) {
        this.$rest.submit
          .updateMaterialData(this.observerValue)
          .then(res => {
            if (!res.success) {
              console.log(JSON.stringify(res, null, 2));
              this.$message.error(res.message);
            } else if (res.data !== null && res.data.errno) { // res.data.errno 为mysql报错
              console.log(JSON.stringify(res, null, 2));
              // message
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
          }); // 提交请求响应过程出错
      } else {
        this.$message.error("你真厉害，被你发现了😝");
        return false;
      }
    },
    // 删
    deleteMaterialData() {
       if (this.$rest) {
        this.$rest.submit
          .deleteMaterialData(this.queryData) // 提交
          .then(res => {
            if (!res.success) {
              this.$message.error(res.message);
            } else {
              let username = localStorage.getItem("username")
              this.observerValue = { Creator: username }
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
    initNavState(val, oldVal) {
      this.getMultiMenuState(~~0);
    },
   getValbind({value,title}) { // 像自定义组件传值
     const props  = { value,title } // 关键
     const handler = obj.propsHandler
     return handler && handler(props) || props
    },
    getBaseData() {
      console.log("获取到基础数据");
      let props = {};
      this.baseData.map((val, index) => {
        console.log(val);
        props[index] = val;
      });
      return props;
    },
    // getKey(key,index) {    
    //   this.keyMap.add(key)
    //   if (this.keyMap.size === 8){
    //     this.$emit('cardTitle',Array.from(this.keyMap))
    //   }
      
    // }
  },
  // watch: {
  //   'multiMenuIndex.value': function(val, oldVal) {  // 观察菜单状态
     
  //     switch (val) {
  //       case 'work1':
  //         console.log(
  //           `当前input内数据:\n`,
  //           JSON.stringify(this.observerValue, null, 2)
  //         );
  //         this.initNavState(val, oldVal);
  //         break;
  //       case 'work2': // 新增
  //         this.observerValue = this.initInputData;
  //         this.initNavState(val, oldVal);
  //         break;
  //       case 'work3': // 保存
  //         this.addMaterialData();
  //         this.initNavState(val, oldVal);
  //         break;
  //       case 'work4': // 查询
  //         this.queryMaterialData();
  //         this.initNavState(val, oldVal);
  //         break;
  //       case 'work5': // 更新
  //         console.log('更新')
  //         this.updateMaterialData();
  //         this.initNavState(val, oldVal);
  //         break;
  //       case 'work6': 
  //         console.log(val)
  //         this.deleteMaterialData()
  //         this.initNavState(val, oldVal)
  //         break
  //       case 'work7': 
  //         //this.$router.replace({path:this.$route.fullPath,hash:'基本信息'})
  //         this.initNavState(val, oldVal)
  //         break
  //       case 'work8':
  //         //this.$router.push({path:this.$route.fullPath,hash:'财务相关'})
  //         // this.$router.push({path:this.$route.fullPath,hash:Array.from(this.keyMap)[this.keyIndex]})
  //         // this.keyIndex --
  //         console.log(Object.keys(this.baseData))
  //         this.initNavState(val, oldVal)
  //         break
  //     }
  //   },
  //   observerValue:function(val,oldVal) {
  //     const h = this.$createElement;

  //       this.$notify({
  //         title: '提交数据',
  //         message: h('pre', { style: 'color: teal'}, JSON.stringify(this.observerValue, null, 4)),
  //         duration: 1000
  //       });
  //   }
  // }
};
</script>

<style lang="stylus" scoped>
div >>>
    .el-card  
      border-radius: 0px
    .el-card__header 
      background-color #666666
      color #fff
      padding 4px 20px
    .el-from 
      margin auto 50px
    // title
    .el-input-group__prepend 
      text-align left   
      padding 0 10px
      color #595959
    .el-input__inner
    .el-input-group__append, .el-input-group__prepend
      border-radius 0px
      border-top 0
      border-right 0
      border-left 0
</style>
