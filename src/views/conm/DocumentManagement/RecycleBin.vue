<template>
  <div>
    <iep-basic-container>
      <iep-table
        :size="tableSize"
        :isLoadTable="isLoadTable"
        :pagination="pagination"
        :dictsMap="dictsMap"
        :columnsMap="columnsMap"
        :pagedTable="pagedTable"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        is-mutiple-selection
      >
        <template slot="before-columns">
          <el-table-column label="ID" width="90px">
            <template slot-scope="scope">
              <div>{{ scope.row.id }}</div>
            </template>
          </el-table-column>
          <el-table-column label="标题" width="200px">
            <template slot-scope="scope">
              <iep-table-link @click="handleDetail(scope.row)">
                {{
                scope.row.title
                }}
              </iep-table-link>
            </template>
          </el-table-column>
          <el-table-column label="发布时间">
            <template slot-scope="scope">
              <iep-table-link>{{ scope.row.time }}</iep-table-link>
            </template>
          </el-table-column>
        </template>
        <el-table-column prop="operation" label="操作" width="250" fixed="right">
          <template slot-scope="scope">
            <iep-operation-wrapper>
              <el-button type="text">查看评论</el-button>
              <el-button type="text" @click="handleEdit(scope.row)">撤销</el-button>
            </iep-operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </iep-basic-container>
  </div>
</template>
<script>
import { columnsMap, initSearchForm, dictsMap } from "./options";
import mixins from "@/mixins/mixins";
import { mapGetters } from "vuex";
export default {
  mixins: [mixins],
  data() {
    return {
      dictsMap,
      columnsMap,
      paramForm: initSearchForm(),
      pagedTable: [
        {
          id: 1,
          title: "saaa",
          time: "2018-08-09",
          browsingVolume: "sad",
          numberOfComments: "12ad",
          status: "0",
        },
        {
          id: 2,
          title: "saaa",
          time: "2018-08-09",
          browsingVolume: "sad",
          numberOfComments: "0ada",
          status: "1",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["tableSize"]),
  },
};
</script>
<style lang="scss" scoped>
.aside-main {
  display: flex;
  margin: 0 !important;
  padding: 20px;
  width: 100%;
  height: 100vh;
}
.sub-menu-left {
  margin: -20px 15px -20px -20px;
  padding-top: 12px;
  border-right: 1px solid #ebeef5;
  .el-card {
    border: 0;
  }
}
</style>
<style scoped>
.aside-main >>> .ant-menu-inline {
  border-right: none;
}
</style>
