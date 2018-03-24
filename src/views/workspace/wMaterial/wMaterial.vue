<template lang="pug">
div
  w-Card(
    id="1"
    cardHeaderTitle="基本信息"
    :inputGrid="inputGrid_1"
    :baseData="materialData['基本信息']"
    :initInputData="initInputData"
    :inputSchema="inputSchema")
  w-Card(
    id="2"
    cardHeaderTitle="采购(或外协)参数"
    :inputGrid="inputGrid_1"
    :baseData="materialData['采购(或外协)参数']"
    :initInputData="initInputData"
    :inputSchema="inputSchema")
  w-Card(
    cardHeaderTitle="状态控制"
    :inputGrid="inputGrid_1"
    :baseData="materialData['状态控制']"
    :initInputData="initInputData"
    :inputSchema="inputSchema")
  w-Card(
    cardHeaderTitle="销售数量控制"
    :inputGrid="inputGrid_1"
    :baseData="materialData['销售数量控制']"
    :initInputData="initInputData"
    :inputSchema="inputSchema")
  w-Card(
    cardHeaderTitle="生产相关参数"
    :inputGrid="inputGrid_1"
    :baseData="materialData['生产相关参数']"
    :initInputData="initInputData"
    :inputSchema="inputSchema")
  w-Card(
    cardHeaderTitle="库存有关参数"
    :inputGrid="inputGrid_1"
    :baseData="materialData['库存有关参数']"
    :initInputData="initInputData"
    :inputSchema="inputSchema")
  w-Card(
    cardHeaderTitle="装箱信息"
    :inputGrid="inputGrid_1"
    :baseData="materialData['装箱信息']"
    :initInputData="initInputData"
    :inputSchema="inputSchema")
  w-Card(
    cardHeaderTitle="财务参数"
    :inputGrid="inputGrid_1"
    :baseData="materialData['财务参数']"
    :initInputData="initInputData"
    :inputSchema="inputSchema")
</template>

<script>
import Vue from "vue";
import { mapState, mapActions } from "vuex";
import Data from "./wMaterialCard/MaterialData";
import inputSchemaData from './InputSchemaData'
export default {
  mixins: [inputSchemaData],
  data() {
    return {
      materialData: Data,
      initInputData: Data.initInputData,
      
      inputGrid_1: {
        display: "grid",
        "grid-template-columns": "1fr 1fr",
        "grid-row-gap": "0px",
        "grid-column-gap": "100px"
      }
    };
  },
  computed: {
    ...mapState(["navTwoIndex"]),
     
  },
   watch: {
    // 观察菜单状态
    navTwoIndex: function(val, oldVal) {
      switch (val) {
        case 7:
          console.log(this.materialData)
          break;
      }
    }
  }
};
</script>

