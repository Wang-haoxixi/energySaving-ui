<template>
  <i :class="`icon el-icon-woneng-hongdu${redness} iep-hongdu-v${redness}`"></i>
</template>
<script>
export default {
  name: "IepRednessIcon",
  props: ["redness"],
};
</script>
<style lang="scss" scoped>
.icon {
  margin-left: 3px;
  font-size: 16px;
}
</style>
