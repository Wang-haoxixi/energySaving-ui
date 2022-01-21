<template>
  <div class="recommend-person">
    <iep-tabs v-model="activeTab" :tab-list="tabList" class="tab">
      <!-- <template v-if="activeTab ==='Understanding'" v-slot:Understanding>
        <understanding v-loading="activeTab !=='Understanding'"></understanding>
      </template>-->
      <template v-if="activeTab ==='Recommend'" v-slot:Recommend>
        <recommend v-loading="activeTab !=='Recommend'"></recommend>
      </template>
    </iep-tabs>
  </div>
</template>
<script>
import Recommend from "./Recommend";

export default {
  components: {
    Recommend,
  },
  data() {
    return {
      tabList: [
        {
          label: "推荐好友",
          value: "Recommend",
        },
      ],
      activeTab: "Recommend",
    };
  },
};
</script>
<style lang="scss" scoped>
.tab ::v-deep .el-tabs__active-bar {
  display: none;
}
.recommend-person ::v-deep .iep-tabs .el-tabs__item {
  font-size: 18px;
  padding: 0 25px;
  &:nth-child(2) {
    padding-left: 0;
  }
}
.recommend-person ::v-deep .iep-tabs .el-tabs__item.is-active {
  font-family: "微软雅黑";
  font-family: "微软雅黑";
  color: $--color-text-primary;
}
.recommend-person ::v-deep .el-tabs__header {
  height: 18px;
  line-height: 18px;
}
</style>


