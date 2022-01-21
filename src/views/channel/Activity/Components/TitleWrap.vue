<template>
  <div>
    <div class="title-wrap" :style="{justifyContent:justify}">
      <div class="title">{{name}}</div>
      <el-link v-if="moreLink" class="more-btn" @click="$openPage(moreLink)">更多</el-link>
    </div>
    <div class="box-wrap" :class="`grid-col${gridCols}`">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "TitleWrap",
  props: {
    name: {
      type: String,
      required: true,
    },
    moreLink: {
      type: String,
      default: "",
    },
    justify: {
      type: String,
      default: "space-between",
    },
    gridCols: {
      type: String,
      default: "4",
    },
  },
};
</script>
<style lang="scss" scoped>
.title-wrap {
  display: flex;
  .title {
    font-size: 18px;
    font-family: "微软雅黑";
    color: $--color-text-primary;
    line-height: 18px;
  }
}
.box-wrap {
  display: grid;
  // grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
  margin-top: 30px;
}
.grid-col2 {
  grid-template-columns: 1fr 1fr;
}
.grid-col3 {
  grid-template-columns: 1fr 1fr 1fr;
}
.grid-col4 {
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
</style>
