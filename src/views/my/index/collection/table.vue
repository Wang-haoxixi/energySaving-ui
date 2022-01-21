<template>
  <iep-table
    :isLoadTable="isLoadTable"
    :pagination="pagination"
    :columnsMap="columnsMap"
    :pagedTable="pagedTable"
    :dictsMap="dictsMap"
    @pagination-size-change="handlePaginationSizeChange"
    @pagination-current-change="handlePaginationCurrentChange"
    isMutipleSelection
    @selection-change="selectionChange"
  >
    <template slot="name" slot-scope="scope">
      <div class="name" @click="handleDetail(scope.scope.row)">{{scope.scope.row.name}}</div>
    </template>
    <template slot="recruitName" slot-scope="scope">
      <div class="name" @click="handleRecruitDetail(scope.scope.row)">{{scope.scope.row.name}}</div>
    </template>
    <template slot="createTime" slot-scope="scope">
      <div
        :title="scope.scope.row.createTime|parseToTimeMinutes"
      >{{scope.scope.row.createTime|parseToTimeMinutes}}</div>
    </template>
    <el-table-column prop="operation" label="操作" width="150">
      <template slot-scope="scope">
        <iep-operation-wrapper>
          <el-button type="text" @click="handleCancelCollect(scope.row)">取消收藏</el-button>
        </iep-operation-wrapper>
      </template>
    </el-table-column>
  </iep-table>
</template>

<script>
import mixins from "@/mixins/mixins";
import operationMixins from "@/mixins/operationMixins";
import { tableOption, typeDetailList, dictsMap } from "./options";
import { mapGetters } from "vuex";
import {
  fetchPage,
  deleteCollection,
  deleteCollectionById,
} from "@/api/dms/collection";

export default {
  mixins: [mixins, operationMixins],
  components: {},
  data() {
    return {
      selectList: [],
      type: 0,
      dictsMap,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    columnsMap() {
      const row = typeDetailList[this.type];
      if (row.columnsName) {
        const columns = tableOption;
        columns[0].label = row.columnsName;
        return columns;
      } else {
        return row.columnsMaps;
      }
    },
  },
  methods: {
    loadData(params) {
      this.type = params.type;
      if (this.type === "7") {
        this.queryForm = {};
      } else {
        this.queryForm = Object.assign({}, this.queryForm, params);
      }
      this.loadPage();
    },
    loadPage(param = { ...this.searchForm, ...this.queryForm }) {
      const row = typeDetailList[this.type];
      if (row.requestFn) {
        this.loadTable(param, row.requestFn);
      } else {
        this.loadTable(param, fetchPage);
      }
    },
    handleCancelCollect(row) {
      // 能聘接口单独做的，要单独调用接口
      if (this.type === "7") {
        deleteCollectionById({
          targetIds: [row.recruitId],
          type: 7,
        }).then(({ data }) => {
          if (data) this.loadPage();
        });
      } else {
        deleteCollection([row.id]).then(({ data }) => {
          if (data) this.loadPage();
        });
      }
    },
    selectionChange(val) {
      this.selectList = val;
    },
    handleDetail(row) {
      this.$emit("handle_detail", row, typeDetailList[row.type].type);
    },
    handleRecruitDetail(row) {
      if (row.type === "0") {
        this.$router.push(`/channel/recruit_detail/${row.recruitId}`);
      } else {
        this.$router.push(`/channel/partner_detail/${row.recruitId}`);
      }
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.name {
  width: 100%;
  cursor: pointer;
}
</style>
