<template>
  <div class="header-wrapper">
    <div class="title">{{title}}</div>
    <el-button class="iep-back-btn" type="default" v-if="isBack" @click="handleBack()">返回</el-button>
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
    isFakeBack: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    handleBack() {
      if (this.isFakeBack) {
        this.$emit("fakeBack");
        return;
      }
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
}
</style>
