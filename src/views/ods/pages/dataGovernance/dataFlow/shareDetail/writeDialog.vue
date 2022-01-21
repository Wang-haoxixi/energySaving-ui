<template>
  <iep-dialog :dialog-show="dialogShow" :title="`填写`" width="80%" @close="close">
    <el-form class="iep-form-detail" :model="form" ref="form" label-width="120px" :rules="rules">
      <iep-form-item label-name="数据更新周期" prop="updatePeriod" class="half-line">
        <el-select v-model.trim="form.updatePeriod">
          <el-option
            v-for="item in updatePeriodDict"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <iep-operation-wrapper>
        <el-button type="primary" @click="handleSubmit()">保存</el-button>
      </iep-operation-wrapper>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm, rules } from "./option";
export default {
  data() {
    return {
      dialogShow: false,
      form: initForm(),
      updatePeriodDict: [
        { label: "每日", value: "1" },
        { label: "每周", value: "2" },
        { label: "每月", value: "3" },
        { label: "每季度", value: "4" },
        { label: "每半年", value: "5" },
        { label: "每年", value: "6" },
        { label: "不更新", value: "7" },
        { label: "不定期", value: "8" },
      ],
      rules,
    };
  },
  methods: {
    handleSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.close();
        }
      });
    },
    open(row) {
      this.form = row;
    },
    close() {
      this.dialogShow = false;
      this.$emit("load-page");
    },
  },
};
</script>
<style lang="scss" scoped>
.half-line {
  width: 50%;
  display: inline-block;
}
.full-width {
  width: 100%;
}
</style>
