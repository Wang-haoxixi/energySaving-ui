<template>
  <div class="iep-page-form">
    <iep-page-header title :backOption="backOption" v-if="!isDialog"></iep-page-header>
    <el-form
      :model="formData"
      :rules="rules"
      ref="form"
      label-width="150px"
      class="form-detail"
      :disabled="formStatus==='detail'"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="主题:" prop="val1" class="half-line">
            <el-input v-model="formData.val1" maxlength="150"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否判断:" prop="val2" class="half-line">
            <el-radio v-model="formData.val2" label="1">是</el-radio>
            <el-radio v-model="formData.val2" label="2">否</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="事项:" prop="val3" class="half-line">
            <el-input v-model="formData.val3" maxlength="150"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="顺序:" prop="val4" class="half-line">
            <el-input-number
              v-model="formData.val4"
              @change="handleChange"
              :min="1"
              :max="10"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="主题LOGO:" prop="val5" class="half-line">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="主题背景色:" prop="val6" class="half-line">
            <el-color-picker v-model="formData.val6"></el-color-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="相关注意事项:" prop="val8" class="half-line">
            <iep-jodit-editor v-model="formData.val8"></iep-jodit-editor>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="说明:" prop="val9" class="half-line">
            <el-input type="textarea" v-model="formData.val9"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
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
      default: "detail",
    },
  },
  data() {
    return {
      status,
      imageUrl: "",
      formData: initForm(),
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
    handleChange(value) {
      console.log(value);
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 打开
    open(row) {
      if (this.formStatus === "create") {
        this.formData = initForm();
      } else {
        this.formData = row;
      }
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  border: 1px solid #eee;
  font-size: 28px;
  color: $--color-text-secondary;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>