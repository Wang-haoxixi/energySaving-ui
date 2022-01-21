<template>
  <iep-dialog
    :dialog-show="dialogShow"
    title="投票配置"
    width="500px"
    @close="_close()"
    @mounted="load()"
  >
    <el-form class="iep-form-detail" :rules="rules" :model="form" ref="form" label-width="115px">
      <iep-form-item label-name="每轮周期" prop="cycle">
        <iep-input-number v-model="form.cycle"></iep-input-number>
      </iep-form-item>
      <iep-form-item label-name="一等奖奖金" prop="firstPrize">
        <iep-input-number v-model="form.firstPrize"></iep-input-number>
      </iep-form-item>
      <iep-form-item label-name="一等奖人数" prop="firstNumber">
        <iep-input-number v-model="form.firstNumber"></iep-input-number>
      </iep-form-item>
      <iep-form-item label-name="二等奖奖金" prop="secondPrize">
        <iep-input-number v-model="form.secondPrize"></iep-input-number>
      </iep-form-item>
      <iep-form-item label-name="二等奖人数" prop="secondNumber">
        <iep-input-number v-model="form.secondNumber"></iep-input-number>
      </iep-form-item>
      <iep-form-item label-name="三等奖奖金" prop="thirdPrize">
        <iep-input-number v-model="form.thirdPrize"></iep-input-number>
      </iep-form-item>
      <iep-form-item label-name="三等奖人数" prop="thirdNumber">
        <iep-input-number v-model="form.thirdNumber"></iep-input-number>
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
import { getVoteSetting, putVoteSetting } from "@/api/fms/vote";
class VoteSettingEntity {
  id = 0;
  firstPrize = 0;
  firstNumber = 0;
  secondPrize = 0;
  secondNumber = 0;
  thirdPrize = 0;
  thirdNumber = 0;
  cycle = 0;
}
export default {
  mixins: [formMixins],
  data() {
    return {
      dialogShow: false,
      form: new VoteSettingEntity(),
      rules: {
        cycle: [{ required: true, message: "必填项", trigger: "blur" }],
        firstPrize: [{ required: true, message: "必填项", trigger: "blur" }],
        firstNumber: [{ required: true, message: "必填项", trigger: "blur" }],
        secondPrize: [{ required: true, message: "必填项", trigger: "blur" }],
        secondNumber: [{ required: true, message: "必填项", trigger: "blur" }],
        thirdPrize: [{ required: true, message: "必填项", trigger: "blur" }],
        thirdNumber: [{ required: true, message: "必填项", trigger: "blur" }],
      },
    };
  },

  methods: {
    _close() {
      this.dialogShow = false;
    },
    close() {
      this.form = new VoteSettingEntity();
      this._close();
      this.$emit("load-page");
    },
    async submitForm() {
      const { data } = await putVoteSetting(this.form);
      if (data) {
        this.$message.success("操作成功");
        this.close();
      }
    },
    async load() {
      const { data } = await getVoteSetting();
      this.form = this.$mergeByFirst(new VoteSettingEntity(), data);
    },
  },
};
</script>
