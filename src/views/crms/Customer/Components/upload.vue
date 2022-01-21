<template>
  <iep-dialog
    :dialog-show="importDialogShow"
    title="上传数据"
    width="440px"
    @close="importDialogShow=false"
  >
    <div class="upload-wrapper">
      <iep-upload v-model="fileList" drag :limit="999" @on-finish="handleFinish"></iep-upload>
    </div>
    <IepFooterBar>
      <el-button @click="handleSave">保存</el-button>
    </IepFooterBar>
  </iep-dialog>
</template>
<script>
import { createPage, updatePage } from "@/api/dms/custom_plan.ts";
export default {
  data() {
    return {
      importDialogShow: false,
      fileList: [],
      files: "",
      parmas: {
        attach: "",
        resourceName: "",
        id: 0,
        planId: 0,
        clientId: 0,
        type: "file",
      },
    };
  },
  computed: {
    isEdit() {
      return this.parmas.planId ? true : false;
    },
    clientId() {
      return +this.$route.params.id;
    },
  },
  methods: {
    handleSave() {
      this.parmas.clientId = this.clientId;
      this.parmas.attach = this.files[0].url;
      this.parmas.resourceName = this.files[0].name;
      this.parmas.id = this.files[0].id;
      if (this.isEdit) {
        updatePage(this.parmas).then(data => {
          this.$emit("save", data);
          this.dialogShow = false;
        });
      } else {
        createPage(this.parmas).then(data => {
          this.$emit("save", data);
          this.dialogShow = false;
        });
      }
    },
    handleFinish(files) {
      this.files = files;
    },
  },
};
</script>
<style lang="scss" scoped>
.upload-select-wrapper {
  display: flex;
  align-items: center;
}
.upload-wrapper {
  display: flex;
  justify-content: center;
}
.file-tag {
  margin-right: 5px;
  cursor: pointer;
}
</style>
