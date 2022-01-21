<template>
  <div>
    <iep-table
      :isIndex="isIndex"
      :isLoadTable="isLoadTable"
      :pagination="pagination"
      :columnsMap="columnsMap"
      :pagedTable="pagedTable"
      @pagination-size-change="handlePaginationSizeChange"
      @pagination-current-change="handlePaginationCurrentChange"
      style="width:100%;margin-top: 20px;"
    >
      <template
        #name="{scope}"
      >{{scope.row.question_title&&JSON.parse(scope.row.question_title).value[0].name||"暂无"}}</template>
      <template #url="{scope}">
        <el-button
          type="text"
          @click="downLoad(scope.row.question_title&&JSON.parse(scope.row.question_title).value[0])"
        >查看/下载</el-button>
      </template>
    </iep-table>
  </div>
</template>

<script>
import mixins from "@/mixins/mixins";
import { getQuestionAnswerPage } from "@/api/qms/answer";
const columnsMap = [
  { label: "文件名", prop: "name", type: "slot" },
  { label: "下载", prop: "url", type: "slot" },
];
export default {
  name: "uploader",
  data() {
    return {
      columnsMap: columnsMap,
      isIndex: true,
    };
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    async loadPage(param = this.searchForm) {
      await this.loadTable(param, getQuestionAnswerPage);
    },
    open(data) {
      this.searchForm.questionnaireId = data.questionnaireId;
      this.searchForm.questionId = data.id;
      this.title = `第${data.orderNumber}题: ${data.title}`;
      this.loadPage();
    },
    downLoad({ url, name }) {
      const link = document.createElement("a");
      link.href = url;
      link.download = name;
      link.target = "_blank";
      link.style.display = "none";
      link.click();
    },
  },
  mounted() {
    this.open(this.data);
  },
  mixins: [mixins],
};
</script>

<style scoped>
.search-warp {
  width: 30%;
}
</style>
