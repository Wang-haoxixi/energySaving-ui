<template>
  <el-image class="iep-image" :src="ossSrc" :preview-src-list="previewSrcList" v-bind="$attrs">
    <div slot="placeholder" class="image-slot">
      加载中
      <span class="dot">...</span>
    </div>
    <div slot="error" class="image-slot">
      <svg class="iep-icon" aria-hidden="true">
        <use xlink:href="#iep2-iconicanlogo" />
      </svg>
    </div>
  </el-image>
</template>
<script>
import qs from "qs";
const resizeOpt = {
  // lfit、mfit、fill、pad、fixed，默认为lfit。
  // 指定缩放的模式：
  // lfit：等比缩放，限制在指定w与h的矩形内的最大图片。
  // mfit：等比缩放，延伸出指定w与h的矩形框外的最小图片。
  // fill：固定宽高，将延伸出指定w与h的矩形框外的最小图片进行居中裁剪。
  // pad：固定宽高，缩放填充。
  // fixed：固定宽高，强制缩放。
  m: "mfit",
  // 指定目标缩略图的宽度。
  w: null,
  // 指定目标缩略图的高度。
  h: null,
  // 指定目标缩略图的最长边。
  l: null,
  // 指定目标缩略图的最短边。
  s: null,
  // 指定当目标缩略图大于原图时是否处理。值是1表示不处理；值是0表示处理。
  limit: null,
  // 当缩放模式选择为pad（缩放填充）时，可以选择填充的颜色，默认是白色。参数的填写方式：采用16进制颜色码表示，例如00FF00（绿色）。
  color: null,
  // 倍数百分比。小于100为缩小，大于100为放大。
  p: null,
};
export default {
  name: "IepImg",
  inheritAttrs: false,
  props: {
    previewSrcList: {
      type: Array,
      default: () => [],
    },
    src: {
      required: true,
      validator: prop =>
        typeof prop === "string" || prop === null || prop === undefined,
    },
    xOssProcess: {
      type: String,
      default: "image/resize",
    },
    resizeOpt: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ossSrc() {
      // TODO: 如果APP能解决不会拼接问题可以去掉这个判断
      if (this.src && this.src.split("?").length >= 2) {
        return this.src;
      }
      // 如果没有传入resizeOpt 不合并属性设置query 否则base64 无法显示
      if (this.resizeOpt && Object.keys(this.resizeOpt).length) {
        const resizeStr = qs
          .stringify(this.$mergeByFirst(resizeOpt, this.resizeOpt), {
            delimiter: ",",
            skipNulls: true,
          })
          .replace(/=/g, "_");
        if (resizeStr.trim() !== "") {
          return `${this.src}?x-oss-process=${this.xOssProcess},${resizeStr}`;
        }
      }
      return this.src;
    },
  },
};
</script>
<style lang="scss" scoped>
.iep-image {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: $--border-radius-base;
}
.iep-image ::v-deep .el-image__inner {
  max-width: 100%;
  width: auto;
  height: auto;
}
.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 20%;
  background: #f5f7fa;
  color: #909399;
  .iep-icon {
    font-size: 40px;
  }
}
</style>
