<template>
  <div id="app" class="flex flex-column over-hide">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="stylus">
@import './assets/styles'
@import './assets/base.styl'
</style>
