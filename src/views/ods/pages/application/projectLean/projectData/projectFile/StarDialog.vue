<template>
  <iep-dialog :dialog-show="dialogShow" :title="`客观评分`" width="80%" @close="close">
    <div style="width:616px;height:408px;margin:auto">
      <img src="./images/star.png" />
    </div>
  </iep-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialogShow: false,
    };
  },
  computed: {},
  mounted() {},
  methods: {
    open() {
      this.dialogShow = true;
    },
    close() {
      this.dialogShow = false;
      this.$emit("load-page");
    },
  },
};
</script>
<style lang="scss" scoped>
</style>