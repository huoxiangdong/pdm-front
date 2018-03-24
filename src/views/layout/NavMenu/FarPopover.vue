<template lang="pug">
el-menu-item(
  index="0"
  @select="handleSelect"
  
  :style="{float: 'right'}" 
  v-popover:popover2="" id="popover")
  i(class="iconfont icon-xiaoxitongzhi" ) 
  // 标记
  el-badge(:value="12" class="item")
  // 弹出框
  el-popover(
  ref="popover2"
  placement="bottom"
  title="标题"
  width="200"
  trigger="hover"
  content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。")
  
</template>

<script>
export default {
   methods: {
      handleSelect(key, keyPath) {
        return false
        console.log(key, keyPath);
      }
    }
};
</script>

<style lang="stylus">

</style>
