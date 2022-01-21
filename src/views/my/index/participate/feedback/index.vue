<template>
  <div>
    <iep-crud-table
      class="crud-table"
      ref="CrudTable"
      searchName="title"
      :dictsMap="dictsMap"
      :columnsMap="columnsMap"
      :loadFunction="getMyFeedbackPage"
      :operationOptions="operationOptions"
      :isMutipleSelection="false"
      :operationWidth="150"
    >
      <template #iep-crud-left>
        <div>您共反馈了{{countData[0]}}题，其中{{countData[1]}}题被采纳，{{countData[2]}}题被驳回。</div>
      </template>
    </iep-crud-table>
    <FeedbackDialog ref="FeedbackDialog"></FeedbackDialog>
  </div>
</template>
<script>
import { dictsMap } from "./options";
import FeedbackDialog from "./FeedbackDialog";
import {
  getMyFeedbackPage,
  getById,
  myFeedbackCount,
} from "@/api/qms/feedback";
export default {
  components: {
    FeedbackDialog,
  },
  data() {
    return {
      countData: [0, 0, 0],
      dictsMap,
      operationOptions: [
        {
          name: "查看",
          func: this.查看,
        },
      ],
      columnsMap: [
        {
          prop: "title",
          label: "试题标题",
        },
        {
          prop: "explanation",
          label: "反馈内容说明",
        },
        {
          prop: "type",
          label: "反馈类型",
          type: "dict",
        },
        {
          prop: "result",
          label: "反馈结果",
          type: "dict",
        },
      ],
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    getMyFeedbackPage,
    async 查看(row) {
      const { data } = await getById(row.id);
      this.$refs["FeedbackDialog"].data = data;
      this.$refs["FeedbackDialog"].dialogShow = true;
    },
    async loadData() {
      const { data } = await myFeedbackCount();
      this.countData = data;
    },
  },
};
</script>
