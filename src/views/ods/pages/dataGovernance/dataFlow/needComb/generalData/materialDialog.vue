<template>
  <iep-dialog :dialog-show="dialogShow" :title="`材料`" width="80%" @close="close">
    <el-form
      class="iep-form-detail"
      :model="form"
      ref="form"
      label-width="120px"
      :disabled="dialogStatus==='detail'"
    >
      <iep-form-item label-name="材料名称" prop="materialName" class="half-line">
        <el-input v-model.trim="form.materialName" :disabled="true"></el-input>
      </iep-form-item>
      <iep-form-item label-name="材料类别" prop="materialKind" class="half-line">
        <el-select v-model.trim="form.materialKind" :disabled="true">
          <el-option
            v-for="item in materialKindDict"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </iep-form-item>
      <iep-form-item label-name="是否有信息项" prop="hasItem" class="half-line">
        <el-radio-group v-model="form.hasItem" :disabled="true">
          <el-radio v-for="item in yesNoDict" :key="item.value" :label="item.value">{{item.label}}</el-radio>
        </el-radio-group>
      </iep-form-item>
      <iep-form-item label-name="数源部门" prop="markOrgs" class="half-line">
        <el-input v-model="form.markOrgs"></el-input>
      </iep-form-item>
      <iep-form-item label-name="备注" prop="desc" class="half-line">
        <el-input v-model="form.desc"></el-input>
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
