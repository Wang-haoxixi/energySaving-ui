<template>
  <iep-dialog :dialog-show="dialogShow" :title="`问题`" width="60%" @close="close">
    <el-form :model="formData" :rules="rules" ref="form" label-width="65px" class="form-detail">
      <iep-form-item label-name="问题" prop="val1" class="half-line">
        <el-input v-model="formData.val1" maxlength="150" type="textarea" autosize></el-input>
      </iep-form-item>
      <iep-form-item label-name="解答" prop="val2" class="half-line">
        <el-input v-model="formData.val2" maxlength="150" type="textarea" autosize></el-input>
      </iep-form-item>
    </el-form>
    <div slot="footer" style="text-align: right;">
      <el-button type="primary" @click="onSubmit">保存</el-button>
      <el-button @click="close">取消</el-button>
    </div>
  </iep-dialog>
</template>
<script>
const formInit = () => {
  return {
    val1: "",
    val2: "",
  };
};
export default {
  data() {
    return {
      formData: {},
      dialogShow: false,
      rules: {
        val1: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur",
          },
        ],
        val2: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    open() {
      this.dialogShow = true;
    },
    close() {
      this.dialogShow = false;
      this.formData = formInit();
      this.$emit("load-page");
    },
    onSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loadState = true;
          // // const row = { ...this.formData };
          // this.methodList[this.methodName].requestFn(row).then(({ data }) => {
          //   this.loadState = false;
          //   if (!data) {
          //     this.$message.error(data.msg);
          //   } else {
          this.$message.success("新增成功");
          // this.loadPage();
          this.$emit("get-data", this.formData);
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
</style>