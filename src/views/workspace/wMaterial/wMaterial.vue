<template lang="pug">
div
  w-Card(
    cardHeaderTitle="基本信息"
    :inputGrid="inputGrid_1"
    :baseData="materialData_1"
    :initInputData="initInputData"
  )
</template>

<script>
import Data from "./wMaterialCard/MaterialData";
export default {
  data() {
    return {
      materialData_1: Data.materialData,
      initInputData: Data.initInputData,
      inputGrid_1: {
        display: "grid",
        "grid-template-columns": "1fr 1fr",
        "grid-row-gap": "15px",
        "grid-column-gap": "100px"
      }
    };
  }
};
</script>

