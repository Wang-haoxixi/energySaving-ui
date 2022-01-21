<template>
  <iep-dialog :dialog-show="dialogShow" title="规则配置" width="500px" @close="_close()">
    <el-form class="iep-form-detail" :model="form" :rules="rules" ref="form" label-width="120px">
      <iep-form-item label-name="魔方分成比例" prop="1">
        <div class="flex-column">
          <div class="flex-box">
            <iep-input-number class="input-item" v-model="form['1']" placeholder="请输入分成比例" unit="%"></iep-input-number>
          </div>
        </div>
      </iep-form-item>
      <iep-form-item label-name="活动分成比例" prop="2">
        <div class="flex-column">
          <div class="flex-box">
            <iep-input-number class="input-item" v-model="form['2']" placeholder="请输入分成比例" unit="%"></iep-input-number>
          </div>
        </div>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <el-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">保存</el-button>
      <el-button @click="_close()">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import { updateFmsParamConfig } from "@/api/fms/order";
import { initParamForm } from "./options";
import formMixins from "@/mixins/formMixins";
export default {
  mixins: [formMixins],
  data() {
    return {
      dialogShow: false,
      form: initParamForm(),
      rules: {
        "1": [
          { required: true, message: "请输入分成比例", trigger: "change" },
          {
            type: "number",
            min: 1,
            max: 100,
            message: "分成比例大于 1 %，小于等于 100 %",
          },
        ],
        "2": [
          { required: true, message: "请输入分成比例", trigger: "change" },
          {
            type: "number",
            min: 1,
            max: 100,
            message: "分成比例大于 1 %，小于等于 100 %",
          },
        ],
      },
    };
  },
  methods: {
    async submitForm() {
      const { data } = await updateFmsParamConfig(this.form);
      if (data) {
        this.$message.success("操作成功");
        this.close();
      }
    },
    _close() {
      this.dialogShow = false;
    },
    close() {
      this.form = initParamForm();
      this._close();
      this.$emit("load-page");
    },
  },
};
</script>
<style lang="scss" scoped>
.iep-form-detail {
  margin-top: 30px;
}
.flex-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .input-item {
    flex: 0 0 300px;
  }
}
</style>
