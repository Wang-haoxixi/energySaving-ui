<template>
  <el-card class="box-card" :shadow="shadow" v-bind="$attrs" v-on="$listeners">
    <div v-if="!!title" slot="header" class="clearfix">
      <span class="title">{{title}}</span>
      <span class="sub">{{sub}}</span>
      <el-button v-if="isMore" class="more" type="text">{{button?button:'更多>>'}}</el-button>
    </div>
    <div>
      <slot></slot>
    </div>
  </el-card>
</template>
<script>
export default {
  name: "IepCard",
  props: {
    title: {
      type: String,
      required: false,
    },
    sub: {
      type: String,
      required: false,
    },
    isMore: {
      type: Boolean,
      default: false,
    },
    button: {
      type: String,
      required: false,
    },
    shadow: {
      type: String,
      default: "hover",
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 18px;
}
.box-card ::v-deep .el-card__header {
  margin: 0 20px;
  height: 54px;
  padding: 18px 0;
  border-bottom: 0;
}
.sub {
  font-size: 14px;
  color: $--color-text-secondary;
}
.more {
  float: right;
  padding: 3px 0;
  color: $--color-text-secondary;
  &:hover {
    text-decoration: underline;
    color: $--color-primary;
  }
}
</style>
