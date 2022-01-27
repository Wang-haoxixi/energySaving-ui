<template>
  <div style="height: 180px;display: flex;flex-direction:row">
    <el-upload
      class="avatar-uploader"
      :action="actionUrl"
      :headers="headers"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      list-type="picture-card"
      accept="image/*"
      style="width: 300px;"
    >
      <div class="no-avatar-wrapper">
        <div>
          <iep-img :src="value"></iep-img>
          <div
            class="iep-font-color-3"
            style="line-height: 100%;margin-top: 20px;"
          >建议图片尺寸800*480，大小不超过2M</div>
        </div>
      </div>
      <el-button
        style="float: left;margin-left: 318px;margin-top: -160px"
        class="iep-btn-submit"
        type="primary"
      >上传</el-button>
    </el-upload>
    <div
      class="iep-font-color-3"
      style="padding-left: 20px;padding-top: 70px;line-height: 24px;"
    >精致的海报让活动锦上添花，更便于传播与吸引报名，也将提升在节能宝平台的推荐机会。</div>
  </div>
</template>
<script>
import { sftpSingleImageUploadUrl } from "@/api/admin/file";
import { mapGetters } from "vuex";

export default {
  name: "IepUploadPoster",
  props: {
    value: {
      required: true,
      validator: (prop) => typeof prop === "string" || prop === null,
    },
  },
  data() {
    return {
      actionUrl: `/api${sftpSingleImageUploadUrl}`,
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
    };
  },
  computed: {
    ...mapGetters(["accessToken"]),
    headers() {
      return {
        Authorization: "Bearer " + this.accessToken,
      };
    },
  },
  methods: {
    beforeAvatarUpload(file) {
      const isLt4M = file.size / 1024 / 1024 < 4;
      if (!isLt4M) {
        this.$message.error("上传图片大小不能超过 4MB!");
      }
      return isLt4M;
    },
    handleAvatarSuccess(file) {
      this.$emit("input", file.data.url);
      this.$emit("handle-avatar-success");
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.avatar-uploader {
  border: none;
}

.avatar-uploader ::v-deep .el-upload {
  cursor: pointer;
  position: relative;
  /*overflow: hidden;*/
  width: 300px;
  height: 180px;
}

.no-avatar-wrapper {
  position: relative;
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;

  .intro-text {
    display: flex;
    margin-left: 20px;
    font-size: 14px;
    color: $--color-text-regular;
    flex-direction: column;
    align-items: flex-start;

    > div {
      line-height: 30px;
    }

    .upload-text {
      color: $--color-primary;
    }
  }
}
</style>
