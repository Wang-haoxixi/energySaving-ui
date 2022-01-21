<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}`" width="500px" @close="_close()">
    <el-form class="iep-form-detail" :model="form" ref="form" label-width="80px">
      <iep-form-item label-name="菜单名称" prop="name">
        <el-input v-model="form.label" placeholder="请输入菜单名称"></el-input>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <el-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">保存</el-button>
      <el-button @click="_close()">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import formMixins from "@/mixins/formMixins";
export default {
  mixins: [formMixins],
  data() {
    return {
      dialogShow: false,
      formRequestFn: () => {},
      methodName: "创建",
      form: { id: 0, label: "", number: "" },
      options: [],
    };
  },
  methods: {
    _close() {
      this.dialogShow = false;
    },
    close() {
      this.form = { label: "" };
      this._close();
      this.$emit("load-page");
    },
    async submitForm() {
      const res = await this.formRequestFn(this.form);
      if (res.data) {
        this.$message.success("操作成功");
        this.close();
      } else {
        this.$message(res.message);
      }
    },
  },
};
</script>
