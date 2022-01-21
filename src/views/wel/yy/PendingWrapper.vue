<template>
  <div class="penging-wrapper">
    <iep-wrapper title="待处理内容">
      <iep-tabs style="width: 100%;margin-top:-40px" v-model="tabName" :tabList="dealTabList">
        <template v-if="tabName ==='reportManage'" v-slot:reportManage>
          <report-manage></report-manage>
        </template>
        <template v-if="tabName ==='suggestManage'" v-slot:suggestManage>
          <suggest-manage></suggest-manage>
        </template>
        <template v-if="tabName ==='productManage'" v-slot:productManage>
          <product-manage></product-manage>
        </template>
        <template v-if="tabName ==='activityManage'" v-slot:activityManage>
          <activity-manage></activity-manage>
        </template>
        <template v-if="tabName ==='questionnaireManage'" v-slot:questionnaireManage>
          <questionnaire-manage></questionnaire-manage>
        </template>
      </iep-tabs>
    </iep-wrapper>
  </div>
</template>
<script>
import ReportManage from "./Components/ReportManage";
import SuggestManage from "./Components/SuggestManage";
import ProductManage from "./Components/ProductManage";
import ActivityManage from "./Components/ActivityManage";
import QuestionnaireManage from "./Components/QuestionnaireManage";
import { dealTabList } from "./options";

export default {
  components: {
    ReportManage,
    SuggestManage,
    ProductManage,
    ActivityManage,
    QuestionnaireManage,
  },
  data() {
    return {
      tabName: "reportManage",
      dealTabList,
    };
  },
};
</script>
<style lang="scss" scoped>
.penging-wrapper {
  border-radius: 10px;
  background-color: inherit;
}
.penging-wrapper ::v-deep .el-table .cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.button {
  margin-right: 8px !important;
}
.penging-wrapper ::v-deep .operation-container {
  display: none;
}
.penging-wrapper ::v-deep .el-table th.is-leaf {
  font-family: "微软雅黑";
  background-color: rgb(242, 244, 245);
  color: $--color-text-primary;
}
.penging-wrapper ::v-deep .el-table__body td {
  padding: 3px 0;
}
.penging-wrapper ::v-deep .el-table__body-wrapper {
  height: 170px;
  overflow: auto;
  overflow-x: hidden;
}
.penging-wrapper ::v-deep .el-table::before,
.penging-wrapper ::v-deep .el-table--group::after,
.penging-wrapper ::v-deep .el-table--border::after {
  display: none;
}
.penging-wrapper ::v-deep .el-table__body tr,
.penging-wrapper ::v-deep .el-table--enable-row-hover .el-table__body tr,
.penging-wrapper ::v-deep .el-table__body tr.hover-row,
.penging-wrapper ::v-deep .el-table--enable-row-hover .el-table__body tr:hover {
  box-shadow: inherit;
  td {
    border: 0;
  }
}
.iep-tabs ::v-deep .el-tabs__nav-scroll {
  display: flex;
  justify-content: flex-end;
}
</style>