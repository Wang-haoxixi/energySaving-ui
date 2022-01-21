<template>
  <div class="ranking">
    <div v-if="dataList.length !== 0">
      <el-popover
        v-for="(item, index) in dataList"
        :key="index"
        placement="right-end"
        title
        :width="width"
        trigger="hover"
        :content="item[name]"
      >
        <div class="piece" @click="handleDetail(item)" slot="reference">
          <span class="count" :class="index < 3 ? 'red' : ''">{{index + 1}}</span>
          <span
            class="name-top"
            v-if="item.status === 2"
            :style="`width: ${isGrade ? '100%' : '60%'}`"
          >
            <span class="name-top-detail">{{item[name]}}</span>
            <span class="name-top-icon">置顶</span>
          </span>
          <span class="name" v-else :style="`width: ${isGrade ? '100%' : '60%'}`">{{item[name]}}</span>
          <span v-if="!isGrade" class="grade" :class="index < 3 ? 'red-color' : ''">{{item[grade]}}</span>
        </div>
      </el-popover>
    </div>
    <IepNoData v-else></IepNoData>
  </div>
</template>
<script>
export default {
  name: "IepAppRankingCard",
  props: {
    dataList: {
      type: Array,
      required: false,
      default: () => [],
    },
    name: {
      type: String,
      default: "name",
    },
    grade: {
      type: String,
      default: "grade",
    },
    isGrade: {
      type: Boolean,
      default: false,
    },
    width: {
      default: 300,
    },
  },
  methods: {
    handleDetail(row) {
      this.$emit("click", row);
    },
  },
};
</script>
<style lang="scss" scoped>
.ranking {
  // padding: 2px 0;
  .piece {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 14px;
    font-family: "微软雅黑";
    color: $--color-text-primary;
    transition-duration: 0.3s;
    transition: 0.5s;
    cursor: pointer;
    .name {
      display: inline-block;
      width: 60%;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: middle;
    }
    .name-top {
      display: inline-block;
      height: 30px;
      line-height: 26px;
      vertical-align: middle;
      width: 60%;
      .name-top-detail {
        display: inline-block;
        max-width: 115px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: middle;
      }
      .name-top-icon {
        display: inline-block;
        margin-left: 5px;
        font-size: 12px;
        padding: 0 5px;
        height: 16px;
        line-height: 16px;
        vertical-align: middle;
        border-radius: 3px;
        background-color: $--custom-menu-background-color;
        border: 1px solid $--custom-menu-background-color;
        color: $--color-primary;
      }
    }
    .count {
      display: inline-block;
      width: 18px;
      min-width: 18px;
      height: 18px;
      font-size: 14px;
      line-height: 18px;
      text-align: center;
      margin-right: 12px;
      background-color: #fff;
      border-radius: 5px;
      border: 1px solid $--border-color;
      color: $--color-text-secondary;
    }
    .red {
      background-color: $--color-primary;
      background-color: #fff;
      border: 1px solid $--color-primary;
      color: $--color-primary;
    }
    .grade {
      float: right;
      width: 68px;
      font-size: 14px;
      color: $--color-text-secondary;
      text-align: right;
    }
    .red-color {
      color: $--color-primary;
    }
    &:hover {
      color: $--color-primary;
    }
  }
}
</style>

