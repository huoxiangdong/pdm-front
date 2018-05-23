<template lang="pug">
div(class="main")
  div(class="draw-container" ref="drawContainer")  
    div( class = "test" v-drag="$refs") test
  div(class="options" ) 
    el-collapse(v-model="activeName" v-for="item in items" :key="item.name")
      el-collapse-item(class="collapse-item" :name="item.name" )
        template(slot="title") 
            div(class="title" v-text="item.title") 
        el-tag(class="tag" 
                type="warning" 
                size="small" 
                v-for="val in item.components" :key="val" v-text="val"
                draggable="true" 
                @dragstart.native="dragstart"
                @drag.native="ondrag"
                ) 
</template>

<script>

import { mapState } from 'vuex'
export default {
  name:'Evolution',
  data(){
      return {
        activeName: '0',
        items:[{
          title:'属性编辑区',
          name:'1',
          
        },{
          title:'From',
          name:'2',
          components:['单选框','多选框','输入框','计数器','选择器','级联选择器','开关','滑块','时间选择器','日期选择器','日期事件选择器','上传','评分','颜色选择器','穿梭框','表单']
        },{
          title:'Data',
          name:'4',
          components:['单选框','多选框','输入框','计数器','选择器','级联选择器','开关','滑块','时间选择器','日期选择器','日期事件选择器','上传','评分','颜色选择器','穿梭框','表单']
        },{
          title:'Notice',
          name:'5'
        },{
          title:'Navigation',
          name:'6'
        },{
          title:'Others',
          name:'7'
        }],
      }
  },
  computed: {
    ...mapState(['multiMenuIndex'])
  },
  methods: {

  
  },
 mounted() {
     console.log(this)
 }

}
</script>
<style lang="stylus" scoped>
.main
  display grid 
  grid-template-columns 3fr 1fr
  grid-gap 1rem
  height 30rem

.draw-container
  height 100%
  border 1px dashed #ff5000

.collapse-item
  margin-bottom -2px

.title
  padding 0 8px 

.tag
  margin 3px 3px
.test 
  width 50px
  height 50px
  background-color #ff5000
</style>
