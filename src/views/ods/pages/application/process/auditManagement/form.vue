<template>
  <div class="iep-page-form">
    <iep-page-header title :backOption="backOption" v-if="!isDialog"></iep-page-header>
    <el-form
      :model="formData"
      ref="form"
      label-width="150px"
      class="form-detail"
      :disabled="formStatus==='detail'"
    >
      <el-form-item label="实施主体:" prop="val1" class="half-line">
        <el-input v-model="formData.val2" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="统一社会信用代码:" prop="val1" class="half-line">
        <el-input v-model="formData.val2" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="部门代码:" prop="val3" class="half-line">
        <el-input v-model="formData.val3" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="事项类别:" prop="val4" class="half-line">
        <el-input v-model="formData.val4" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="主项名称:" prop="val5" class="half-line">
        <el-input v-model="formData.val5" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="对应分类:" prop="val6" class="half-line">
        <el-input v-model="formData.val6" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="扩展名:" prop="val7" class="half-line">
        <el-input v-model="formData.val7" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="顺序码:" prop="val8" class="half-line">
        <el-input v-model="formData.val8" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="是否有子项:" prop="val9" class="half-line">
        <el-radio-group v-model="formData.val9">
          <el-radio
            :label="item.value"
            v-for="item in status.is_not"
            :key="item.value"
          >{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="形式层级:" prop="val10" class="half-line">
        <el-radio-group v-model="formData.val10">
          <el-radio
            :label="item.value"
            v-for="item in status.level"
            :key="item.value"
          >{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <iep-footer-bar v-if="!isDialog && formStatus != 'detail'">
        <el-button type="primary" @click="submitForm" :loading="loadState">保存</el-button>
        <iep-button @click="resetForm">重置</iep-button>
      </iep-footer-bar>
    </el-form>
  </div>
</template>
<script>
import { initForm } from "./const/options";
import { status } from "./const/options";
export default {
  props: {
    isDialog: {
      type: Boolean,
      default: false,
    },
    formStatus: {
      type: String,
      default: "detail",
    },
  },
  data() {
    return {
      status,
      formData: {},
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
      console.log(row);
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
</style>