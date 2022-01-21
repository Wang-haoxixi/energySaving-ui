<template>
  <TitleWrap title="推荐课程" moreLink="/channel/exam/list/2">
    <iep-no-data v-if="!courseList.length" complex></iep-no-data>
    <div v-else class="grid-container">
      <CourseCard v-for="item in courseList" :key="item.id" :item="item"></CourseCard>
    </div>
  </TitleWrap>
</template>
<script>
import TitleWrap from "./TitleWrap";
import CourseCard from "./CourseCard";
import { getRecommendCourseListBySize } from "@/api/qms/course_info";
export default {
  components: {
    TitleWrap,
    CourseCard,
  },
  data() {
    return {
      courseList: [],
    };
  },
  mounted() {
    this.loadPage();
  },
  methods: {
    async loadPage() {
      this.courseList = await getRecommendCourseListBySize(8);
    },
  },
};
</script>
<style lang="scss" scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 285px);
  grid-template-rows: repeat(auto-fill, 280px);
  gap: 30px 20px;
  grid-template-areas:
    ". . . ."
    ". . . .";
  margin-bottom: 60px;
}
</style>
