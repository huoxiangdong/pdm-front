import Vue from 'vue'
const checkbox = {
  isInput: false,
  propsHandler(props) { // 获取父组件值
     return props
  },
  component: Vue.extend({
    props: ['value','title'],
    render(h) {
      const self = this
      const { value,title } = this
      const checkProps = {
        attrs: {
          checked: this.value,
        },
        style: { padding:'0 15px','line-height':'2rem','border-bottom':' 1px solid #dcdfe6'},
        class: {},
        on: {
           change: function (event) {
            self.$emit('bindVal', event)
          }
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
const select = {
  isInput: false,
  propsHandler(props) { // 获取父组件值
     return props
  },
  component: Vue.extend({
    props: ['value','title'],
    render(h) {
      const self = this
      const { value,title } = this
      const checkProps = {
        attrs: {
          checked: this.value,
          size: 'small'
        },
        style: {},
        class: {},
        on: {
           change: function (event) {
            self.$emit('bindVal', event)
          }
        },
      }
      return (
        <div class="el-input-group" > 
          <div class="el-input-group__prepend" > {title} </div>
          <el-select {...checkProps }>
          </el-select>
        </div>
      )
    }
  })
}
export default {
  data() {
    return {// 自定义input
      inputSchema: {
        '物料编号': select,
        '允许采购': checkbox,
        '允许外协': checkbox,
        '允许生产': checkbox,
        '允许生产发料': checkbox,
        '允许工作中心领料(计入杂费)': checkbox,
        '允许销售': checkbox,
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