<template>
  <div class="table">
    <iep-operation-container>
      <template slot="left">
        <el-button class="button" type="primary" icon="el-icon-plus" @click="handleCreate">新增</el-button>
      </template>
      <template slot="right">
        <searchFormTpl @searchPage="searchPage"></searchFormTpl>
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
      <el-table-column prop="operation" label="操作" width="120">
        <template slot-scope="scope">
          <iep-operation-wrapper>
            <el-button type="text" @click="handleUpdate(scope.row)">编辑</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button type="text" @click="handleDeleteById(scope.row)">删除</el-button>
          </iep-operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
  </div>
</template>
<script>
import mixins from "@/mixins/mixins";
import operationMixins from "@/mixins/operationMixins";
import { columnsMap, dictsMap } from "./options";
import {
  getQuestionPage,
  getQuestionById,
  deleteQuestion,
} from "@/api/ims/question";
import searchFormTpl from "./searchForm";
import { mapActions } from "vuex";

export default {
  mixins: [mixins, operationMixins],
  components: { searchFormTpl },
  props: {
    classList: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      dictsMap,
      columnsMap,
    };
  },
  methods: {
    loadPage(id, state) {
      if (id) this.searchForm.type = id;
      if (state) this.pageOption.current = 1;
      this.isLoadTable = false;
      // 计算反馈满意度
      const fn = m => {
        const num = m.goodReviewNum + m.badReviewNum;
        if (num > 0) {
          m.goodReview =
            (
              (m.goodReviewNum / (m.goodReviewNum + m.badReviewNum)) *
              100
            ).toFixed(2) + "%";
        } else {
          m.goodReview = 0;
        }
        return m;
      };
      this.loadTable(this.searchForm, getQuestionPage, fn);
    },
    handleCreate() {
      this.$emit("handle_form", "create");
    },
    handleUpdate(row) {
      getQuestionById({ id: row.id }).then(({ data }) => {
        this.$emit("handle_form", "update", data);
      });
    },
    handleDeleteById(row) {
      this._handleComfirm({ id: row.id }, deleteQuestion, "确认删除此条数据？");
    },
    searchPage(val) {
      delete this.searchForm.type;
      this.searchForm = Object.assign({}, this.searchForm, val);
      this.pageOption.current = 1;
      this.loadPage();
    },
    ...mapActions(["QuestionAndAnswer"]),
    handleQuestion() {
      this.QuestionAndAnswer(true);
    },
  },
  created() {
    this.searchForm.descs = "modified_time";
    this.loadPage();
  },
  watch: {
    classList: {
      handler(val) {
        this.dictsMap.type = val;
      },
      deep: true,
    },
  },
};
</script>
<style scoped lang="scss">
.table {
  .button {
    margin-right: 15px;
  }
  button {
    margin-right: 0;
  }
}
</style>
