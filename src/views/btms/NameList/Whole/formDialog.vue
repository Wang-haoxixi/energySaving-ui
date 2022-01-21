<template>
  <iep-dialog :dialog-show="importDialogShow" title="上传数据" width="500px" @close="importDialogShow=false" :is-need-confirm="false">
    <div>
      <name-import @close="handleCloseImport"></name-import>
    </div>
  </iep-dialog>
</template>
<script>
import nameImport from "./name_import";
export default {
  components: {
    nameImport,
  },
  data() {
    return {
      importDialogShow: false,
    };
  },
  methods: {
    handleCloseImport(res) {
      this.importDialogShow = false;
      this.$emit("load-page");
      if (res.data) {
        this.$message({
          message: `成功!${res.msg}`,
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
