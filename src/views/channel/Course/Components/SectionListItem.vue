<template>
  <div class="section-list-item">
    <div class="info">
      <i v-if="item.type==1" class="el-icon-woneng-bofang icon"></i>
      <i v-if="item.type==2" class="el-icon-woneng-yinpin icon"></i>
      <i v-if="item.type==3" class="el-icon-woneng-pdf icon"></i>
      <i v-if="item.type==4" class="el-icon-woneng-qitawenjian icon"></i>
      <span class="text">{{item.sectionNumber}}-{{item.smallSectionNumber}}</span>
      <span class="text" :title="item.smallSectionName">{{item.smallSectionName}}</span>
      <span class="text">({{item.learnTime}}分钟)</span>
    </div>
    <div class="opt">
      <template v-if="canStudy">
        <el-button
          :disabled="disabledSec"
          :title="disabledTitle"
          size="small"
          type="default"
          @click="handleStudy()"
        >开始学习</el-button>
        <el-progress
          class="progress-circle"
          type="circle"
          :title="progressMap[item.progress].text"
          :percentage="progressMap[item.progress].value"
          :width="28"
          color=" #3cd489"
          :stroke-width="4"
          :show-text="false"
        ></el-progress>
      </template>
    </div>
  </div>
</template>
<script>
import { progressMap } from "../options";
export default {
  props: ["item", "canStudy"],
  data() {
    return {
      progressMap,
    };
  },
  computed: {
    disabledSec() {
      // 0 不可学习
      // 1 可以学习
      return this.item.allowStudy === "0";
    },
    disabledTitle() {
      if (this.disabledSec) {
        return "本课程设置了按顺序学习";
      } else {
        return "开始学习";
      }
    },
  },
  methods: {
    handleStudy() {
      this.$router.push({
        path: `/channel/course/study/${this.item.infoId}`,
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
    background: rgba(247, 68, 55, 0.1);
    color: $--color-primary;
    .text {
      color: $--color-primary;
    }
  }
  .info {
    display: flex;
    align-items: center;
  }
  .opt {
    display: flex;
    align-items: center;
    .progress-circle {
      margin-left: 20px;
    }
    ::v-deep .el-button--default:hover {
      background-color: #fff;
    }
  }
  .icon {
    font-size: 20px;
    color: $--color-input-regular;
  }
  .text {
    display: inline-block;
    font-size: 14px;
    color: $--color-text-regular;
    &:nth-child(2) {
      margin-left: 10px;
      min-width: 30px;
    }
    &:nth-child(3) {
      margin-right: 5px;
      max-width: 550px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &:nth-child(4) {
      margin-right: 20px;
      min-width: 60px;
    }
  }
}
</style>
