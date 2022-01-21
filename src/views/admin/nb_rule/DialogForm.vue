<template>
  <iep-dialog
    class="dialog"
    :dialog-show="dialogShow"
    :title="`${methodName}`"
    width="620px"
    @close="_close()"
  >
    <el-form class="iep-form-detail" :model="form" :rules="rules" ref="form" label-width="115px">
      <iep-form-item label-name="规则名称" prop="ruleName">
        <el-input v-model="form.ruleName" placeholder="请输入规则名称"></el-input>
      </iep-form-item>
      <iep-form-item label-name="规则编码" prop="number">
        <el-input v-model="form.number" placeholder="请输入规则编码"></el-input>
      </iep-form-item>
      <iep-form-item label-name="动作(fms_block_chain_flow)" prop="action">
        <iep-dict-select v-model="form.action" dict-name="fms_block_chain_flow"></iep-dict-select>
      </iep-form-item>
      <iep-form-item label-name="分类(fms_block_chain_rule)" prop="type">
        <iep-dict-select v-model="form.type" dict-name="fms_block_chain_rule"></iep-dict-select>
      </iep-form-item>
      <iep-form-item label-name="每日上限次数" prop="dailyLimit">
        <iep-input-number v-model="form.dailyLimit"></iep-input-number>
      </iep-form-item>
      <iep-form-item label-name="宝贝值" prop="score">
        <iep-input-amount v-model="form.score"></iep-input-amount>
      </iep-form-item>
      <iep-form-item label-name="支付对象" prop="payObject">
        <el-radio-group v-model="form.payObject">
          <el-radio
            v-for="(label, value) in dictsMap.payObject"
            :key="value"
            :label="value"
          >{{label}}</el-radio>
        </el-radio-group>
      </iep-form-item>
      <iep-form-item label-name="是否首次奖励" prop="isFirstReward">
        <el-switch
          v-model="form.isFirstReward"
          active-color="#13ce66"
          active-value="1"
          inactive-value="0"
        ></el-switch>
      </iep-form-item>
      <iep-form-item label-name="描述" prop="remarks">
        <iep-input-area v-model="form.remarks" placeholder="请输入规则描述"></iep-input-area>
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
import { RuleDTO, rules, dictsMap } from "./options";
export default {
  mixins: [formMixins],
  data() {
    return {
      dictsMap,
      dialogShow: false,
      formRequestFn: () => {},
      methodName: "",
      form: new RuleDTO(),
      rules,
    };
  },
  methods: {
    _close() {
      this.dialogShow = false;
    },
    close() {
      this.form = new RuleDTO();
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
<style lang="scss" scoped>
.dialog ::v-deep .el-dialog__body .el-scrollbar .wrap-dialog {
  margin-right: -10px !important;
}
</style>