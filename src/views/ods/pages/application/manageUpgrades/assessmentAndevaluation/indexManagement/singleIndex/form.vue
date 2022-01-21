<template>
  <div class="iep-page-form">
    <iep-page-header title :backOption="backOption" v-if="!isDialog"></iep-page-header>
    <el-button class="copy-btn" type="primary">复制已有指标</el-button>
    <el-form
      :model="formData"
      :rules="rules"
      ref="form"
      label-width="150px"
      class="form-detail"
      :disabled="formStatus==='detail'"
    >
      <el-form-item label="指标名称:" prop="val1" class="half-line">
        <el-input v-model="formData.val1" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="评测方式:" prop="val2" class="half-line">
        <el-input v-model="formData.val2" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="指标描述:" prop="val3" class="half-line">
        <el-input v-model="formData.val3" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="评分细则:" prop="val4" class="half-line">
        <el-input v-model="formData.val4" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="设定依据:" prop="val5" class="half-line">
        <el-input v-model="formData.val5" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="备注:" prop="val6" class="half-line">
        <el-input v-model="formData.val6" maxlength="150"></el-input>
      </el-form-item>
      <iep-footer-bar v-if="!isDialog && formStatus != 'detail'">
        <el-button type="primary" @click="submitForm" :loading="loadState">保存</el-button>
        <iep-button @click="dialogShow = false">取消</iep-button>
      </iep-footer-bar>
    </el-form>
  </div>
</template>
<script>
import { initForm, status, rules } from "./const/options";
export default {
  props: {
    isDialog: {
      type: Boolean,
      default: false,
    },
    formStatus: {
      type: String,
      default: "create",
    },
  },
  data() {
    return {
      status,
      formData: {},
      rules,
      loadState: false,
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.$emit("load-page", false);
        },
      },
    };
  },
  methods: {
    // 打开
    open(row) {
      this.formData = row;
      console.log(row, rules);
    },
    loadPage() {
      this.$emit("load-page", true);
    },
    // 重置
    resetForm() {
      this.$refs["form"].resetFields();
      this.formData = initForm();
      this.dialogShow = false;
    },
    // 提交
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loadState = true;
          // // const row = { ...this.formData };
          // this.methodList[this.methodName].requestFn(row).then(({ data }) => {
          //   this.loadState = false;
          //   if (!data) {
          //     this.$message.error(data.msg);
          //   } else {
          if (this.formStatus == "create") {
            this.$message.success("新增成功");
          } else {
            this.$message.success("编辑成功");
          }
          this.loadPage();
          this.dialogShow = false;
        }
        //   });
        // } else {
        //   this.loadState = false;
        //   return false;
        // }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.copy-btn {
  float: right;
}
.iep-page-form .el-form {
  margin-top: 80px;
}
</style>