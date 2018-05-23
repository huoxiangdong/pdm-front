<template lang="pug">
// :style="{transform: `translateY(${ carScroll}px) scale(1)`,'z-index':999}"
div(style="overflow-y:auto;height:720px;")
  //div(style="position: fixed;z-index: 999;margin: 18px 0px 0px 350px;")
   el-tag(v-for="title in Object.keys(materialData)" :key="title.id" size="mini" type="info" color="rgb(102, 102, 102,0.8)" style="margin:2px;border-radius:0px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);border: 0px;") 
     a(:href="'#'+title" ) {{ title }}
  x-card(
         :baseData="materialData"
         :initInputData="initInputData"
         :inputSchema="inputSchema"
         :inputGrid=`{ 
           display: "grid",
           "grid-template-columns": "1fr 1fr", 
           "grid-row-gap": "1rem",
           "grid-column-gap": "2rem" }`)
</template>

<script>

import { mapState, mapActions } from "vuex";
import Data from "./data";
import Schema from "./schema";
export default {
  mixins: [Schema],
  data() {
    return {
      materialData: Data.data,
      initInputData: Data.initData,
   
     /*  inputGrid_1: {
        display: "grid",
        "grid-template-columns": "1fr 1fr",
        "grid-row-gap": "10px",
        "grid-column-gap": "100px"
      } */
    };
  },
  computed: {
    // ...mapState(["carScroll"])

  },
  methods: {
    scroll(e) {
      //console.log(this.$route)
    }
 
  }
};
</script>



