<template>
  <iep-dialog :dialog-show="dialogShow" title="预览纪要" width="80%" @close="resetForm">
    <detail-form ref="detail" detail-state @backPage="resetForm"></detail-form>
  </iep-dialog>
</template>

<script>
import DetailForm from "./detail";
import { initFormData } from "./options";

export default {
  components: { DetailForm },
  data() {
    return {
      dialogShow: false,
      formData: initFormData(),
    };
  },
  methods: {
    open(data) {
      this.dialogShow = true;
      // this.$nextTick(() => {
      setTimeout(() => {
        // 需要稍微处理下正在填写的数据，变成可以预览的数据
        this.formData.host = this.formData.hostList;
        this.$refs["detail"].handleDealData(
          Object.assign({}, this.formData, data),
          true,
        );
      });
    },
    resetForm() {
      this.dialogShow = false;
    },
  },
};
</script>
