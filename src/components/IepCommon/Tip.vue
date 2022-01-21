<template>
  <el-tooltip :content="content" :placement="placement" v-bind="$attrs" v-on="$listeners">
    <div v-if="content!==''" slot="content" v-html="content"></div>
    <div v-if="content===''" slot="content" v-html="message"></div>
    <i :class="icon"></i>
  </el-tooltip>
</template>
<script>
export default {
  name: "IepTip",
  props: {
    content: {
      type: String,
      // required: true,
      required: false,
    },
    message: {
      type: String,
      default: "",
    },
    placement: {
      type: String,
      default: "top",
    },
    icon: {
      type: String,
      default: "el-icon-info",
    },
  },
};
</script>
<style lang="scss" scoped>
.el-icon-info {
  font-size: 16px;
  color: $--color-text-regular;
  cursor: help;
}
</style>
