<template>
  <div class="container">
    <IndexBanner></IndexBanner>
    <div class="content">
      <IndexSearchBox></IndexSearchBox>
      <div class="container">
        <RecommendCourse></RecommendCourse>
        <HotExam></HotExam>
        <LatestExercises></LatestExercises>
        <Ranking></Ranking>
      </div>
    </div>
  </div>
</template>

<script>
import IndexSearchBox from "./Component/IndexSearchBox";
import IndexBanner from "./Component/IndexBanner";
import RecommendCourse from "./Component/RecommendCourse";
import HotExam from "./Component/HotExam";
import LatestExercises from "./Component/LatestExercises";
import Ranking from "./Component/Ranking";
export default {
  components: {
    IndexBanner,
    IndexSearchBox,
    RecommendCourse,
    HotExam,
    LatestExercises,
    Ranking,
  },
};
</script>
<style lang="scss" scoped>
.container {
  position: relative;
  background: #fff;
}
</style>
