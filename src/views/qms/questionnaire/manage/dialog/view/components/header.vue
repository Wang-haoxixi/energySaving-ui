<template>
  <div class="view-header-wrapper">
    <h1 class="title">{{data.name}}</h1>
    <!-- 无数据时不显示 -->
    <div class="desc" v-if="data.id">
      <span
        class="item"
        v-if="data.startTime"
      >起止日：{{data.startTime | parseToTimeMinutes}} -- {{getEndTime}}</span>
      <span class="item" v-else>长期有效</span>
      <!-- <span class="item" v-if="data.endTime">结束日期：{{data.endTime | parseToDay}}</span> -->
      <span class="item" v-if="data.openAward===2">奖励宝贝：{{data.awardNumber}} 宝贝</span>
      <span class="item" v-if="data.openAward===2">奖励范围：前 {{data.awardScopeFix}} 名</span>
    </div>
    <p class="remarks" v-if="data.remarks" v-html="$options.filters.spaceWrapEscape(data.remarks)"></p>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    getEndTime() {
      const { parseToTimeMinutes, parseToYear, parseDate } =
        this.$options.filters;
      const endTime =
        parseToYear(this.data.endTime) === parseToYear(this.data.startTime)
          ? parseDate(this.data.endTime, "MM-DD HH:mm")
          : parseToTimeMinutes(this.data.endTime);
      return endTime;
    },
  },
};
</script>
<style lang="scss" scoped>
.view-header-wrapper {
  margin: 0 0 20px 0;
  .title {
    font-size: 20px;
    text-align: center;
    font-family: "微软雅黑";
    color: $--color-text-primary;
  }
  .desc {
    font-size: 14px;
    color: $--color-text-secondary;
    display: flex;
    justify-content: space-around;
    .item {
      flex: 1;
      text-align: center;
    }
  }
  .remarks {
    font-size: 16px;
    color: $--color-text-regular;
    margin: 10px 0 10px;
    padding-left: 20px;
    padding-bottom: 5px;
    border-bottom: 2px solid $--color-primary;
    // text-indent: 2em;
  }
}
</style>
