<template>
  <div class="wrapper">
    <iep-upload-avatar v-bind="$attrs" v-on="$listeners"></iep-upload-avatar>
    <!-- <div class="describe">建议上传300px*300px的JPG图片</div> -->
  </div>
</template>
<script>
export default {
  name: "IepUploadAvatarWrapper",
  inheritAttrs: false,
};
</script>
<style lang="scss" scoped>
.wrapper ::v-deep .avatar-uploader,
.wrapper ::v-deep .el-upload--picture-card {
  width: 110px;
  border-radius: $--border-radius-base;
}
.wrapper ::v-deep .avatar-uploader,
.describe {
  // display: inline-block;
  // vertical-align: middle;
}
.describe {
  margin-left: 15px;
  font-size: 12px;
  color: $--color-text-secondary;
}
.wrapper ::v-deep .no-avatar-wrapper .el-icon-woneng-shanchu {
  top: inherit;
  right: inherit;
  font-size: 36px;
}
.wrapper ::v-deep .el-upload--picture-card img {
  width: 100%;
}
</style>
