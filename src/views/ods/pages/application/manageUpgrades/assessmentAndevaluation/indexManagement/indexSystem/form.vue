<template>
  <div class="iep-page-form">
    <iep-page-header title :backOption="backOption" v-if="!isDialog"></iep-page-header>
    <el-form
      :model="formData"
      ref="form"
      :rules="rules"
      label-width="150px"
      class="form-detail"
      :disabled="formStatus==='detail'"
    >
      <span>基本信息</span>
      <el-divider></el-divider>
      <el-form-item label="指标体系名称:" prop="val1" class="half-line">
        <el-input v-model="formData.val1" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="指标类型:" prop="val1" class="half-line">
        <el-select style="width:100%" v-model="formData.val2" placeholder="请选择">
          <el-option
            v-for="item in status.status"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="指标说明:" prop="val3" class="half-line">
        <el-input v-model="formData.val3" type="textarea" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="附件:" prop="val4" class="half-line">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <span>指标体系详情</span>
      <el-divider></el-divider>
      <el-button style="margin-bottom:15px;" type="primary">新增一级分类</el-button>
      <iep-footer-bar v-if="!isDialog && formStatus != 'detail'">
        <el-button type="primary" @click="submitForm" :loading="loadState">保存</el-button>
        <iep-button @click="resetForm">重置</iep-button>
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
      rules,
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