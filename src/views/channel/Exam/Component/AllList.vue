<template>
  <div class="all-list">
    <template v-if="!noData">
      <div v-if="courseTotal" class="search-result-box">
        <div class="search-title">
          共
          <span>{{courseTotal}}</span>
          门包含
          <span>{{keyword}}</span>
          的课程
        </div>
        <div class="card-list-box">
          <CourseCard v-for="item in courseList" :key="item.id" :item="item"></CourseCard>
        </div>
      </div>
      <div v-if="examTotal" class="search-result-box">
        <div class="search-title">
          共
          <span>{{examTotal}}</span>
          门包含
          <span>{{keyword}}</span>
          的考试
        </div>
        <div class="card-list-box">
          <ExamCard v-for="item in examList" :key="item.id" :item="item"></ExamCard>
        </div>
      </div>
      <div v-if="exeTotal" class="search-result-box">
        <div class="search-title">
          共
          <span>{{exeTotal}}</span>
          门包含
          <span>{{keyword}}</span>
          的练习
        </div>
        <div class="card-list-box">
          <ExerciseCard v-for="item in exeList" :key="item.id" :item="item"></ExerciseCard>
        </div>
      </div>
    </template>
    <template v-else>
      <iep-no-data complex></iep-no-data>
    </template>
  </div>
</template>
<script>
import { getExamAppListByName } from "@/api/qms/exam_examination";
import { getExerciseAppListByName } from "@/api/qms/exam_exercise";
import { getCourseInfoAppListByName } from "@/api/qms/course_info";
import CourseCard from "./CourseCard";
import ExamCard from "./ExamCard";
import ExerciseCard from "./ExerciseCard";
export default {
  components: {
    CourseCard,
    ExamCard,
    ExerciseCard,
  },
  data() {
    return {
      courseList: [],
      courseTotal: 0,
      examList: [],
      examTotal: 0,
      exeList: [],
      exeTotal: 0,
    };
  },
  computed: {
    keyword() {
      return this.$route.query.name;
    },
    noData() {
      return !this.courseTotal && !this.examTotal && !this.exeTotal;
    },
  },
  watch: {
    "$route.query.name": {
      handler: function (v) {
        this.load(v);
      },
      immediate: true,
    },
  },
  methods: {
    load(name) {
      this.loadCourse(name);
      this.loadExam(name);
      this.loadExe(name);
    },
    async loadCourse(name) {
      const { list4, total } = await getCourseInfoAppListByName(name);
      this.courseList = list4;
      this.courseTotal = total;
    },
    async loadExam(name) {
      const { list4, total } = await getExamAppListByName(name);
      this.examList = list4;
      this.examTotal = total;
    },
    async loadExe(name) {
      const { list4, total } = await getExerciseAppListByName(name);
      this.exeList = list4;
      this.exeTotal = total;
    },
  },
};
</script>
<style lang="scss" scoped>
.all-list {
  margin-top: 30px;
  .search-result-box {
    margin: 10px 0;
    .search-title {
      margin: 20px 0;
      color: $--color-text-secondary;
      font-size: 16px;
      span {
        color: $--color-text-primary;
      }
    }
  }
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
