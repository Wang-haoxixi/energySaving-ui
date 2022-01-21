<template>
  <TitleWrap title="热门考试" moreLink="/channel/exam/list/3">
    <iep-no-data v-if="!examList.length" complex></iep-no-data>
    <div v-else class="grid-container">
      <ExamCard v-for="item in examList" :key="item.id" :item="item"></ExamCard>
    </div>
  </TitleWrap>
</template>
<script>
import TitleWrap from "./TitleWrap";
import ExamCard from "./ExamCard";
import { getHotExamListBySize } from "@/api/qms/exam_examination";
export default {
  components: {
    TitleWrap,
    ExamCard,
  },
  data() {
    return {
      examList: [],
    };
  },
  mounted() {
    this.loadPage();
  },
  methods: {
    async loadPage() {
      this.examList = await getHotExamListBySize(4);
    },
  },
};
</script>
<style lang="scss" scoped>
.grid-container {
  display: grid;
  grid-template-columns: 285fr 285fr 285fr 285fr;
  grid-template-rows: 330fr;
  gap: 30px 20px;
  grid-template-areas:
    ". . . ."
    ". . . .";
}
</style>
