<template>
  <div class="section-list-item">
    <el-tooltip
      class="item"
      :disabled="activeId===item.id"
      effect="dark"
      :content="tooltipText"
      placement="bottom"
    >
      <div
        class="info"
        :class="{active:activeId===item.id, disabled:disabledSec}"
        @click="handleStudy()"
      >
        <i v-if="item.type==1" class="el-icon-woneng-bofang icon"></i>
        <i v-if="item.type==2" class="el-icon-woneng-yinpin icon"></i>
        <i v-if="item.type==3" class="el-icon-woneng-pdf icon"></i>
        <i v-if="item.type==4" class="el-icon-woneng-qitawenjian icon"></i>
        <span class="text">{{item.sectionNumber}}-{{item.smallSectionNumber}}</span>
        <span class="text" :title="item.smallSectionName">{{item.smallSectionName}}</span>
        <span class="text">({{item.learnTime}}分钟)</span>
      </div>
    </el-tooltip>
    <div class="opt">
      <el-progress
        class="progress-circle"
        type="circle"
        :title="progressMap[item.progress].text"
        :percentage="progressMap[item.progress].value"
        :width="20"
        color=" #3cd489"
        :stroke-width="3"
        :show-text="false"
      ></el-progress>
    </div>
  </div>
</template>
<script>
import { progressMap } from "../options";
export default {
  props: ["item"],
  data() {
    return {
      progressMap,
    };
  },
  computed: {
    activeId() {
      return +this.$route.query.id;
    },
    disabledSec() {
      // 0 不可学习
      // 1 可以学习
      return this.item.allowStudy === "0";
    },
    tooltipText() {
      if (!this.disabledSec) {
        if (this.activeId === this.item.id) {
          return "";
        }
        return "学习此课程";
      } else {
        return "请按顺序完成课程";
      }
    },
  },
  methods: {
    handleStudy() {
      if (this.disabledSec) {
        return;
      }
      this.$router.replace({
        query: {
          id: this.item.id,
          coursewareId: this.item.coursewareId,
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.section-list-item {
  margin: 5px 0;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: $--border-radius-base;

  &:hover {
    .info {
      color: $--color-primary;
    }
  }
  .info {
    cursor: pointer;
    color: $--color-text-regular;
    display: flex;
    align-items: center;
    ::v-deep .el-button--default:hover {
      background-color: #fff;
    }
    &.active {
      cursor: default;
      color: $--color-primary;
    }
    &.disabled {
      cursor: not-allowed;
      color: $--color-text-secondary;
    }
  }
  .opt {
    display: flex;
    align-items: center;
    .progress-circle {
      margin-left: 10px;
    }
  }
  .icon {
    font-size: 20px;
    color: $--color-input-regular;
  }
  .text {
    margin-left: 10px;
    font-size: 14px;
    &:nth-child(2) {
      margin-left: 10px;
      min-width: 30px;
    }
    &:nth-child(3) {
      margin-right: 5px;
      width: 100px;
      max-width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &:nth-child(4) {
      min-width: 60px;
    }
  }
}
</style>
