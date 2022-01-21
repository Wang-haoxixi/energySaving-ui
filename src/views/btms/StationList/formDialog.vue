<template>
  <iep-dialog
    :dialog-show="importDialogShow"
    title="上传数据"
    width="500px"
    @close="importDialogShow=false"
    :is-need-confirm="false"
  >
    <div>
      <position-import :parmasForm="parmasForm" @close="handleCloseImport"></position-import>
    </div>
  </iep-dialog>
</template>
<script>
import PositionImport from "./position_import";
export default {
  components: {
    PositionImport,
  },
  data() {
    return {
      importDialogShow: false,
      parmasForm: {},
    };
  },
  methods: {
    handleCloseImport(res) {
      this.importDialogShow = false;
      this.$emit("load-page");
      if (res.data) {
        this.$message({
          message: `导入成功!`,
          type: "success",
        });
      } else {
        this.$message({
          message: `警告!${res.msg}`,
          type: "warning",
        });
      }
    },
  },
};
</script>
