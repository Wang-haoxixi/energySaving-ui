<template>
  <iep-dialog
    :dialog-show="dialogVisible"
    title="下架理由"
    width="450px"
    center
    @close="resetForm"
    closeOnClickModal
  >
    <el-form :model="formData" :rules="rules" ref="form" label-width="95px" class="form-detail">
      <iep-form-item label-name="下架理由" prop="reason">
        <el-input
          v-model="formData.reason"
          type="textarea"
          :rows="3"
          maxlength="500"
          show-word-limit
          placeholder="请输入下架理由"
        ></el-input>
      </iep-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </span>
  </iep-dialog>
</template>

<script>
import { offTheShelfByOfficial } from "@/api/qms/cooperation_task";
import { initShelfFormData } from "./options";
export default {
  data() {
    return {
      dialogVisible: false,
      formData: initShelfFormData(),
      state: "",
      rules: {
        reason: [
          {
            required: true,
            message: "必填",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    open(id) {
      this.formData.id = id;
      this.dialogVisible = true;
    },
    resetForm() {
      this.formData = initShelfFormData();
      this.dialogVisible = false;
    },
    handleSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loadState = true;
          const row = { ...this.formData };
          offTheShelfByOfficial(row).then(({ data }) => {
            this.loadState = false;
            if (data) {
              this.dialogVisible = false;
              this.$emit("load-page", true);
            }
          });
        } else {
          this.loadState = false;
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
