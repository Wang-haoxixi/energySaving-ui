<template>
  <div class="tags-function">
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name"></iep-page-header>
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column label="标签功能">
          <template slot-scope="scope">
            <i class="el-icon-info"></i>
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
            <p>{{scope.row.description}}</p>
          </template>
        </el-table-column>
        <el-table-column label="是否启用" width="180" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.enable"
              active-color="#13ce66"
              inactive-color="#eff0f1"
              :active-value="1"
              :inactive-value="0"
              @change="toggleEnable(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
      </el-table>
    </iep-basic-container>
  </div>
</template>
<script>
import { getTagFunctionList, enableTagFunction } from "@/api/tms/function";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      getTagFunctionList().then(res => {
        this.tableData = res.data;
      });
    },
    toggleEnable(row) {
      enableTagFunction(row.id).then(() => {
        this.load();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.tags-function ::v-deep .el-table th.is-leaf {
  font-family: "微软雅黑";
  background-color: rgb(242, 244, 245);
  color: $--color-text-primary;
  font-size: 14px;
}
.tags-function ::v-deep .el-table__empty-text {
  font-size: 14px;
}
</style>
