<template>
  <div class="full-screen-dialog">
    <iep-basic-container v-show="!show">
      <slot name="main"></slot>
    </iep-basic-container>
    <iep-basic-container v-if="show">
      <slot name="form"></slot>
    </iep-basic-container>
  </div>
</template>
<script>
export default {
  name: "FullScreenDialog",
  data() {
    return {
      show: false,
    };
  },
  methods: {
    close() {
      this.show = false;
    },
    open() {
      this.show = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.full-screen-dialog ::v-deep .title-wrapper .left {
  font-size: 18px;
}
</style>
