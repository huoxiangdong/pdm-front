<template lang="pug">
  el-breadcrumb(separator-class="el-icon-arrow-right")
    el-breadcrumb-item(:to="{ path: '/' }") 更改
    el-breadcrumb-item 供应商
    el-breadcrumb-item 采购数据
</template>

<script>
export default {

}
</script>

<style lang="stylus">
.el-breadcrumb {
  padding: 24px;
}
</style>
