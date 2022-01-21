<template>
  <div class="action-box-img" @click="$openPage(`/channel/activity/detail/${scope.row.id}`)">
    <iep-img :resizeOpt="{l:160}" :src="scope.row.poster"></iep-img>
  </div>
</template>
<script>
export default {
  name: "ActivityImgColumn",
  props: {
    scope: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.action-box-img {
  cursor: pointer;
  display: flex;
  width: 160px;
  height: 96px;
  background-color: #fff;
  border-radius: $--border-radius-base;
  border: 1px solid $--border-color;
  box-sizing: border-box;
  &:hover {
    opacity: 0.8;
  }
}
</style>
