<template>
  <div class="header-wrapper">
    <div class="title">{{title}}</div>
    <el-button class="iep-back-btn" v-if="isBack" @click="handleBack">返回</el-button>
  </div>
</template>
<script>
export default {
  name: "Header",
  props: {
    isBack: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: "",
      required: true,
    },
  },

  methods: {
    handleBack() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss" scoped>
.header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title {
    font-size: 18px;
    height: 18px;
    line-height: 18px;
  }
  ::v-deep .el-button {
    padding: 0;
    width: 49px;
    height: 28px;
    background: #fff;
    border: 1px solid $--border-color;
    border-radius: 5px;
  }
}
.iep-back-btn {
  &:hover,
  &:focus {
    border-color: $--border-color;
    background-color: $--background-color;
    color: $--color-text-primary;
  }
}
</style>
