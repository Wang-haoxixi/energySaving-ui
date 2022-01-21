<template>
  <iep-dialog :dialog-show="dialogShow" title="修改人名币与宝贝赠送比" width="500px" @close="_close()">
    <el-form class="iep-form-detail" :model="form" ref="form" label-width="120px">
      <iep-form-item label-name="值" prop="publicValue">
        <IepInputNumber v-model="form.publicValue" :min="1"></IepInputNumber>
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
      form: {},
    };
  },

  methods: {
    _close() {
      this.dialogShow = false;
    },
    close() {
      this.form = {};
      this._close();
      this.$emit("load-page");
    },

    async submitForm() {
      const { data } = await this.formRequestFn(this.form);
      if (data) {
        this.$message.success("操作成功");
        this.close();
      }
    },
  },
};
</script>
