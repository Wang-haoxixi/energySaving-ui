<template>
  <div class="scroll">
    <iep-tabs v-model="type" :tab-list="tabList" @tab-click="changeType"></iep-tabs>
    <el-scrollbar :style="styleOption">
      <slot></slot>
    </el-scrollbar>
  </div>
</template>
<script>
export default {
  name: "IepTabScroll",
  props: {
    tabList: {
      type: Array,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    onData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      type:
        window.location.hash !== ""
          ? window.location.hash.slice(1)
          : this.tabList[0].value,
    };
  },
  computed: {
    styleOption() {
      return {
        height: `calc(100vh - ${this.height}px)`,
      };
    },
  },
  methods: {
    changeType(a) {
      window.location.hash = `#${a.name}`;
    },
  },
  watch: {
    onData: {
      handler() {
        if (window.location.hash) {
          const hash = window.location.hash.slice(1);
          window.location.hash = "#";
          window.location.hash = `#${hash}`;
        }
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.scroll ::v-deep .el-scrollbar__wrap {
  height: 110%;
}
</style>