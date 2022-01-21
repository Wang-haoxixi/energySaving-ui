<template>
  <iep-dialog
    :dialog-show="dialogShow"
    :title="`${methodName}等级配置`"
    width="500px"
    @close="_close()"
  >
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      class="iep-form-detail"
      label-width="120px"
      :disabled="disabled"
    >
      <iep-form-item label-name="等级" prop="rank">
        <iep-input-number v-model="form.rank"></iep-input-number>
      </iep-form-item>
      <iep-form-item label-name="等级余额区间" prop="bail">
        <iep-input-number v-model="form.bail"></iep-input-number>
      </iep-form-item>
      <iep-form-item label-name="产品折扣率" prop="discountRate">
        <iep-input-amount v-model="form.discountRate" unit="%"></iep-input-amount>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <el-button
        v-show="disEdit"
        type="primary"
        :loading="submitFormLoading"
        @click="mixinsSubmitFormGen()"
      >保存</el-button>
      <el-button @click="_close()">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import formMixins from "@/mixins/formMixins";
import { initForm, rules } from "./option";
export default {
  mixins: [formMixins],
  data() {
    return {
      dialogShow: false,
      disabled: false,
      disEdit: false,
      formRequestFn: () => {},
      methodName: "新增",
      form: initForm(),
      rules,
      rankId: "",
    };
  },
  methods: {
    _close() {
      this.dialogShow = false;
    },
    close() {
      this.form = initForm();
      this._close();
      this.$emit("load-page");
    },
    async submitForm() {
      const { data } = await this.formRequestFn({
        ...this.form,
        rankId: this.rankId,
      });
      if (data) {
        this.$message.success("操作成功");
        this.close();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.isAsset {
  color: red;
}
</style>
