<template>
  <div class="type-list">
    <iep-no-data v-if="!pagedTable.length" complex></iep-no-data>
    <div class="card-list-box">
      <component :is="componentName" v-for="item in pagedTable" :key="item.id" :item="item"></component>
    </div>
    <div class="page" v-if="pagedTable.length > 0">
      <iep-pagination
        @size-change="handlePaginationSizeChange"
        @current-change="handlePaginationCurrentChange"
        :pagination-option="pagination"
        :layout="layout"
        background
      ></iep-pagination>
    </div>
  </div>
</template>
<script>
import mixins from "@/mixins/mixins";
import { pageOption } from "@/const/pageConfig";
import { getExamAppPage } from "@/api/qms/exam_examination";
import { getExerciseAppPage } from "@/api/qms/exam_exercise";
import { getCourseInfoAppPage } from "@/api/qms/course_info";
import CourseCard from "./CourseCard";
import ExamCard from "./ExamCard";
import ExerciseCard from "./ExerciseCard";
export default {
  mixins: [mixins],
  components: {
    CourseCard,
    ExamCard,
    ExerciseCard,
  },
  data() {
    const initSize = 16;
    return {
      isRoute: true,
      iepPageSize: initSize,
      pageOption: pageOption(initSize),
      layout: "prev, pager, next",
    };
  },
  computed: {
    type() {
      return this.$route.params.type;
    },
    searchName() {
      if (this.type === "2") {
        return "courseName";
      } else {
        return "examName";
      }
    },
    componentName() {
      if (this.type === "2") {
        return "CourseCard";
      } else if (this.type === "3") {
        return "ExamCard";
      } else {
        return "ExerciseCard";
      }
    },
    getListPage() {
      if (this.type === "2") {
        return getCourseInfoAppPage;
      } else if (this.type === "3") {
        return getExamAppPage;
      } else {
        return getExerciseAppPage;
      }
    },
  },

  watch: {
    "$route.query.name": {
      handler: function () {
        this.loadPage();
      },
      immediate: true,
    },
  },
  methods: {
    async loadPage(param = { ...this.searchForm }) {
      const { query } = this.$route;
      query[this.searchName] = query.name;
      await this.loadTable({ ...param, ...query }, this.getListPage);
    },
  },
};
</script>
<style lang="scss" scoped>
.type-list {
  margin: 30px 0;
}
.card-list-box {
  display: grid;
  grid-template-columns: 285fr 285fr 285fr 285fr;
  grid-template-rows: 160fr;
  gap: 30px 20px;
  grid-template-areas:
    ". . . ."
    ". . . .";
}
</style>
