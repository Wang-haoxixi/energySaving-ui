<template>
  <el-upload
    class="avatar-uploader"
    :action="actionUrl"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :headers="headers"
    :before-upload="beforeAvatarUpload"
  >
    <iep-img
      v-if="value"
      :src="value"
      :style="{width:width+'px',height:height+'px'}"
      class="avatar"
      :resizeOpt="{l:maxlength}"
    />
    <i
      v-else
      :style="{width:width+'px',height:height+'px'}"
      class="el-icon-plus avatar-uploader-icon"
    ></i>
  </el-upload>
</template>
<script>
import { sftpSingleImageUploadUrl } from "@/api/admin/file";
import store from "@/store";
export default {
  name: "IepSingleImgUpload",
  props: {
    value: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      default: 356,
    },
    height: {
      type: Number,
      default: 178,
    },
    maxlength: {
      type: Number,
      default: 178,
    },
  },
  data() {
    return {
      headers: {
        Authorization: "Bearer " + store.getters.accessToken,
      },
      actionUrl: `/api${sftpSingleImageUploadUrl}`,
    };
  },
  methods: {
    handleAvatarSuccess({ data }) {
      if (data) {
        this.$message.success("图片上传成功");
        this.$emit("input", data.url);
      } else {
        this.$message.error("图片上传失败");
      }
    },
    beforeAvatarUpload(file) {
      const format = ["image/jpg", "image/jpeg", "image/png"];
      const isFormat = format.includes(file.type);
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isFormat) {
        this.$message.error(`上传图片只能是 jpg,png 格式!`);
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isFormat && isLt2M;
    },
  },
};
</script>
<style lang="scss" scoped>
.avatar-uploader {
  ::v-deep .el-upload {
    border: 1px solid $--border-color;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: $--color-primary;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: $--color-text-secondary;
      width: 356px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 356px;
      height: 178px;
      display: flex;
      align-items: center;
    }
  }
}
</style>