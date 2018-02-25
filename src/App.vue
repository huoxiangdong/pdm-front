<template lang="pug">
  div(id="app" class="flex flex-column over-hide") 
    router-view(子路由插入)
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="stylus">
//@import './assets/styles'
@import './assets/stylus/base.styl'
</style>
