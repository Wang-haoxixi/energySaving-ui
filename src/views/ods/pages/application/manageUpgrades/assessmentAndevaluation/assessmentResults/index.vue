<template>
  <!-- 审核管理 -->
  <div>
    <div v-show="pageState === 'list'">
      <iep-basic-container>
        <IepPageHeader title="考核结果" @row-click="onRowClick"></IepPageHeader>
        <div style="width:100%;">
          <IepOdsSearch :formProps="searchOption"></IepOdsSearch>
        </div>
        <div class="asy-box">
          <span class="asy">当前表格已选择 {{val}} 项</span>
          <span class="clear" @click="toggleSelection()">清空</span>
        </div>
        <iep-table
          :size="tableSize"
          ref="multipleTable"
          :isLoadTable="isLoadTable"
          border
          :pagination="pagination"
          :columnsMap="columnsMap"
          :pagedTable="pagedTable"
          :isMutipleSelection="true"
          @selection-change="handleSelectionChange"
          @pagination-size-change="handlePaginationSizeChange"
          @pagination-current-change="handlePaginationCurrentChange"
        >
          <el-table-column prop="operation" label="操作" width="240" fixed="right">
            <template slot-scope="scope">
              <iep-operation-wrapper>
                <el-button type="text" @click="handleResult(scope.row)">评估结果</el-button>
                <el-button type="text" @click="handleAnalysis(scope.row)">统计分析</el-button>
              </iep-operation-wrapper>
            </template>
          </el-table-column>
        </iep-table>
      </iep-basic-container>
    </div>
    <form-tpl ref="form" v-if="pageState === 'form'" @load-page="backPage" :formStatus="formStatus"></form-tpl>
  </div>
</template>
<script>
import currentMixin from "./const/mixin";
import { mapGetters } from "vuex";
import mixins from "@/mixins/mixins";
import FormTpl from "./form";
export default {
  mixins: [currentMixin, mixins],
  components: {
    FormTpl,
  },
  data() {
    return {
      multipleSelection: [],
      val: 0,
    };
  },
  computed: {
    ...mapGetters(["tableSize"]),
  },
  methods: {
    // 事项点击事件
    onRowClick(row) {
      console.log("事项点击事件", row);
    },
    toggleSelection() {
      this.multipleSelection = [];
      this.val = 0;
      this.$refs["multipleTable"].toggleSelection();
    },
    // 表单与页面也换
    backPage(state) {
      this.pageState = "list";
      if (state) this.loadPage();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.val = val.length;
    },
  },
};
</script>
<style lang="scss" scoped>
.asy-box {
  margin-bottom: 15px;
  font-size: 14px;
  color: $--color-primary;
  padding: 10px;
  border: 1px solid rgba(250, 236, 234);
  background-color: rgba(250, 236, 234, 0.3);
  border-radius: 5px;
}
.asy {
  margin-right: 8px;
}
.clear {
  cursor: pointer;
}
</style>