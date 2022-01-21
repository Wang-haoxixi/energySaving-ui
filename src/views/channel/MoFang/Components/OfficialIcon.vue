<template>
  <span class="official" :class="{textBox:isText}" title="官方认证">
    <i class="el-icon-woneng-icon_guanfang"></i>
    <span v-if="isText">官方认证</span>
  </span>
</template>
<script>
export default {
  name: "OfficialIcon",
  props: {
    isText: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss" scoped>
.text-box {
  background: rgba(244, 245, 246, 1);
  border-radius: 10px;
  width: 107px;
  margin-left: 10px;
  height: 30px;
}
.official {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  height: 18px;
  margin-left: 5px;
  span {
    font-size: 14px;
    color: $--color-text-regular;
  }
  i {
    margin-right: 5px;
    font-size: 20px;
    color: $--color-secondary;
  }
}
</style>
