<template>
  <div class="person-box" v-loading="loading">
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item v-for="(chunk,i) in chunkPersonList" :key="i">
        <el-card v-for="(item) in chunk" :key="item.commonId" class="piece" shadow="hover">
          <div class="img" @click="clickHandler(item)">
            <iep-img :resizeOpt="{l:222}" :src="item" class="img"></iep-img>
          </div>
        </el-card>
      </el-carousel-item>
    </el-carousel>
    <el-image-viewer
      :initial-index="imageIndex"
      v-if="showViewer"
      :on-close="closeViewer"
      :url-list="imgList"
    />
  </div>
</template>

<script>
import chunk from "lodash/chunk";
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
let prevOverflow = "";

export default {
  components: {
    ElImageViewer,
  },
  props: {
    imgList: {
      type: Array,
      default: () => {},
    },
  },
  data() {
    return {
      loading: false,
      preview: true,
      showViewer: false,
      src: "",
    };
  },
  computed: {
    chunkPersonList() {
      return chunk(this.imgList, 5);
    },
    imageIndex() {
      let previewIndex = 0;
      const srcIndex = this.imgList.indexOf(this.src);
      if (srcIndex >= 0) {
        previewIndex = srcIndex;
      }
      return previewIndex;
    },
  },
  methods: {
    clickHandler(item) {
      this.src = item;
      prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      this.showViewer = true;
    },
    closeViewer() {
      document.body.style.overflow = prevOverflow;
      this.showViewer = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.person-box {
  margin-top: 30px;
  .piece {
    float: left;
    margin: 0 10px;
    width: 222px;
    height: 132px;
    transition: 0.6s;
    border-radius: $--small-border-radius;
    &:hover {
      transform: scale(1.1);
    }
    .img {
      width: 100%;
      height: 100%;
      border-radius: $--small-border-radius;
      cursor: pointer;
    }
  }
}

.piece ::v-deep .el-card__body {
  padding: 0;
  width: 100%;
  height: 100%;
  border-radius: $--small-border-radius;
}
.person-box ::v-deep .el-carousel__item {
  display: flex;
  align-items: center;
  left: 5px;
  overflow: hidden;
  border-radius: $--small-border-radius;
}
.person-box ::v-deep .el-carousel__container {
  height: 136px;
}
.person-box ::v-deep .el-carousel--horizontal {
  margin: 0 -15px;
}
.person-box ::v-deep .el-carousel__arrow--left {
  left: 0;
}
.person-box ::v-deep .el-carousel__arrow--right {
  right: 0;
}
.person-box ::v-deep .el-carousel__indicators {
  display: none;
}
.person-box ::v-deep .el-carousel__arrow i {
  font-size: 20px;
  color: $--color-text-secondary;
}
.person-box ::v-deep .el-carousel__arrow {
  width: 30px;
  height: 30px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 5px 0px $--background-color;
  border-radius: 50%;
  opacity: 0;
}
.person-box:hover ::v-deep .el-carousel__arrow {
  opacity: 0.8;
}
</style>
