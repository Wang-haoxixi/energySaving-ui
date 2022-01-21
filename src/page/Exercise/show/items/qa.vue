<template>
  <div class="questionItemSingle">
    <div class="itemTitle">
      {{itemData.questionNum}}. {{itemData.examQuestionVO.title}}
      <span
        style="margin-left:20px;color:$--color-input-regular;"
      >({{ itemData.grade }}分)</span>
    </div>
    <div class="answer">用户答案： {{itemData.userAnswerJson && itemData.userAnswerJson.join('｜')}}</div>
    <div class="answer">正确答案： {{itemData.answerJson.join(' ')}}</div>
    <div class="answer">答案解析： {{itemData.examQuestionVO.quesExplain}}</div>
    <div class="answer">得分： {{itemData.score}}分</div>
  </div>
</template>
<script>
export default {
  props: {
    itemData: {
      type: Object,
      default: () => {
        return {
          title: "",
          index: 1,
          answerList: [],
          answer: "",
        };
      },
    },
  },
  data() {
    return {
      answerLabel: "",
    };
  },
  methods: {
    answer(row) {
      this.judgeStateList.map(i => {
        if (i.id == row) {
          this.answerLabel = i.label;
        }
      });
      return this.answerLabel;
    },
  },
};
</script>
<style lang="scss" scoped>
.questionItemSingle {
  position: relative;
  .answer {
    margin: 10px 0 10px 0 !important;
    font-size: 13px;
  }
  .hidden {
    position: absolute;
    right: 10px;
    top: 10px;
    visibility: hidden;
  }
  &:hover .hidden {
    visibility: visible;
  }
  .curP {
    margin: 0 10px;
    cursor: pointer;
    &:hover {
      color: $--color-primary;
    }
  }
}
</style>