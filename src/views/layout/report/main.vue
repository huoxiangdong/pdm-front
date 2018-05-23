<template lang="pug">
     <div id="c1"></div>
</template>

<script>
import G6 from "@antv/g6";
export default {
  data() {
    return {
      data: {
        nodes: [
          {
            x: 140,
            y: 210,
            id: "node1"
          },
          {
            x: 270,
            y: 210,
            id: "node2"
          }
        ],
        edges: [
          {
            source: "node1",
            id: "edge1",
            target: "node2"
          }
        ]
      }
    }
  },
  mounted: function () {
   this.$nextTick(function () {
    const net = new G6.Net({
          id: 'c1',      // 容器ID
          width: 800,    // 画布宽
          height: 800   // 画布高
        });
      // 第五步：载入数据
      net.source(this.data.nodes, this.data.edges);
      // 第六步：渲染关系图
      net.render();
  })
}
};
</script>

<style>
</style>
