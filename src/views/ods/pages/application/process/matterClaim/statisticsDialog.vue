<template>
  <iep-dialog :dialog-show="dialogShow" :title="`认领统计`" width="40%" @close="close">
    <p>已认领部门有5个：</p>
    <p>省政府</p>
    <p>济宁市应急管理局</p>
    <p>东营市应急管理局</p>
    <p>济南市应急管理局</p>
    <p>青岛市应急管理局</p>
  </iep-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialogShow: false,
    };
  },
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