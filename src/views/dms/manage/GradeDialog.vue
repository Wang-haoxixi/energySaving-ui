<template>
  <div class="grade-dialog">
    <iep-dialog :dialog-show="dialogShow" title="变更代理商等级" width="800px" @close="resetForm">
      <div class="box-wrapper">
        <el-tabs type="border-card" @tab-click="handleClick">
          <!-- primary -->
          <el-tab-pane :label="'初级代理商 \n 1千-1万'"></el-tab-pane>
          <!-- intermediate -->
          <el-tab-pane :label="'中级代理商 \n 1万-10万'"></el-tab-pane>
          <!-- advanced -->
          <el-tab-pane :label="'高级代理商 \n 10万-100万'"></el-tab-pane>
          <iep-table
            :size="tableSize"
            :isLoadTable="isLoadTable"
            :is-pagination="false"
            :columnsMap="columnsMap"
            :pagedTable="pagedTable"
            @row-click="handleCurrentChange"
          >
            <el-table-column label="代理等级" slot="before-columns">
              <template slot-scope="scope">
                <div class="rank">{{scope.row.rank}}</div>
              </template>
            </el-table-column>
            <el-table-column label="选择">
              <template slot-scope="scope">
                <i v-if="scope.row.rankId === rankId" class="el-icon-check"></i>
              </template>
            </el-table-column>
          </iep-table>
        </el-tabs>
      </div>
      <template slot="footer">
        <el-button type="primary" @click="submitForm">确定</el-button>
        <el-button @click="resetForm">取消</el-button>
      </template>
    </iep-dialog>
  </div>
</template>
<script>
import { getProxyConfigList, changeRank } from "@/api/dms/proxy";
import { mapGetters } from "vuex";
export const columnsMap = [
  {
    prop: "bail",
    label: "保证金",
  },
  {
    prop: "discountRate",
    label: "代理折扣",
  },
  {
    prop: "quantity",
    label: "赠予宝贝",
  },
];

export default {
  data() {
    return {
      dialogShow: false,
      rankId: null,
      columnsMap,
      id: null,
      level: 1,
      pagedTable: [],
    };
  },
  computed: {
    ...mapGetters(["tableSize"]),
  },
  created() {
    this.loadList();
  },
  methods: {
    async loadList() {
      this.isLoadTable = true;
      const data = await getProxyConfigList({ level: this.level });
      this.pagedTable = data.data;
      this.rankId = this.pagedTable[0].rankId;
      this.isLoadTable = false;
    },
    resetForm() {
      this.dialogShow = false;
    },
    submitForm() {
      changeRank({ agentId: Number(this.id), rankId: this.rankId }).then(
        (res) => {
          if (res.data) {
            this.$message({
              message: "变更成功",
              type: "success",
            });
            this.dialogShow = false;
            this.loadPage();
          } else {
            this.$message({
              message: res.message,
              type: "warning",
            });
          }
        },
      );
    },
    handleCurrentChange(val) {
      this.rankId = val.rankId;
    },
    handleClick(tab) {
      this.level = Number(tab.index) + 1;
      this.loadList();
    },
  },
};
</script>
<style lang="scss" scoped>
.rank {
  margin-left: 10px;
  padding-top: 8px;
  text-align: center;
  width: 35px;
  height: 35px;
  font-size: 10px;
  font-weight: bold;
  background: url(/img/proxy/dj.png) no-repeat center center;
  background-size: 100% 100%;
  color: #fca051;
}
.el-icon-check {
  color: #e24f55;
  font-size: 22px;
}
</style>
<style scoped>
.grade-dialog >>> .el-tabs__nav {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.grade-dialog >>> .el-tabs__item {
  text-align: center;
  white-space: pre-line;
  height: 70px !important;
  line-height: 20px !important;
  padding-top: 15px;
}
.grade-dialog >>> .el-tabs--border-card {
  box-shadow: 0 0 0 0;
}
</style>
