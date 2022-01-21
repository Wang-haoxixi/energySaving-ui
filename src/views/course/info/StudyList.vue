<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name" :backOption="backOption"></iep-page-header>
      <iep-crud-table
        ref="CrudTable"
        searchName="realName"
        :isMutipleSelection="false"
        :operationOptions="operationOptions"
        :columnsMap="columnsMap"
        :loadFunction="getStudyListPage"
      >
        <template #iep-crud-advance-search>
          <advance-search @search-page="handleSearch"></advance-search>
        </template>
      </iep-crud-table>
    </iep-basic-container>
  </div>
</template>
<script>
import AdvanceSearch from "./StudyAdvanceSearch";
import { getStudyListPageById } from "@/api/qms/course_study_situation";
export default {
  components: {
    AdvanceSearch,
  },
  data() {
    return {
      backOption: {
        isBack: true,
      },
      columnsMap: [
        {
          prop: "realName",
          label: "姓名",
        },
        {
          prop: "startTime",
          label: "开始学习时间",
        },
        {
          prop: "lastTime",
          label: "最后学习时间",
        },
        {
          prop: "learningHour",
          label: "学习课时",
        },
        {
          prop: "progressValue",
          label: "学习进度",
        },
        {
          prop: "progress",
          label: "状态",
          type: "dictGroup",
          dictName: "course_progress",
        },
      ],
      operationOptions: [
        {
          name: "查看详情",
          func: this.handleDetail,
        },
      ],
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    getStudyListPage() {
      return getStudyListPageById(this.id);
    },
  },
  methods: {
    handleSearch(form) {
      this.$refs["CrudTable"].searchPage(form);
    },
    handleDetail(row) {
      this.$router.push({
        path: `/exam/study_detail/${row.id}`,
      });
    },
  },
};
</script>
