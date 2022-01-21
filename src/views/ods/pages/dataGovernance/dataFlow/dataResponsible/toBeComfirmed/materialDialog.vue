<template>
  <iep-dialog :dialog-show="dialogShow" :title="`数源部门确认材料`" width="80%" @close="close">
    <el-form
      class="iep-form-detail"
      :model="form"
      ref="form"
      label-width="140px"
      :disabled="dialogStatus==='detail'"
    >
      <iep-form-item label-name="数源部门材料名称" prop="cmaterialName" class="half-line">
        <el-input v-model.trim="form.cmaterialName"></el-input>
      </iep-form-item>
      <iep-form-item label-name="数源部门材料类别" prop="cmaterialKind" class="half-line">
        <el-select v-model.trim="form.cmaterialKind">
          <el-option
            v-for="item in materialKindDict"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </iep-form-item>
      <iep-form-item label-name="数源部门信息项" prop="citemName" class="half-line">
        <el-input v-model="form.citemName"></el-input>
      </iep-form-item>
      <iep-form-item label-name="数源部门备注" prop="cdesc" class="half-line">
        <el-input v-model="form.cdesc" type="textarea"></el-input>
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
import { initForm } from "./option";
export default {
  data() {
    return {
      dialogShow: false,
      form: initForm(),
      methodName: "新增",
      materialKindDict: [
        { label: "表格类", value: "1" },
        { label: "证明类", value: "2" },
        { label: "批文类", value: "3" },
        { label: "证照类", value: "4" },
        { label: "其他类", value: "5" },
      ],
      yesNoDict: [
        { label: "是", value: "1" },
        { label: "否", value: "2" },
      ],
    };
  },
  props: {
    dialogStatus: {
      type: String,
      default: "detail",
    },
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
