<template>
  <div>
    <iep-crud-table
      ref="CrudTable"
      :columnsMap="columnsMap"
      :loadFunction="getExamDetailPage"
      :isMutipleSelection="false"
      :useRoutePage="false"
    >
      <template #iep-crud-advance-search>
        <advance-search @search-page="handleSearch"></advance-search>
      </template>
    </iep-crud-table>
  </div>
</template>
<script>
import AdvanceSearch from "./AdvanceSearch";
import { getExamDetailPageById } from "@/api/exam/exam_statistics";
import { mapGetters } from "vuex";
export default {
  components: {
    AdvanceSearch,
  },
  data() {
    return {
      columnsMap: [
        {
          prop: "examName",
          label: "考试名称",
        },
        {
          prop: "createTime",
          label: "答卷时间",
        },
        {
          prop: "commitTime",
          label: "交卷时间",
        },
        {
          prop: "alreadyAnswerTime",
          label: "答题时长",
        },
        {
          prop: "score",
          label: "分数",
        },
        {
          prop: "result",
          label: "成绩状态",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["currentMenuGroup"]),
    isPlatform() {
      return this.currentMenuGroup.id === 2;
    },
    getExamDetailPage() {
      const type = this.isPlatform ? "operate" : "org";
      return getExamDetailPageById(this.$route.params.id, type);
    },
  },
  methods: {
    handleSearch(form) {
      this.$refs["CrudTable"].searchPage(form);
    },
  },
};
</script>
