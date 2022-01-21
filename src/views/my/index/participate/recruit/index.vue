<template>
  <div class="recruit">
    <iep-operation-container>
      <template slot="right">
        <iep-operation-search
          @search-page="searchPage"
          :paramForm="searchForm"
          advance-search
          prop="name"
        ></iep-operation-search>
      </template>
    </iep-operation-container>
    <iep-table
      :isLoadTable="isLoadTable"
      :pagination="pagination"
      :dictsMap="dictsMap"
      :columnsMap="columnsMap"
      :pagedTable="pagedTable"
      @pagination-size-change="handlePaginationSizeChange"
      @pagination-current-change="handlePaginationCurrentChange"
    >
      <template slot="name" slot-scope="scope">
        <div
          class="name"
          @click="handleDetail(scope.scope.row)"
        >{{transformString(scope.scope.row.name)}}</div>
      </template>
      <IepOperationTableBtnGroup :options="operationOptions" label="操作"></IepOperationTableBtnGroup>
    </iep-table>
  </div>
</template>
<script>
import { getMyApply } from "@/api/dms/recruit_query";
import { delByUser } from "@/api/dms/recruit_operation";
import mixins from "@/mixins/mixins";
import operationMixins from "@/mixins/operationMixins";
import { transformString } from "@/util/dataDeal";
export default {
  mixins: [mixins, operationMixins],
  data() {
    return {
      columnsMap: [
        {
          prop: "name",
          label: "名称",
          type: "slot",
        },
        {
          prop: "orgName",
          label: "组织名称",
        },
        {
          prop: "createTime",
          label: "申请时间",
          width: 200,
        },
        {
          prop: "isRead",
          label: "状态",
          width: 120,
          type: "dict",
        },
      ],
      operationOptions: [
        {
          name: "删除",
          func: this.handleDeleteById,
          hidden: false,
        },
      ],
      dictsMap: {
        state: {
          0: "招聘中",
          1: "停止招聘",
        },
        isRead: {
          0: "未查看",
          1: "已查看",
        },
      },
    };
  },
  methods: {
    transformString,
    loadPage(param = { ...this.searchForm, ...this.queryForm }) {
      this.loadTable(param, getMyApply);
    },
    handleDeleteById(row) {
      this._handleComfirm(
        {
          applyObj: [
            {
              applyId: row.applyId,
              type: row.type,
            },
          ],
        },
        delByUser,
        "删除这条投递",
      );
    },
    handleDetail(row) {
      if (row.state === "1") {
        this.$message.warning("该岗位已经停止招聘");
      } else {
        this.$router.push(`/channel/recruit_detail/${row.recruitId}`);
      }
    },
  },
  created() {
    this.loadPage();
  },
};
</script>
<style lang="scss" scoped>
.name {
  text-decoration-line: underline;
  cursor: pointer;
}
</style>
