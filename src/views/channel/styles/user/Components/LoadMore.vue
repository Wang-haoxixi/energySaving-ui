<template>
  <div class="load-more">
    <el-link :underline="false" @click="_openPage(path)">点击加载更多</el-link>
  </div>
</template>
<script>
export default {
  props: ["path"],
  methods: {
    _openPage(suffix = "index") {
      this.$openPage(`/channel/styles/user/${this.$route.params.id}/${suffix}`);
    },
  },
};
</script>
<style lang="scss" scoped>
.load-more {
  ::v-deep .el-link {
    display: flex;
    align-items: flex-end;
    flex: 1;
    span {
      height: 14px;
      line-height: 14px;
    }
  }
}
</style>
