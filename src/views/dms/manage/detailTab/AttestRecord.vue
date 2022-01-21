<template>
  <div>
    <iep-table
      :size="tableSize"
      :isLoadTable="isLoadTable"
      :pagination="pagination"
      :columnsMap="attestColumnsMap"
      :dictsMap="dictsMap"
      :pagedTable="pagedTable"
    >
      <el-table-column label="操作">
        <template slot-scope="scope">
          <iep-operation-wrapper>
            <iep-button
              type="warning"
              @click.native="handleCertification(scope.row.agentId,2)"
              v-if="scope.row.statusName=='待认证'"
            >认证成功</iep-button>
            <span v-else>认证完成</span>
          </iep-operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
  </div>
</template>

<script>
import mixins from "@/mixins/mixins";
import { attestColumnsMap, dictsMap } from "./options.js";
import { getAttestRecordPage, changeCertifyStatus } from "@/api/dms/proxy";
import { mapGetters } from "vuex";

export default {
  mixins: [mixins],
  props: {
    id: {
      type: String,
      default: "",
    },
    createBy: {
      type: Number,
      default: 1,
    },
    agentType: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      attestColumnsMap,
      dictsMap,
    };
  },
  computed: {
    ...mapGetters(["tableSize"]),
  },
  created() {
    this.loadPage();
  },
  methods: {
    loadPage(param = this.searchForm) {
      this.loadTable(
        { createBy: this.createBy, agentType: this.agentType, ...param },
        getAttestRecordPage,
      );
    },

    handleCertification(id, val) {
      this.$confirm("您确定要认证此等级？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const data = await changeCertifyStatus({
            agentId: Number(id),
            certificationStatus: val,
          });
          if (data.data) {
            this.$message({
              type: "success",
              message: "认证成功",
            });
          } else {
            this.$message({
              type: "info",
              message: `${data.message}`,
            });
          }
          this.loadPage();
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
