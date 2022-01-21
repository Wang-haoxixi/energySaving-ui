<template>
  <TitleWrap title="最新练习" moreLink="/channel/exam/list/4">
    <iep-no-data v-if="!exeList.length" complex></iep-no-data>
    <div v-else class="grid-container">
      <ExerciseCard v-for="item in exeList" :key="item.id" :item="item"></ExerciseCard>
    </div>
  </TitleWrap>
</template>
<script>
import TitleWrap from "./TitleWrap";
import ExerciseCard from "./ExerciseCard";
import { getLatestExerciseListBySize } from "@/api/qms/exam_exercise";
export default {
  components: {
    TitleWrap,
    ExerciseCard,
  },
  data() {
    return {
      exeList: [],
    };
  },
  mounted() {
    this.loadPage();
  },
  methods: {
    async loadPage() {
      this.exeList = await getLatestExerciseListBySize(4);
    },
  },
};
</script>
<style lang="scss" scoped>
.grid-container {
  display: grid;
  grid-template-columns: 285fr 285fr 285fr 285fr;
  grid-template-rows: 160fr;
  gap: 30px 20px;
  grid-template-areas:
    ". . . ."
    ". . . .";
}
</style>
