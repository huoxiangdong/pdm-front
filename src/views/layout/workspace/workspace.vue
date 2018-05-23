<template lang="pug">   
  el-carousel(
    height='720px!important'
    indicator-position="outside" 
    arrow="never" 
    :autoplay="false"
    ref='carousel'
    )
    el-carousel-item
       router-view(style="padding:0 30px")
    el-carousel-item   
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: "WorkSpace",
  data() {
    return {}
  },
methods: {
    ...mapActions(['getCarScroll']),

    // carScroll(event){
    //  this.getCarScroll(event.target.scrollTop)

    // }
 }, 

}
</script>

<style lang="stylus" scoped>
.el-carousel 
  // 卡片背景颜色
  &__item:nth-child(2n)  // 其父元素的第二个子元素 n 是计数器（从 0 开始）   
  &__item:nth-child(2n+1) 
      background-color:#fff 

  // div
  //  overflow-y auto
  //  overflow-x hidden
  
</style>
