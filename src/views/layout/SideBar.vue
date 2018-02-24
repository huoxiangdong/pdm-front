<template lang="pug">
  el-menu(default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse")
    el-submenu(index="1")
      template(slot="title")
        i(class="el-icon-location")
        span(slot="title") 导航一
      el-menu-item-group
        span(slot="title") 分组一
        el-menu-item(index="1-1") 选项1
        el-menu-item(index="1-2") 选项2
      
      el-menu-item-group(title="分组2")
        el-menu-item(index="1-3") 选项3
      
      el-submenu(index="1-4")
        span(slot="title") 选项4
        el-menu-item(index="1-4-1") 选项1
      
    el-menu-item(index="2")
      i(class="el-icon-menu")
      span(slot="title") 导航二
    
    el-menu-item(index="3")
      i(class="el-icon-setting")
      span(slot="title") 导航三
</template>
