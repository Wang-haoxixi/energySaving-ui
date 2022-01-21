<template>
  <div>
    <div style="width:100%;">
      <IepOdsSearch :formProps="searchOption"></IepOdsSearch>
    </div>
    <iep-table
      :size="tableSize"
      :isLoadTable="isLoadTable"
      border
      :pagination="pagination"
      :columnsMap="columnsMap"
      :pagedTable="pagedTable"
      @pagination-size-change="handlePaginationSizeChange"
      @pagination-current-change="handlePaginationCurrentChange"
    >
      <el-table-column prop="operation" label="操作" width="240" fixed="right">
        <template slot-scope="scope">
          <iep-operation-wrapper>
            <el-button type="text" @click="handleExamine(scope.row)">审核</el-button>
          </iep-operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <DailogMatter ref="dialogMatter" />
  </div>
</template>
<script>
import mixins from "@/mixins/mixins";
// import { status } from "./options";
import matterMixin from "../const/matterMixin";
import { mapGetters } from "vuex";
import DailogMatter from "./dialogMatter";
export default {
  mixins: [mixins, matterMixin],
  components: {
    DailogMatter,
  },
  computed: {
    ...mapGetters(["tableSize"]),
  },
  methods: {
    // 表单与页面也换
    backPage(state) {
      this.pageState = "list";
      if (state) this.loadPage();
    },
  },
};
</script>