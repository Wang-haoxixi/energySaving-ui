<template>
  <div class="access-wrapper">
    <iep-wrapper title="主要页面访问分析">
      <iep-tabs style="width: 100%;margin-top:-40px" v-model="tabName" :tabList="tabList">
        <template v-if="tabName ==='pc'" v-slot:pc>
          <pc-access></pc-access>
        </template>
        <template v-if="tabName ==='app'" v-slot:app>
          <pc-access></pc-access>
        </template>
      </iep-tabs>
    </iep-wrapper>
  </div>
</template>
<script>
import PcAccess from "./Components/PcAccess";
const tabList = [
  {
    label: "PC",
    value: "pc",
  },
  {
    label: "APP",
    value: "app",
  },
];
export default {
  components: {
    PcAccess,
  },
  data() {
    return {
      tabList,
      tabName: "pc",
    };
  },
};
</script>
<style lang="scss" scoped>
.iep-tabs ::v-deep .el-tabs__nav-scroll {
  display: flex;
  justify-content: flex-end;
}
.access-wrapper ::v-deep .el-table__body-wrapper {
  height: 340px;
  overflow: auto;
  overflow-x: hidden;
}
</style>