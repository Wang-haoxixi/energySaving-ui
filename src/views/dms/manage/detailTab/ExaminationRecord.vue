<template>
  <div>
    <iep-table
      :isLoadTable="isLoadTable"
      :pagination="pagination"
      :columnsMap="examColumnsMap"
      :dictsMap="dictsMap"
      :pagedTable="pagedTable"
    >
      <el-table-column label="状态">
        <template slot-scope="scope">
          <iep-operation-wrapper>
            <iep-button
              type="warning"
              plain
              @click.native="handleCertification(scope.row.agentId,1)"
              v-if="scope.row.payStatusName=='报名中'"
            >已完成</iep-button>
          </iep-operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
  </div>
</template>

<script>
import mixins from "@/mixins/mixins";
import { examColumnsMap, dictsMap } from "./options.js";
import { getRecordByUserPage, changeBailStatus } from "@/api/dms/proxy";

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
      examColumnsMap,
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
    async handleCertification(id, val) {
      const { data } = await changeBailStatus({
        agentId: Number(id),
        payStatus: val,
      });
      if (data) {
        this.$message({
          message: "报名成功",
          type: "success",
        });
        this.loadPage();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
