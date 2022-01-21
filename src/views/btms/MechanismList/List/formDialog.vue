<template>
  <iep-dialog :dialog-show="importDialogShow" title="上传数据" width="500px" @close="importDialogShow=false" :is-need-confirm="false">
    <div>
      <organization-import :importFlag="importFlag" :parmasForm="parmasForm" @close="handleCloseImport"></organization-import>
    </div>
  </iep-dialog>
</template>
<script>
import organizationImport from "./organization_import";
export default {
  components: {
    organizationImport,
  },
  data() {
    return {
      importDialogShow: false,
      importFlag: true,
      parmasForm: {},
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
