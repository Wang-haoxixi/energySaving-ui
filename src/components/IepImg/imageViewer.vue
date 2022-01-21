<template>
  <el-image-viewer
    class="viewer"
    :initial-index="imageIndex"
    v-if="showViewer"
    :on-close="closeViewer"
    :url-list="imgList"
  />
</template>
<script>
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
export default {
  name: "IepImgViewer",
  components: {
    ElImageViewer,
  },
  data() {
    return {
      imgList: [],
      showViewer: false,
      imageIndex: 0,
    };
  },
  methods: {
    closeViewer() {
      this.showViewer = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.viewer {
  ::v-deep .el-icon-circle-close {
    color: #ffffff;
  }
}
</style>