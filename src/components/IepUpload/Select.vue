<template>
  <div class="upload-select-wrapper">
    <el-tooltip :content="fileName" placement="top">
      <template v-if="fileName.length > 20" slot="title">
        <span>{{fileName}}</span>
      </template>
      <el-tag
        class="file-tag"
        type="info"
        :size="size"
        @click="handleDownload"
        :closable="!disabled && closable"
        @close="clearFile"
      >{{`${fileName.slice(0, 15)}${fileName.length > 20 ? '...' : ''}`}}</el-tag>
    </el-tooltip>
    <el-tag class="file-tag" v-if="!disabled" :size="size" type="info" @click="handleUpload()">
      <i class="el-icon-upload"></i>
    </el-tag>
    <iep-dialog :dialog-show="dialogShow" title="文件" width="440px" @close="dialogShow=false">
      <div class="upload-wrapper">
        <iep-upload v-model="fileList" drag :limit="1" @on-finish="handleFinish" :accept="accept"></iep-upload>
      </div>
    </iep-dialog>
  </div>
</template>
<script>
import { downloadUrl } from "@/api/common";
export default {
  name: "IepUploadSelect",
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "mini",
    },
    value: {
      type: String,
      required: true,
    },
    accept: {
      type: String,
      default: "*",
    },
  },
  data() {
    return {
      dialogShow: false,
      fileList: [],
    };
  },
  computed: {
    closable() {
      if (this.value === "") {
        return false;
      }
      return true;
    },
    fileName() {
      if (this.value === "") {
        return "无文件";
      }
      return this.value;
    },
  },
  watch: {
    value: function (n) {
      if (n === "") {
        this.fileList = [];
      }
    },
  },
  methods: {
    handleDownload() {
      if (this.closable) {
        downloadUrl(this.value);
      }
    },
    clearFile() {
      this.$emit("input", "");
    },
    handleFinish(files) {
      this.fileList = [];
      this.$emit("input", files[0].url);
      this.$emit("get-file", files[0]);
      this.dialogShow = false;
    },
    handleUpload() {
      this.dialogShow = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.upload-select-wrapper {
  display: flex;
  align-items: center;
}
.upload-wrapper {
  display: flex;
  justify-content: center;
}
.file-tag {
  margin-right: 5px;
  cursor: pointer;
}
</style>
