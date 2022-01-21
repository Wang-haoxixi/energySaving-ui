<template>
  <el-input-number
    :class="{'bei-unit':bei}"
    class="iep-input-number-wrapper"
    :precision="precision"
    :min="min"
    :max="max"
    :controls="false"
    :data-text="unit"
    v-bind="$attrs"
    v-on="$listeners"
  ></el-input-number>
</template>
<script>
export default {
  name: "IepInputAmount", // iep-input-amount
  inheritAttrs: false,
  props: {
    bei: {
      type: Boolean,
      default: true,
    },
    unit: {
      type: String,
      default: "贝",
    },
    precision: {
      type: Number,
      default: 2,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 999999999,
    },
  },
};
</script>

<style lang="scss" scoped>
.iep-input-number-wrapper ::v-deep .el-input__inner {
  text-align: left;
}
.bei-unit::after {
  content: attr(data-text);
  position: absolute;
  right: 1px;
  top: 1px;
  width: $--input-height;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: $--background-color;
  font-size: 12px;
  border-radius: 0 $--border-radius-base $--border-radius-base 0;
  border: solid $--border-color;
  border-width: 0 0 0 1px;
}
</style>
