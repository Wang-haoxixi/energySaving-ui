<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}级别`" width="500px" @close="loadPage">
    <el-form :model="form" ref="form" label-width="120px">
      <iep-form-item label-name="级别名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm()">确定</iep-button>
      <iep-button @click="loadPage">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import formMixins from "@/mixins/formMixins";
export default {
  mixins: [formMixins],
  data() {
    return {
      dialogShow: false,
      formRequestFn: () => {},
      methodName: "新增",
      form: {
        name: "",
      },
    };
  },
  methods: {
    loadPage() {
      this.form = {
        name,
      };
      this.dialogShow = false;
      this.$emit("load-page");
    },
    async submitForm() {
      try {
        await this.mixinsValidate();
        try {
          const data = await this.formRequestFn(this.form);
          if (data.data) {
            this.$message({
              message: "操作成功",
              type: "success",
            });
            this.loadPage();
          } else {
            this.$message({
              message: data.msg,
              type: "error",
            });
          }
        } catch (error) {
          this.$message({
            message: error.message,
            type: "error",
          });
        }
      } catch (object) {
        this.mixinsMessage(object);
      }
    },
  },
  watch: {},
};
</script>
<style lang="scss" scoped>
</style>
