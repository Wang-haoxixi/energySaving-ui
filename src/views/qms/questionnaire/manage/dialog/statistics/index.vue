<template>
  <div class="statistics-wrapper">
    <div-header title="统计" isBack @back="onBack"></div-header>
    <div-content ref="content"></div-content>
  </div>
</template>
<script>
import DivHeader from "../components/header";
import DivContent from "./components/content";
export default {
  components: {
    DivHeader,
    DivContent,
  },
  data() {
    return {
      data: [],
      menuList: [],
    };
  },
  methods: {
    open(id) {
      if (id) {
        this.$refs.content.getList(id);
      }
    },
    onBack() {
      // this.$refs.divContent.resetData();
      this.$emit("close");
    },
  },
};
</script>
<style lang="scss" scoped>
.statistics-wrapper ::v-deep .title-wrapper {
  margin-bottom: 0;
}
</style>