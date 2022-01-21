<template>
  <div class="footer-wrapper">
    <div class="btn-group">
      <el-button type="primary" :loading="disabled" @click="submit" v-if="isSave">保存</el-button>
      <el-button @click="close" v-if="isCancel">取消</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    isSave: {
      type: Boolean,
      default: true,
    },
    isCancel: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      disabled: false,
    };
  },
  methods: {
    openDisabled() {
      this.disabled = true;
    },
    closeDisabled() {
      this.disabled = false;
    },
    submit() {
      this.$emit("submit");
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>
<style lang="scss" scoped>
.footer-wrapper {
  // position: fixed;
  // bottom: 0;
  // width: calc(100vh - 220px);
  // right: 0;
  height: 56px;
  line-height: 56px;
  padding: 0 20px;
  // border-bottom: 1px solid #d7d7d7;
  float: right;
}
</style>