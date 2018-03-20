<template lang="pug">
div
  w-materialcard(
    cardHeaderTitle="基本信息"
    :inputGrid="inputGrid"
    :baseData="materialData"
  )

</template>

<script>
import Data from "./wMaterialCard/MaterialData";
export default {
  data(){
    return {
      materialData: Data.materialData,
      inputGrid: {
        display:'grid',
        'grid-template-columns':'1fr 1fr',
        'grid-row-gap':'15px',
        'grid-column-gap':'100px'
        }
    }
  }

}
</script>

<style lang="stylus">
</style>
