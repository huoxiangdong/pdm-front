<template lang="pug">
div(class="main" 
    @dragstart="ondragstart"
    @dragend="ondragend"
    @dragover="ondragover"
    @dragenter="ondragenter"
    @drop="ondrop")
  div(class="draw-container" 
      ref="draw"
      @click="onclick"
      v-drag:move="")  
    el-button
    el-card
    el-card(v-for="a in buttonGroup" :key='a.id')
    el-button(v-for="a in buttonGroup" :key='a') test
   
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
                
                ) 
</template>

<script>

import { mapState } from 'vuex'
export default {
  name:'Evolution',
 
  data(){
      return {
        activeName: '0',
         buttonGroup:[],
        items:[{
          title:'属性编辑区',
          name:'1',
          
        },{
          title:'From',
          name:'2',
          components:['单选框','多选框','输入框','计数器','选择器','级联选择器','开关','滑块','时间选择器','日期选择器','日期事件选择器','上传','评分','颜色选择器','穿梭框','表单','按钮']
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
        test:{a:1}
      }
  },
  computed: {
    ...mapState(['multiMenuIndex'])
  },
  methods: {
    onclick(e) {
      
    // console.log(e)
    },
    ondragstart(e) {
      e.dataTransfer.setData("text", e.target.innerHTML) // 携带数据
      e.dataTransfer.setDragImage(e.target, 0, 0) // 拖拽鼠标样式
    },
    ondragend(e) {
      //e.dataTransfer.clearData("text")
      return false
    },
    ondragover(e) { // 拖拽元素变成了目标元素
      e.preventDefault()
      return false
    },
    ondragenter(e) {
      
    },
    ondrop(e) {
     if(e.target == this.$refs.draw) {
       this.buttonGroup.push(1)
     
     console.log(e.dataTransfer.getData('text'))
     }
     
    }

  
  },
 mounted() {
   //this.$forceUpdate()
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

</style>
