<template lang="pug">
   el-menu(:default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect")
    el-menu-item(index="1") 
        i(class="iconfont icon-icok")
    el-menu-item(index="2" id="search") 
        IuputSearch
    el-menu-item(index="3") 
        i(class="iconfont icon-xinzeng") 
    el-menu-item(index="4") 
        i(class="iconfont icon-baocun-tianchong")
    el-menu-item(index="5") 
        i(class="iconfont icon-zuo")
    el-menu-item(index="6") 
        i(class="iconfont icon-you")
    el-menu-item(index="7") 
        i(class="iconfont icon-shanchu")
    el-menu-item(index="8") 
        i(class="iconfont icon-msnui-info")
</template>

<script>
export default {
  data() {
    return {
      // 菜单默认激活状态
      activeIndex: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
 
<style lang="stylus">
#search {
  padding: 0px;
}

</style>
