import Vue from 'vue'
const checkbox = {
  isInput: false,
  // propsHandler(props) { // 获取父组件值
  //    return props
  // },
  component: Vue.extend({
    props: ['value','title'],
    methods:{
      vModel (event) {
        this.$emit('bindVal', event)
      }
    },
    render() {
      const { value,title,
              vModel } = this
      const checkProps = {
        attrs: {
          checked: this.value,
        },
        style: { padding:'0 15px','line-height':'2rem','border-bottom':' 1px solid #dcdfe6'},
        class: {},
        on: {
           change: vModel
        },
      }
      return (
        <div class="el-input-group" > 
          <div class="el-input-group__prepend" style="height:32px;"> {title} </div>
          <el-checkbox {...checkProps }></el-checkbox>
        </div>
      )
    }
  })
}
const select = { // 下拉选项
  isInput: false,
  propsHandler(props) { // 获取父组件值
     return props
  },
  component: Vue.extend({
    props: ['value','title'],
    data() {
      return {
        options: [{
          value: '黄金糕',
          label: '黄金糕'
        }, {
          value: '双皮奶',
          label: '双皮奶'
        }, {
          value: '蚵仔煎',
          label: '蚵仔煎'
        }],
        
      }
    },
    methods:{
      elOption(options){
           return options.map(item =>{
             return (<el-option label={item.label} value={item.value }> </el-option>)
           })
         },
      vModel(event) { // 双向绑定 event === this.value 首先获取event值 
          this.$emit('bindVal', event)  
      }
    },
    watch: {
       value: function (val,oldVal){
         console.log(val)
       }
    },
    render() {
      const { value,title, options, 
              elOption, vModel } = this
      const selectProps = {
        attrs: {
          value: this.value,
          size: 'small'
        },
        style: {},
        class: {},
        on: {
           change: vModel
        },
      }
      return ( // { ...selectProps } 对象拷贝
        <div class="el-input-group" > 
          <div class="el-input-group__prepend" > {title} </div>
            <el-select { ...selectProps }>{ elOption(options) } </el-select>
        </div>
      )
    }
  })
}
export default {
  data() {
    return {// 自定义input
      inputSchema: {
        '批号控制': checkbox,
        '允许采购': checkbox,
        '允许外协': checkbox,
        '允许生产': checkbox,
        '允许生产发料': checkbox,
        '允许工作中心领料(计入杂费)': checkbox,
        '允许销售': checkbox,
        '预设来源类型': select,
        '物料种类': select,
        '物料细分': select,
        '库存单位': select,
        '默认收货仓库': select,
        '采购单位': select,
        '默认生产仓区': select,
        '默认合格品存放仓区': select,
        '默认坏品存放仓区': select,
        '物料的财务分类': select,
      },
    }
  }
}

//     border-color: #282C35;

              // return h('el-checkbox',{
              //   attrs: { // 属性
              //     checked: this.value,
              //   },
              //   on: {
              //     change: function (event) {
              //       self.$emit('bindVal', event)
              //     }
              //   }
              // } ,this.value)
              
                // 'MatName': {
        //   isInput: false,
        //   propsHandler(props) { // 获取父组件值
        //      return { value : props }
        //   },
        //   component: Vue.extend({
        //     props: ['value'],
        //     render(h) {
        //       var self = this
        //       return h('el-input',{
        //         domProps: { // 属性
        //           value: this.value,
        //         },
        //         on: {
        //           bindVal: function (event) {   
        //             self.$emit('input', event)
        //             console.log(self.value)
        //            //self.$emit('input', event.target.value)
        //           }
        //         }
        //       } ,this.value)
        //     }
        //   })
        // }