<template>
  <div ref="iep-relation-chart" class="iep-relation-chart"></div>
</template>
<script>
import RelationChart from "./index.js";

export default {
  name: "IepRelationChart",
  props: {
    requestFn: {
      type: Function,
      required: true,
    },
    config: {
      type: Object,
      default: () => {},
    },
    handleAvatarClick: {
      type: Function,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      data: {},
    };
  },
  methods: {
    async load() {
      this.$emit("update:loading", true);
      const { data } = await this.requestFn();
      if (data) {
        this.data = data;
        const config = {
          ...this.config,
          handleAvatarClick: this.handleAvatarClick,
        };
        new RelationChart(this.$refs["iep-relation-chart"], data, config);
      }
      this.$emit("update:loading", false);
    },
    updateChart() {
      const chart = this.$refs["iep-relation-chart"];
      //如果原先有元素，先清除
      chart.children.length &&
        chart.children.forEach(m => {
          chart.removeChild(m);
        });
      const config = {
        ...this.config,
        handleAvatarClick: this.handleAvatarClick,
      };
      new RelationChart(this.$refs["iep-relation-chart"], this.data, config);
    },
    init() {
      this.load();
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="scss" scoped>
.iep-relation-chart {
  width: 100%;
  height: 500px;
  ::v-deep .svgclass {
    height: 100%;
    width: 100%;
  }
}
</style>