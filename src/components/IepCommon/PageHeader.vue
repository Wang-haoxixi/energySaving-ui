<template>
  <div class="title-wrapper">
    <div class="title-col">
      <div class="left">
        <span
          v-if="!isAdvance"
          class="page-title"
          :style="{fontSize: `${titleSize}px`,fontWeight: titleWeight}"
        >{{title}}</span>
        <span v-if="!isAdvance" class="page-desc">{{desc}}</span>
        <slot name="left"></slot>
        <slot v-if="isAdvance" name="custom"></slot>
      </div>
      <div class="right">
        <iep-operation-wrapper style="display: flex;">
          <slot></slot>
          <el-button class="iep-back-btn" v-if="backOption.isBack" @click="handleBack" plain>返回</el-button>
        </iep-operation-wrapper>
      </div>
    </div>
    <div class="sub-col">
      <slot name="sub"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "IepPageHeader",
  props: {
    isAdvance: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "标题",
    },
    titleSize: {
      type: Number,
      default: 20,
    },
    titleWeight: {
      type: Number,
      default: 400,
    },
    replaceText: {
      type: Function,
      default: () => {},
    },
    data: {
      type: Array,
      default: () => [],
    },
    backOption: {
      type: Object,
      default: () => {
        return {
          isBack: false,
          backPath: "",
          backFunction: () => {},
        };
      },
    },
  },
  computed: {
    desc() {
      return this.replaceText(this.data);
    },
  },
  methods: {
    handleBack() {
      if (this.backOption.backFunction) {
        this.backOption.backFunction();
        return;
      } else {
        if (window.history.length <= 1) {
          this.$router.push({ path: "/" });
          return false;
        } else {
          this.$router.history.go(-1);
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.title-wrapper {
  margin-bottom: 20px;
  .title-col {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      flex: 1;
    }
    .page-title {
      display: inline-block;
      vertical-align: middle;
      margin-right: 10px;
      font-size: 18px !important;
      line-height: 18px;
    }
    .page-desc {
      font-size: 14px;
    }
  }
}
</style>
