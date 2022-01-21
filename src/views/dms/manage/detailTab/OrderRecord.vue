<template>
  <div>
    <iep-table
      :isLoadTable="isLoadTable"
      :pagination="pagination"
      :columnsMap="trackingColumnsMap"
      :dictsMap="dictsMap"
      :pagedTable="pagedTable"
    >
      <el-table-column label="操作">
        <template slot-scope="scope">
          <iep-operation-wrapper>
            <el-button type="text" @click.native="handleDetail(scope.row)">查看</el-button>
          </iep-operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
  </div>
</template>

<script>
import mixins from "@/mixins/mixins";
import { trackingColumnsMap, dictsMap } from "./options.js";
import { getRecordByUserPage } from "@/api/dms/proxy";

export default {
  mixins: [mixins],
  props: {
    id: {
      type: String,
      default: "",
    },
    createBy: {
      type: Number,
      default: null,
    },
    agentType: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      trackingColumnsMap,
      dictsMap,
      value: "",
    };
  },
  created() {
    this.loadPage();
  },
  methods: {
    loadPage(param = this.searchForm) {
      this.loadTable(
        { createBy: this.createBy, agentType: this.agentType, ...param },
        getRecordByUserPage,
      );
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
