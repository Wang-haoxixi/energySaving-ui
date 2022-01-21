<template>
  <iep-dialog :dialog-show="dialogShow" :title="`变更${methodName}`" width="600px" @close="loadPage">
    <el-form :model="form" ref="form" :rules="rules" class="form-detail" label-width="95px">
      <iep-form-item label-name="项目经理" v-if="form.pubilsh==false||form.pubilsh==''">
        <IepUserInput v-model="form.projectManagerList"></IepUserInput>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <iep-operation-wrapper>
        <el-button type="primary" @click="updateForm()">确定</el-button>
        <iep-button @click="loadPage">取消</iep-button>
      </iep-operation-wrapper>
    </template>
  </iep-dialog>
</template>
<script>
import { initTransferForm, rules } from "./option";
import { transferManagerList } from "@/api/gpms/index";
import formMixins from "@/mixins/formMixins";
export default {
  mixins: [formMixins],
  data() {
    return {
      dialogShow: false,
      methodName: "项目指导",
      formRequestFn: () => {},
      form: initTransferForm(),
      rules,
      ids: [],
    };
  },
  computed: {},
  methods: {
    loadPage() {
      this.form = initTransferForm();
      this.dialogShow = false;
      this.$emit("load-page");
    },
    updateForm() {
      const ids = this.form.projectManagerList.id;
      // this.form.pubilsh==true ? ids=0 : ids
      const obj = {
        userId: ids,
        ids: this.ids,
      };
      // if (this.form.pubilsh == true) {
      //   this.$confirm(
      //     "项目移入公海后，将不能在我的项目中进行管理。是否确定?",
      //     "提示",
      //     {
      //       confirmButtonText: "确定",
      //       cancelButtonText: "取消",
      //     },
      //   ).then(() => {
      //     statusCancel(this.ids).then(() => {
      //       this.$message.success("移入公海成功！");
      //       this.loadPage();
      //     });
      //   });
      // } else {
      this.$confirm(
        "项目移交后，将不能在我的项目中进行管理。是否确定?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        },
      ).then(() => {
        transferManagerList(obj).then(res => {
          if (res.data) {
            this.$message.success("移交成功");
            this.loadPage();
          }
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.isAsset {
  color: red;
}
</style>
