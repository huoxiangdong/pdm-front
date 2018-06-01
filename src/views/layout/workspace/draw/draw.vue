<template lang="pug">
 doctype html
 div(class="grid"   
     v-grid="griData"
    
     @click='click')
   d-card(class = 'grid-1' ) 1
   d-card(class = 'grid-2') 
     p 1111
     p 11111
     p 111
     p 111
   d-card(class = 'grid-3') 3
   d-card(class = 'grid-4') 4
   d-card(class = 'grid-5') 5
   d-card(class = 'grid-6') 6
</template>

<script>
export default {
    data() {
      return {
        activeIndex: '1',
        griData: {
          col: '1,3,1',
          row: '1,1,1',
          gap:'1,1',
          child:{
            0: '1/4',
            2: '2/4,0',

          }
        }
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      click(e) {
        console.log(this)
      }
    }
  }
</script>
<style lang="stylus">
//  .grid 
//    display grid 
//    grid-template-columns 1fr 1fr 1fr
//    //grid-template-rows 1fr 1fr
//    grid-column-gap 1rem
//    grid-row-gap 1rem
// .grid-1
//    grid-column 2/3
// .grid-2
//    //grid-row  2/5
//    grid-row 2 / span 1
//  .el-card
//    & .el-card-header
//      background-color #eee
   
</style>

