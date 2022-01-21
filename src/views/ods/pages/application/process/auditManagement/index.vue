<template>
  <!-- 审核管理 -->
  <div>
    <iep-basic-container>
      <IepPageHeader title="审核管理"></IepPageHeader>
      <el-tabs v-model="activeIndex">
        <el-tab-pane label="事项目录审核" name="1">
          <TableMatter />
        </el-tab-pane>
        <el-tab-pane label="实施清单审核" name="2" disabled></el-tab-pane>
        <el-tab-pane label="最小颗粒度审核" name="3" disabled></el-tab-pane>
      </el-tabs>
    </iep-basic-container>
  </div>
</template>
<script>
import TableMatter from "./components/tableMatter";
export default {
  components: {
    TableMatter,
  },
  data() {
    return {
      activeIndex: "1",
    };
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
::v-deep .el-tabs__nav-wrap:after {
  background-color: #e4e7ed;
}
::v-deep .el-tabs__active-bar::before {
  width: 100%;
  left: 0;
  margin-left: 0;
}
</style>