<template>
  <div class="activity-item" style="display: flex;">
    <iep-img :src="data.poster" class="content-image"></iep-img>
    <div class="content-detail">
      <span class="detail-name" @click="toActivityDetail(data.id)" :title="data.name">{{data.name}}</span>
      <div class="detail-desc">
        <i class="el-icon-time"></i>
        {{data.startTime|parseToTimeMinutes}} 至 {{data.endTime|parseToTimeMinutes}}
      </div>
      <div class="detail-desc" v-if="data.city||data.field">
        <i class="el-icon-location-outline"></i>
        {{data.city}} {{data.field}}
      </div>
      <slot name="more" :row="data"></slot>
    </div>
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
  methods: {
    toActivityDetail(id) {
      this.$router.push({ path: `/channel/activity/detail/${id}` });
    },
  },
};
</script>
<style lang="scss" scoped>
.content-image {
  flex: 0 0 160px;
  height: 100px;
  border: 1px solid $--border-color;
}
.content-detail {
  margin-left: 16px;
  flex: 1 1 100px;
  .detail-name {
    display: block;
    margin-bottom: 10px;
    font-size: 16px;
    cursor: pointer;
    font-family: "微软雅黑";
    color: $--color-text-primary;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .detail-desc {
    line-height: 24px;
    font-size: 14px;
    color: $--color-text-regular;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    i {
      margin-right: 5px;
      color: $--color-text-secondary;
    }
  }
}
.activity-item ::v-deep .el-table tr td {
  border: 0;
}
.activity-item ::v-deep .el-table__body tr.hover-row > td:first-child,
.activity-item
  ::v-deep
  el-table--enable-row-hover
  .el-table__body
  tr:hover
  > td:first-child {
  border: 0;
}
</style>
