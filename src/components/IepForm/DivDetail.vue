<template>
  <div :class="{'iep-ellipsis':issimgle}" ref="DivDetail">
    <slot name="prefix"></slot>
    <!-- <el-tooltip :disabled="!isEllipsis" popper-class="iep-tooltip-item" effect="dark" :content="content" placement="top"> -->
    <component :is="tag" :title="content">{{content}}</component>
    <!-- </el-tooltip> -->
    <slot></slot>
  </div>
</template>
<script>
import { validatenull } from "@/util/validate";
export default {
  //TODO: iep-ellipsis 副作用
  name: "IepDivDetail",
  props: {
    value: [String, Number],
    nullmsg: {
      type: String,
      require: false,
      default: "暂无",
    },
    issimgle: {
      type: Boolean,
      require: false,
      default: true,
    },
    tag: {
      type: String,
      default: "span",
    },
  },
  data() {
    return {
      isEllipsis: false,
    };
  },
  computed: {
    content() {
      const { value } = this;
      if (value === 0) {
        return "0";
      } else if (validatenull(value)) {
        return this.nullmsg || "暂无";
      } else {
        return String(value);
      }
    },
  },
  mounted() {
    if (
      this.$refs["DivDetail"].clientWidth < this.$refs["DivDetail"].scrollWidth
    ) {
      this.isEllipsis = true;
    } else {
      this.isEllipsis = false;
    }
  },
};
</script>
