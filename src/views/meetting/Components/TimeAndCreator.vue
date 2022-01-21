<template>
  <div class="operation">
    <el-link
      v-show="isAdvance"
      icon="el-icon-woneng-hehuorenguanli"
      @click="$openPage(`/meetting/personnel/${scope.id}?conferenceName=${scope.name}`)"
      :disabled="scope.statusFlag === '0'"
      :underline="false"
    >人员管理</el-link>
    <el-link
      v-show="isAdvance"
      style="margin: 0 40px;"
      icon="el-icon-woneng-kaipiao"
      @click="$openPage(`/meetting/ticket/${scope.id}`)"
      :disabled="scope.statusFlag === '0'"
      :underline="false"
    >票务管理</el-link>
    <div class="time-and-creator">
      <span class="time">发布时间： {{scope.updateTime||scope.createTime|parseToTimeMinutes}}</span>
      <span class="creator">发布者：{{scope.createByName}}</span>
      <span class="org">{{ scope.orgName}}</span>
      <span class="dot">•</span>
      <span class="identity">{{identityDict[scope.identity]|showText}}</span>
    </div>
  </div>
</template>
<script>
const identityDict = {
  0: "用户",
  1: "知事",
  2: "负责人",
};
export default {
  name: "TimeAndCreator",
  data() {
    return {
      identityDict,
    };
  },
  props: {
    scope: {
      type: Object,
      required: true,
    },
    isAdvance: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss" scoped>
.operation {
  display: flex;
}
.time-and-creator {
  display: inline-block;
  color: $--color-text-secondary;
  .time {
    margin-right: 40px;
  }
  .creator {
    margin-right: 10px;
  }
  .dot {
    margin: 0 5px;
  }
}
</style>
