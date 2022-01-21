<template>
  <div class="data-box box">
    <div class="data-group">
      <IepDataItem
        v-for="(data,i) in orgExponent"
        :key="i"
        :value="data.num|showBigNumber|arrJoin"
        :label="data.name"
        :iconUrl="data.url"
      ></IepDataItem>
    </div>
  </div>
</template>
<script>
import { OrgExponentEntity } from "@/types/org";
import { hasPermissions } from "@/util/menu";
export default {
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  computed: {
    orgExponent() {
      const data = this.$mergeByFirst(
        new OrgExponentEntity(),
        this.value.exponent,
      );
      const dataList = [
        {
          num: data.creditWorth,
          name: "信用值",
          url: hasPermissions("so_credit") ? "/so/credit" : "",
          title: "信用值分析",
        },
        {
          num: data.assetsWorth,
          name: "数据资产",
          url: hasPermissions("so_data") ? "/so/assets/whole" : "",
          title: "数据资产总体分析",
        },
        {
          num: data.mightyOne,
          name: "用户",
        },
        {
          num: data.taskCount,
          name: "任务数",
        },
      ];
      return dataList;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./common.scss";
.data-box {
  display: flex;
  flex-direction: column;
  .sub-title {
    font-family: "微软雅黑";
    color: $--color-text-primary;
  }
  .data-group {
    flex: 1;
    height: 100%;
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    ::v-deep .data-item {
      &:nth-of-type(1) {
        border-right: 1px solid $--border-color;
        border-bottom: 1px solid $--border-color;
      }
      &:nth-of-type(2) {
        border-bottom: 1px solid $--border-color;
      }
      &:nth-of-type(3) {
        border-right: 1px solid $--border-color;
      }
      & > span:nth-of-type(1) {
        font-size: 22px;
      }
    }
  }
}
</style>
