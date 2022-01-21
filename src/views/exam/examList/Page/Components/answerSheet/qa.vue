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
      <div class="singleItem">
        <el-input type="textarea" :rows="6" v-model="answer" :disabled="disabled"></el-input>
      </div>
      <!-- <el-checkbox v-model="checked">备选项</el-checkbox> -->
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
  watch: {
    itemData: {
      immediate: true,
      handler(val) {
        if (val.userAnswer) {
          this.answer = val.userAnswer;
        } else {
          this.answer = "";
        }
      },
    },
  },
  data() {
    return {
      answer: "",
    };
  },
  computed: {},
  methods: {
    getAnswer(cb) {
      this.$emit("onSet", this.answer, cb);
    },
    prev() {
      this.$emit("onPrev", this.answer);
    },
    next() {
      this.$emit("onNext", this.answer);
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
}
</style>
