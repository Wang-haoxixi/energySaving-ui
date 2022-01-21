<template>
  <div>
    <div class="title">Ta的经历</div>
    <div class="exp-con">
      <div class="exp-list">
        <h5>教育经历</h5>
        <div class="exp-item-list" v-for="(item,i) in form.learningSituation.slice(0,1)" :key="i">
          <span class="iep-ellipsis-2-flex">
            <span class="time">{{item.starTime | parseToMonth}}至{{item.endTime | parseToMonth}}</span>
            <span :title="item.school+' '+item.content" class="item">{{item.school}}</span>&nbsp;
            <span :title="item.school+' '+item.content" class="item">{{item.content}}</span>
          </span>
        </div>
        <div class="exp-item-list" v-if="!form.learningSituation.length">暂无</div>
      </div>
      <div class="exp-list">
        <h5>工作经历</h5>
        <div class="exp-item-list" v-for="(item,i) in form.workExperience.slice(0,2)" :key="i">
          <span class="iep-ellipsis-2-flex">
            <span class="time">{{item.starTime | parseToMonth}}至{{item.endTime | parseToMonth}}</span>
            <span :title="item.company+' '+item.jobs" class="item">{{item.company}}</span>&nbsp;
            <span :title="item.company+' '+item.jobs" class="item">{{item.jobs}}</span>
          </span>
          <div :title="item.describe" class="desc iep-ellipsis-flex">{{item.describe}}</div>
        </div>
        <div class="exp-item-list" v-if="!form.workExperience.length">暂无</div>
      </div>
    </div>
  </div>
</template>
<script>
class UserExpDTO {
  workExperience = [];
  learningSituation = [];
}
export default {
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  computed: {
    form() {
      return this.$mergeByFirst(new UserExpDTO(), this.value);
    },
  },
};
</script>
<style lang="scss" scoped>
.title {
  margin-bottom: 20px;
  font-size: 16px;
  font-family: "微软雅黑";
  color: $--color-text-primary;
}
.exp-con {
  margin-top: -5px;
  .exp-list {
    h5 {
      display: block;
      margin-top: 15px;
      margin-bottom: 15px;
      width: 76px;
      height: 24px;
      font-size: 14px;
      font-weight: 400;
      text-align: center;
      line-height: 24px;
      background: $--background-color;
      border-radius: 5px;
      color: $--color-text-secondary;
    }
    .time,
    .desc {
      font-size: 14px;
      color: $--color-text-secondary;
      margin-right: 10px;
    }
    .item {
      font-size: 14px;
      color: $--color-text-regular;
    }
  }
}
</style>
