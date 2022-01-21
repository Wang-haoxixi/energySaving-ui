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
        :closable="!disabled && closable"
        @close="clearFile"
      >{{`${fileName.slice(0, 15)}${fileName.length > 20 ? '...' : ''}`}}</el-tag>
    </el-tooltip>
    <el-tag class="file-tag" v-if="!disabled" :size="size" type="info" @click="handleUpload()">
      <i class="el-icon-upload"></i>
    </el-tag>
    <iep-dialog :dialog-show="dialogShow" title="文件" width="440px" @close="dialogShow=false">
      <div class="upload-wrapper">
        <iep-oss-upload
          v-model="fileList"
          drag
          :limit="1"
          @on-finish="handleFinish"
          v-bind="$attrs"
          v-on="$listeners"
        ></iep-oss-upload>
      </div>
    </iep-dialog>
  </div>
</template>
<script>
export default {
  name: "IepOssUploadSelect",
  inheritAttrs: false,
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
  methods: {
    clearFile() {
      this.$emit("input", "");
    },
    handleFinish(files) {
      const url = files[0].url;
      this.fileList = [];
      this.$emit("input", url);
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
