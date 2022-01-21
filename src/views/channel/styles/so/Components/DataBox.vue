<template>
  <div>
    <div class="title">数据</div>
    <div class="grid-container">
      <IepDataItem v-for="item in dataList" :key="item.name" :value="item.num" :label="item.name"></IepDataItem>
    </div>
  </div>
</template>
<script>
import { getOrgCount } from "@/api/dms/comprehensive";
export default {
  data() {
    return {
      dataList: [
        { num: "--", name: "任务" },
        { num: "--", name: "材料" },
        { num: "--", name: "纪要" },
        { num: "--", name: "报表" },
        { num: "--", name: "产品" },
        { num: "--", name: "问卷" },
      ],
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    async load() {
      const { data } = await getOrgCount(this.$route.params.id);
      this.dataList[0].num = data.orgTaskCount;
      this.dataList[1].num = data.orgMaterialCount;
      this.dataList[2].num = data.orgMeetingCount;
      this.dataList[3].num = data.orgReportCount;
      this.dataList[4].num = data.orgProductCount;
      this.dataList[5].num = data.orgQuestionCount;
    },
  },
};
</script>
<style lang="scss" scoped>
.title {
  margin-bottom: 30px;
  font-size: 16px;
  font-family: "微软雅黑";
  color: $--color-text-primary;
}
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  ::v-deep .data-item {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-sizing: border-box;
    padding: 10px;
    &:nth-of-type(1),
    &:nth-of-type(2) {
      border-right: 1px solid $--border-color;
      border-bottom: 1px solid $--border-color;
    }
    &:nth-of-type(3) {
      border-bottom: 1px solid $--border-color;
    }
    &:nth-of-type(4),
    &:nth-of-type(5) {
      border-right: 1px solid $--border-color;
    }
  }
}
</style>
