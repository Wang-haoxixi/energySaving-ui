<template>
  <div class="wrapper">
    <div class="title-wrapper">
      <div class="title">
        {{title}}
        <span>{{num}}</span>
        <slot name="left"></slot>
      </div>
      <slot name="right">
        <span class="sub-title">{{subTitle}}</span>
      </slot>
    </div>
    <div class="content-wrapper">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "IepWrapper",
  props: {
    title: {
      type: String,
      default: "",
    },
    num: {
      type: String,
      default: "",
    },
    subTitle: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  padding: 20px;
  height: 100%;
  box-sizing: border-box;
  .title-wrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding-bottom: 20px;
    line-height: 24px;
    .title {
      font-size: 16px;
      font-family: "微软雅黑";
      color: $--color-text-primary;
      span {
        color: $--color-text-regular;
      }
    }
    .right {
      font-size: 14px;
      color: $--color-primary;
      cursor: pointer;
    }
    .sub-title {
      font-size: 14px;
      color: $--color-text-secondary;
      cursor: pointer;
      &:hover {
        color: $--color-primary;
      }
    }
  }
  .content-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: calc(100% - 45px);
    .wrapper {
      padding: 10px 0;
    }
  }
}
</style>
