<template>
  <div class="questionItemJudge">
    <div class="itemTitle">
      {{itemData.index+1}}. {{itemData.title}}
      <span
        style="margin-left: 15px;vertical-align: middle;"
        v-if="itemData.titleUrl"
      >
        <el-image
          style="width: 100px; height: 100px"
          :src="itemData.titleUrl"
          :preview-src-list="[itemData.titleUrl]"
        ></el-image>
      </span>
    </div>
    <div class="itemValue itemValue_pd">
      <el-checkbox :value="false" :label="'A'">正确</el-checkbox>
    </div>
    <div class="itemValue itemValue_pd">
      <el-checkbox :value="false" :label="'B'">错误</el-checkbox>
    </div>
    <div class="answer">答案： {{answer(itemData.answer)}}</div>
    <div class="answer" v-if="checkUse">解析： {{itemData.quesExplain}}</div>
    <div class="hidden" v-if="!checkUse">
      <i class="el-icon-delete curP" @click="handleDelete" v-if="isEdit"></i>
      <i class="el-icon-top curP" @click="handleTop" v-if="index !== 0 && isEdit"></i>
      <i
        class="el-icon-bottom curP"
        @click="handleBottom"
        v-if="index !== leng-1 && leng !== 1 && isEdit"
      ></i>
      <br />
      <el-input-number
        size="small"
        style="margin:10px"
        v-model="itemData.score"
        type="number"
        :step="1"
        step-strictly
        :min="0"
        @input="changeScore"
        :disabled="!isEdit"
      ></el-input-number>
      <span class="unit">分</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    index: {
      type: Number,
      default: 0,
    },
    leng: {
      type: Number,
      default: 0,
    },
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
    checkUse: {
      type: Boolean,
      default: false,
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      judgeStateList: [
        { id: "A", label: "正确" },
        { id: "B", label: "错误" },
      ],
      answerLabel: "",
    };
  },
  methods: {
    changeScore(score) {
      this.$emit("changeScore", score, this.itemData.index);
    },
    answer(row) {
      this.judgeStateList.map((i) => {
        if (i.id == row) {
          this.answerLabel = i.label;
        }
      });
      return this.answerLabel;
    },
    handleDelete() {
      this.$emit("handleDelete", this.itemData.index);
    },
    handleTop() {
      this.$emit("handleTop", this.itemData.index);
    },
    handleBottom() {
      this.$emit("handleBottom", this.itemData.index);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./style.scss";
.questionItemJudge {
  position: relative;
  .itemValue_pd {
    .el-checkbox__label {
      display: inline-block;
      width: 100%;
      vertical-align: top;
      word-break: break-all;
      line-height: 23px;
      white-space: pre-wrap !important;
      width: 100%;
      padding-right: 150px;
      box-sizing: border-box;
    }
  }
  .itemTitle {
    margin-bottom: 15px;
    width: 100%;
    padding-right: 150px;
    box-sizing: border-box;
  }
  .answer {
    margin-top: 10px;
    font-size: 13px;
    width: 100%;
    padding-right: 150px;
    box-sizing: border-box;
  }
  .hidden {
    text-align: center;
    position: absolute;
    right: -20px;
    top: 10px;
    visibility: hidden;
  }
  &:hover .hidden {
    visibility: visible;
  }
  .curP {
    margin: 0 10px;
    font-size: 18px;
    cursor: pointer;
    &:hover {
      color: $--color-primary;
    }
  }
  .unit {
    font-size: 14px;
  }
}
</style>
