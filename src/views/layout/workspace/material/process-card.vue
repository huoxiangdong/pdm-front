<template lang="pug">
  el-card(:shadow="'hover'")
</template>

<script>
//import draggable from 'vuedraggable'
import { mapState } from 'vuex'
export default {
  data(){
      return {
        activeName: '0'
       
      }
  },
  computed: {
    ...mapState(['multiMenuIndex'])
  },
  methods: {

  
  },
  watch:{
    'multiMenuIndex.value': function(val,oldVal) {
      console.log(val)
      
    }
  }

}
</script>
<style lang="stylus" scoped>
.container
  display grid 
  grid-template-columns 3fr 1fr
  grid-gap 1rem
  height 100%
  margin 5px
.draw-container
  height 100%
  border 1px dashed #ff5000
.worker
  border-left 1px solid #eee
  border-right  1px solid #eee
.title
  //padding 0 8px
.collapse-item
  margin-bottom -2px
  padding 0 8px
.tag
  margin 1px 1px

</style>
