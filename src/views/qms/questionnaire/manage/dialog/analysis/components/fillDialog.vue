<template>
  <iep-dialog :dialog-show="dialogShow" :title="title" width="1200px" @close="dialogShow=false">
    <div class="search-warp">
      <el-input
        placeholder="搜索答案文本"
        prefix-icon="el-icon-search"
        @keyup.enter.native="handleSearch"
        v-model="input"
        :maxlength="120"
        clearable
      >
        <iep-button class="search-btn" slot="append" @click="handleSearch">搜索</iep-button>
      </el-input>
    </div>
    <iep-table
      :isIndex="isIndex"
      :isLoadTable="isLoadTable"
      :pagination="pagination"
      :columnsMap="columnsMap"
      :pagedTable="pagedTable"
      @pagination-size-change="handlePaginationSizeChange"
      @pagination-current-change="handlePaginationCurrentChange"
      style="width:100%;margin-top: 20px;"
    ></iep-table>
  </iep-dialog>
</template>

<script>
import mixins from "@/mixins/mixins";
import { getQuestionAnswerPage } from "@/api/qms/answer";
export default {
  name: "fillDialog",
  data() {
    return {
      data: {},
      title: "",
      input: "",
      dialogShow: false,
      columnsMap: [],
      isIndex: true,
    };
  },
  methods: {
    async loadPage(param = this.searchForm) {
      switch (this.data.type) {
        case "6":
          await this.loadTable(param, getQuestionAnswerPage);
          break;
        case "7":
          await this.loadTable(param, getQuestionAnswerPage, item => {
            return JSON.parse(item.question_title);
          });
          break;
        default:
          console.log("题目类型错误");
          break;
      }
      this.columnsMapInit();
    },
    open(data) {
      this.searchForm.content = "";
      this.input = ""; //搜索初始化
      this.data = data;
      this.searchForm.questionnaireId = data.questionnaireId;
      this.searchForm.questionId = data.id;
      this.title = `第${this.data.orderNumber}题: ${this.data.title}`;
      this.loadPage();
      this.dialogShow = true;
    },
    columnsMapInit() {
      this.columnsMap = [];
      const records = this.pagedTable;
      if (this.data.type === "6") {
        this.columnsMap.push({
          prop: "answer_time",
          label: records[0].answer_time,
        });
        this.columnsMap.push({
          prop: "question_title",
          label: records[0].question_title,
        });
        this.pagedTable.shift();
      } else {
        for (const item of this.data.optionList) {
          this.columnsMap.push({
            prop: item.name,
            label: item.name,
          });
        }
      }
    },
    handleSearch() {
      this.searchForm.content = this.input;
      this.loadPage();
    },
  },
  mixins: [mixins],
};
</script>

<style scoped>
.search-warp {
  width: 30%;
}
::v-deep .empty {
  padding: 40px 0;
}
</style>
