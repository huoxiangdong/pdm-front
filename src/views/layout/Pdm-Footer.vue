<template>
  <div class="pdm-footer px-2">
    <div class="links text-center">
      <a v-for="(link,index) in links" :key="index" class="text-secondary"
        :class="{'mr-4': index!==links.length-1}" :href="link.href||link.link">{{link.text}}</a>
    </div>
    <div class="copyright mt-1 text-secondary text-center">
      Copyright 2018 &copy; huoxiangdong@aliyun.com
    </div>
  </div>
</template>
<script>
export default {
  props: {
    links: {
      type: Array,
      default: () => {
        return [
          { text: '#', href: '/' },
          { text: '#', href: '/' },
          { text: '#', href: '/' }
        ]
      }
    }
  }
}
</script>

<style lang="stylus">
.pdm-footer
  position relative
  bottom 0
  left 0
  width 100%
  margin 10px auto 24px
  
</style>

