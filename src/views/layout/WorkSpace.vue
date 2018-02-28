<template lang="pug">
  el-carousel(
    height="800px" 
    indicator-position="outside" 
    arrow="never" 
    :autoplay="false")
    el-carousel-item
      wNavMenu
      wActiveArea
    el-carousel-item
      wNavMenu
      wDraw
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="stylus">
 // 走马灯 
   .el-carousel__item h3 
     color: #475669
     font-size: 18px
     opacity: 0.75
     line-height: 300px
     margin: 0
// 卡片背景颜色
  .el-carousel__item:nth-child(2n) 
    background-color: #fff
    
  .el-carousel__item:nth-child(2n+1) 
    background-color:#fff

</style>
