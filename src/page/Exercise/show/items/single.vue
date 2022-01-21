<template>
  <div class="questionItemSingle">
    <div class="itemTitle">
      {{itemData.questionNum}}. {{itemData.examQuestionVO.title}}
      <span
        style="margin-left:20px;color:$--color-input-regular;"
      >({{ itemData.grade }}分)</span>
    </div>
    <el-checkbox-group v-model="itemData.userAnswerJson">
      <div
        class="itemValue"
        v-for="(item,index) of itemData.examQuestionVO.optionsJson || []"
        :key="index"
      >
        <el-checkbox
          style="height:42px;line-height:42px"
          :key="item.key"
          :value="item.value"
          :label="item.key"
          :disabled="true"
        >{{enDic[index]}}: {{item.value}}</el-checkbox>
      </div>
    </el-checkbox-group>
    <div class="answer">正确答案： {{itemData.answerJson.join(' ')}}</div>
    <div class="answer">答案解析： {{itemData.examQuestionVO.quesExplain}}</div>
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
      enDic: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"],
    };
  },
  computed: {
    check() {
      return [this.itemData.answer];
    },
    answerList() {
      if (this.itemData.options) {
        // return JSON.parse(this.itemData.options);
        return this.itemData.options;
      } else {
        return [];
      }
    },
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.questionItemSingle {
  position: relative;
  .itemTitle {
    margin-bottom: 10px;
  }
  .answer {
    margin-top: 10px;
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