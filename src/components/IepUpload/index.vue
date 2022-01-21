<template>
  <div class="upload-wrap">
    <el-upload
      :action="action"
      :headers="headers"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :on-error="handleError"
      :limit="limit"
      :on-exceed="handleExceed"
      :file-list="fileList"
      :drag="drag"
      :before-upload="onBeforeUpload"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <iep-button v-if="!drag" plain id="uploadButton">点击上传</iep-button>
      <template v-else>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
      </template>
      <div slot="tip" class="el-upload__tip">
        <slot></slot>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>
<script>
const errorType = ["exe", "bat", "vbs"];
import store from "@/store";
import { downloadFile } from "@/api/common";
export default {
  name: "IepUpload",
  inheritAttrs: false,
  props: {
    value: {
      type: Array,
      required: true,
    },
    limit: {
      type: Number,
      default: 1,
    },
    drag: {
      type: Boolean,
      default: false,
    },
    action: {
      type: String,
      default: "/api/admin/file/upload",
    },
  },
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: "",
      headers: {
        Authorization: "Bearer " + store.getters.accessToken,
      },
    };
  },
  computed: {
    fileList: {
      get: function () {
        return this.value;
      },
      set: function (value) {
        this.$emit("input", value);
      },
    },
    isPicList() {
      return this.$attrs["list-type"] === "picture";
    },
  },
  methods: {
    onBeforeUpload(file) {
      const type = file.name.split(".").pop();
      if (errorType.includes(type)) {
        this.$message.error("无法上传此类型文件！");
        return false;
      }
      const isLt1M = file.size / 1024 / 1024 < 100;
      if (!isLt1M) {
        this.$message.error("上传文件大小不能超过 100MB!");
      }
      return isLt1M;
    },
    handleError() {
      this.$message.error("错了哦，请检查文件服务器");
    },
    handleSuccess(res, file) {
      if (res.code) {
        if (!res.data) {
          if (res.msg) {
            this.$message.error(res.msg);
          } else {
            this.$message.error("错了哦，请检查文件服务器");
          }
        } else {
          this.$message.error(res.msg);
        }
        this.$emit("on-finish", [], false);
        this.$emit("input", []);
      } else {
        const url = this.isPicList
          ? res.data.url
          : res.data.bucketName + "-" + res.data.fileName;
        const formatFile = {
          name: file.name,
          url,
          fileSize: res.data.fileSize,
          id: res.data.id,
          wareFullUrl: res.data.wareFullUrl,
        };
        this.fileList.push(formatFile);
        this.$message.success("上传成功");
        this.$emit("on-finish", this.fileList, true);
        this.$emit("input", this.fileList);
      }
    },
    handleRemove(file) {
      const newData = this.fileList.filter((item) => item.url !== file.url);
      this.fileList = newData;
    },
    handlePreview(file) {
      if (this.isPicList) {
        this.handlePictureCardPreview(file);
      } else {
        downloadFile(file);
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 ${this.limit} 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`,
      );
    },
    handleSubmit() {
      document.getElementById("uploadButton").click();
    },
  },
};
</script>
<style lang="scss" scoped>
.upload-wrap {
  width: 100%;
  ::v-deep .el-upload-list__item.is-success {
    &.focusing .el-icon-close-tip {
      display: none;
    }
    .el-upload-list__item-name {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      word-break: break-all;
    }
  }
}
</style>
