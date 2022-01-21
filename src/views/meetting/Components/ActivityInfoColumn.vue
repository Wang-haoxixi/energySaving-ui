<template>
  <div style="flex-direction: column">
    <div
      class="action-box"
      @click="$openPage(`/channel/activity/detail/${scope.row.id||scope.row.conferenceId||scope.row.enrole.conferenceId}`)"
    >
      <el-link
        class="name iep-ellipsis-flex"
        :underline="false"
        :title="scope.row.name"
      >{{scope.row.name}}</el-link>
      <div v-show="isPublish" class="publish-time">发布时间：{{scope.row.createTime|parseToTimeMinutes}}</div>
    </div>
    <div>
      <i class="el-icon-time"></i>
      <span
        class="duration"
      >{{scope.row.startTime|parseToTimeMinutes}} 至 {{scope.row.endTime|parseToTimeMinutes}}</span>
    </div>
    <div v-if="scope.row.city||scope.row.field">
      <span class="el-icon-location-outline"></span>
      <span class="city-names" v-if="scope.row.cityNames">{{scope.row.cityNames.join(" ")}}</span>
      <span class="city-names" v-else>{{scope.row.city}}</span>
      <span class="city-field">{{scope.row.field}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "ActivityInfoColumn",
  props: {
    scope: {
      type: Object,
      required: true,
    },
    isPublish: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss" scoped>
.action-box {
  display: flex;
  flex-direction: column;
  .name {
    margin-bottom: 5px;
    max-width: 340px;
    font-size: 16px;
  }
  .publish-time {
    color: $--color-text-secondary;
  }
}
.city-field,
.city-names {
  color: $--color-text-regular;
  font-size: 14px;
  margin-left: 5px;
}
.el-icon-location-outline {
  color: $--color-text-secondary;
  font-size: 16px;
}
.duration {
  color: $--color-text-regular;
  margin-left: 5px;
}
.el-icon-time {
  color: $--color-text-secondary;
  font-size: 16px;
}
::v-deep .el-table td div {
  line-height: 28px;
}
</style>
