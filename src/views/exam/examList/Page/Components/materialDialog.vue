<template>
  <iep-dialog
    :dialog-show="dialogShow"
    :title="dialogTitle"
    width="800px"
    @close="_close()"
    append-to-body
  >
    <detail-tpl ref="detail" cType="1"></detail-tpl>
  </iep-dialog>
</template>
<script>
import DetailTpl from "@/views/mlms/material/detail";

export default {
  components: { DetailTpl },
  data() {
    return {
      dialogShow: false,
      dialogTitle: "学习材料",
    };
  },
  methods: {
    open(id) {
      this.dialogShow = true;
      this.$nextTick(() => {
        const detail = this.$refs["detail"];
        detail.backOption = { isBack: false };
        detail.open(id);
      });
    },
    _close() {
      this.dialogShow = false;
    },
  },
};
</script>