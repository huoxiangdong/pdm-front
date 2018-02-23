<template>
  <div class="app-auth flex flex-column flex-ai-center">
    <Logo></Logo>
    <router-view></router-view>
    <pdm-footer :links="links" class="absolute"></pdm-footer>
  </div>
</template>



<script type="text/javascript">
  import Logo from '../components/Logo.vue'

  export default {
    data () {
      return {
          links: [
              { text: '帮助', href: '/' },
              { text: '隐私', href: '/' },
              { text: '条款', href: '/' }
          ]
      }
    },
    // 在实例创建完成后被立即调用
    created () {
    const script = document.createElement('script')
    script.src = '//cdn.bootcss.com/canvas-nest.js/1.0.1/canvas-nest.min.js'
    script.type = 'text/javascript'
    // 添加属性 z-index:0 的会创建一个新的层叠上下文 
    script.setAttribute('zIndex', 0)
    document.body.appendChild(script)
    this.script = script
  },
     beforeDestroy () {
    const l = document.getElementsByTagName('script')
    const canvasNest = document.getElementById('c_n' + l.length)
    if (canvasNest) {
      canvasNest.remove()
    }
    if (this.script) {
      this.script.remove()
    }
  },
     components: {
		Logo
	}
  }

</script>


<style lang="stylus">
.app-auth
  position relative
  width 100%
  min-height 100%
  padding 10px 0
  z-index 2
  h1
    img
      width 42px
      height auto
</style>