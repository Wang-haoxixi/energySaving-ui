<template>
  <div class="container">
    <div class="header-box">
      <div class="title">{{title}}</div>
      <el-link class="more" v-if="moreLink" @click="$openPage(moreLink)">更多</el-link>
    </div>
    <div class="content-box">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    moreLink: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  margin: 0 auto;
  width: 1200px;
  .header-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    .title {
      font-size: 18px;
    }
    .more {
      font-size: 14px;
      color: $--color-text-secondary;
      &:hover {
        color: $--color-primary;
      }
    }
  }
  .content-box {
  }
}
</style>
