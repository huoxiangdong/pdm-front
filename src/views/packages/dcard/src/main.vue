<template lang="pug">
div( :class="['d-card',shadow ? 'is-' + shadow + '-shadow' : 'is-always-shadow']") 
      div(:class="headerStyle || 'd-card__header' " v-if="$slots.header || header")
        slot(name="header") {{ header }}
      div(class="el-card__body" :style="bodyStyle")
        slot
    
</template>
<script>

   export default {
    name: "DCard",
    // install(Vue) {
    //   Vue.component(this.name, this);
    // },
    props: {
      header: {
          default:'dd擦擦擦d'
      },
      headerStyle:{},
      bodyStyle: {},
      shadow: {
          type: String,
          default:'hover'
      }
    },
    data() {
        return {
            
        }
    },
    methods: {
        click(e) {

        }
    }
  }
</script>
<style lang="stylus">
.d-card
    border-radius 4px
    border 1px solid #ebeef5
    background-color #fff
    overflow hidden
    color #303133
.is-always-shadow,.is-hover-shadow:hover
    box-shadow 0 2px 12px 0 rgba(0,0,0,.1)
.d-card__header
    padding 10px 20px
    border-bottom 1px solid #ebeef5
    -webkit-box-sizing border-box
    box-sizing border-box


</style>
