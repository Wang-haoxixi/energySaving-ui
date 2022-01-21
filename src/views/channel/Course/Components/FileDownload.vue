<template>
  <div class="file-download-box">
    <div class="file-download" @click="handleDownload()">
      <i class="el-icon-download icon"></i>
      <div class="el-upload__text">{{url}}</div>
      <div class="el-upload__text">点击此处, 下载文件</div>
    </div>
  </div>
</template>
<script>
import { downloadUrl } from "@/api/common";
export default {
  props: ["name", "url"],
  methods: {
    handleDownload() {
      downloadUrl(this.url);
    },
  },
};
</script>
<style lang="scss" scoped>
.file-download-box {
  text-align: center;
}
.file-download {
  background-color: #fff;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  box-sizing: border-box;
  width: 360px;
  height: 180px;
  text-align: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  .icon {
    font-size: 67px;
    color: #c0c4cc;
    margin: 40px 0 16px;
    line-height: 50px;
  }
  .el-upload__text {
    color: #606266;
    font-size: 14px;
    text-align: center;
  }
}
</style>
