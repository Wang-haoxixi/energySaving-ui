<template>
  <div class="questionnaire-manage">
    <iep-table
      :isLoadTable="tableLoading"
      :isPagination="false"
      :pagedTable="pendingList"
      :columnsMap="columnsMap"
    >
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <el-button @click="handleCheck(scope.row)" type="text">审核</el-button>
        </template>
      </el-table-column>
    </iep-table>
  </div>
</template>
<script>
import operationMixins from "@/mixins/operationMixins";
import { getManagePage } from "@/api/qms/questionnaire";
import { columnsMapQuestionnaire as columnsMap } from "../options";
export default {
  mixins: [operationMixins],
  data() {
    return {
      pendingList: [],
      dialogShow: false,
      loading: false,
      dialogObj: {},
      columnsMap,
      tableLoading: false,
    };
  },
  methods: {
    async getPage() {
      this.tableLoading = true;
      const params = {
        status: 4,
      };
      const { data } = await getManagePage(params);
      if (data) {
        this.pendingList = data.records;
      }
      this.tableLoading = false;
    },

    handleCheck() {
      this.$openPage(`/conm/questionnaire_list`);
    },
    backPage() {
      this.dialogShow = false;
    },
    _close() {
      this.getPage();
      this.dialogShow = false;
    },
  },
  created() {
    this.getPage();
  },
};
</script>
<style lang="scss" scoped>
</style>
