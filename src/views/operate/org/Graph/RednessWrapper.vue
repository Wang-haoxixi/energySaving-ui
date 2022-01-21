<template>
  <iep-wrapper title="组织红度排名">
    <span class="deadline" slot="left"></span>
    <!-- <span class="deadline" slot="left">截止{{'2020-07-01'}}</span> -->
    <div class="rank-list">
      <div class="rank-item" v-for="(item,index) of rankList" :key="item.orgId">
        <div>
          <span>{{index+1}}</span>
          <span>{{item.name}}</span>
        </div>
        <div :class="item.riseType?'up':'down'">
          <i :class="arrowDict[item.riseType]"></i>
          <span>{{item.riseValue}}</span>
        </div>
      </div>
    </div>
  </iep-wrapper>
</template>
<script>
import { getStatisticsOrgRedness } from "@/api/admin/statistics";
const arrowDict = {
  0: "el-icon-woneng-xiala",
  1: "el-icon-woneng-shangla",
};
export default {
  data() {
    return {
      rankList: [],
      arrowDict,
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const { data } = await getStatisticsOrgRedness();
      this.rankList = data.slice(0, 6);
    },
  },
};
</script>
<style lang="scss" scoped>
.deadline {
  color: $--color-text-regular;
  font-size: 12px;
}
.rank-list {
  width: 100%;
  height: 100%;
  .rank-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
    & > div {
      font-size: 14px;
      color: $--color-text-regular;
      display: flex;
      align-items: center;
      &:first-of-type {
        & > span:first-of-type {
          width: 24px;
          height: 24px;
          display: block;
          border: 1px solid $--background-color;
          border-radius: $--small-border-radius;
          text-align: center;
          line-height: 24px;
          margin-right: 5px;
        }
      }
      &:last-of-type {
        font-size: 16px;
        &.up {
          color: $--color-primary;
        }
        &.down {
          color: $--color-input-regular;
        }
        & > span {
          margin-left: 5px;
        }
      }
    }
  }
}
</style>
