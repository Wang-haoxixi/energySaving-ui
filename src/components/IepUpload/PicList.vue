<template>
  <el-upload
    :action="actionUrl"
    :headers="headers"
    list-type="picture-card"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
    :file-list="fileList"
    :before-upload="beforeUpload"
  >
    <i class="el-icon-plus"></i>
  </el-upload>
</template>
<script>
import { sftpSingleImageUploadUrl } from "@/api/admin/file";
import { mapGetters } from "vuex";
export default {
  name: "IepPicListUpload",
  props: ["value"],
  data() {
    return {
      actionUrl: `/api${sftpSingleImageUploadUrl}`,
    };
  },
  computed: {
    ...mapGetters(["accessToken"]),
    headers() {
      return {
        Authorization: "Bearer " + this.accessToken,
      };
    },
    fileList() {
      return this.value.map(m => ({
        name: m,
        url: m,
      }));
    },
    fileUrlList() {
      return this.fileList.map(m => m.url);
    },
  },
  methods: {
    handleRemove(file) {
      const files = [...this.fileUrlList];
      this.$emit(
        "input",
        files.filter(m => m !== file.url),
      );
    },
    handleSuccess(response) {
      const files = [...this.fileUrlList];
      files.push(response.data.url);
      this.$emit("input", files);
    },
    beforeUpload(file, size = 2) {
      if (file.size / 1024 / 1024 < size) {
        return true;
      } else {
        this.$message.warning(`上传图片不能大于${size}M`);
        return false;
      }
    },
  },
};
</script>
