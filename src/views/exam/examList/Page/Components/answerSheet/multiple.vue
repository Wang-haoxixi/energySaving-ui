<template>
  <div class="item">
    <div class="title">
      {{itemData.questionNum}}、{{itemData.examQuestionVO.title}}
      <el-image
        v-if="itemData.examQuestionVO.titleUrl"
        style="width: 100px; height: 100px"
        :src="itemData.examQuestionVO.titleUrl"
        :preview-src-list="[itemData.examQuestionVO.titleUrl]"
      ></el-image>
    </div>
    <div class="answer">
      <div
        class="singleItem"
        v-for="(item,index) in itemData.examQuestionVO.optionsJson"
        :key="index"
      >
        <el-checkbox v-model="answer" :label="item.key" :disabled="disabled">
          {{item.key}}、{{item.value}}
          <el-image
            v-if="item.optionUrl"
            style="width: 100px; height: 100px"
            :src="item.optionUrl"
            :preview-src-list="[item.optionUrl]"
          ></el-image>
        </el-checkbox>
      </div>
    </div>
    <ShowAnswer v-if="isShowAns" :item="itemData.examQuestionVO" ref="ShowAnswer"></ShowAnswer>
    <div class="footer">
      <el-button v-if="itemData.questionNum !== 1" @click="prev">上一题</el-button>
      <el-button v-if="itemData.showAnswer ==='1'" @click="handleShowAnswer()">查看答案</el-button>
      <el-button v-if="itemData.questionNum !== itemData.total" type="primary" @click="next">下一题</el-button>
    </div>
  </div>
</template>
<script>
import mixins from "./mixins";
export default {
  mixins: [mixins],
  props: {
    itemData: {
      type: Object,
      default: () => {
        return {
          examQuestionVO: {
            optionsJson: [],
          },
        };
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      answer: [],
    };
  },
  watch: {
    itemData: {
      immediate: true,
      handler(val) {
        if (val.userAnswer && val.length != 0) {
          this.answer = JSON.parse(val.userAnswer);
        } else {
          this.answer = [];
        }
      },
    },
  },
  computed: {},
  methods: {
    getAnswer(cb) {
      this.$emit("onSet", JSON.stringify(this.answer), cb);
    },
    prev() {
      this.$emit("onPrev", JSON.stringify(this.answer));
    },
    next() {
      this.$emit("onNext", JSON.stringify(this.answer));
    },
  },
};
</script>
<style lang="scss" scoped>
.item {
  .title img {
    width: 100px;
    max-height: 100px;
  }
  .answer {
    .singleItem {
      margin-top: 15px;
    }
  }
  .footer {
    margin-top: 50px;
    text-align: center;
  }
  ::v-deep.el-checkbox__label {
    white-space: normal;
  }
}
</style>
