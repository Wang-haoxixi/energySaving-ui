<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}`" width="500px" @close="_close()">
    <el-form :model="formData" :rules="rules" label-width="85px" ref="form">
      <iep-form-item label-name="移动至" prop="materialLevelList">
        <el-cascader
          ref="cascader"
          v-model="formData.materialLevelList"
          :options="fileData"
          :props="cascaderProps"
          @change="handleChange"
        ></el-cascader>
      </iep-form-item>
    </el-form>

    <template slot="footer">
      <el-button type="primary" @click="submitForm">保存</el-button>
      <el-button @click="_close">取消</el-button>
    </template>
  </iep-dialog>
</template>

<script>
// import { createForm, updateForm } from "@/api/dms/materialLevel";
import { moveSoMaterial } from "@/api/dms/material";

export default {
  props: {
    fileData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      formData: {
        materialLevelList: "",
      },
      methodName: "新增",
      rules: {
        materialLevelList: [
          { required: true, message: "必填", trigger: "change" },
        ],
      },
      dialogShow: false,
      cascaderProps: {
        checkStrictly: true,
        value: "id",
        label: "levelName",
        children: "childrens",
      },
    };
  },
  methods: {
    loadData(ids) {
      this.formData.ids = ids;
      this.dialogShow = true;
    },
    _close() {
      this.dialogShow = false;
      this.formData = { materialLevelList: "" };
    },
    close() {
      this._close();
      this.$emit("load-page", true);
    },
    handleChange() {
      this.$refs["cascader"].toggleDropDownVisible();
    },
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          const row = { ...this.formData };
          row.materialLevelId =
            row.materialLevelList[row.materialLevelList.length - 1];
          moveSoMaterial(row).then(({ data }) => {
            if (data) {
              this.$message.success("移动成功！");
              this.close();
            } else {
              this.$message.error("操作失败");
            }
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
