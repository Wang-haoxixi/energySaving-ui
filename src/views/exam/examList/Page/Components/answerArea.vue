<template>
  <div class="main">
    <div class="title">{{typeName}}名称：{{currentData.title}}</div>
    <div class="subject">
      <div class="blockTitle">
        {{typeMap[(currentData.examQuestionVO || {}).type]}}
        <!-- <el-button style="float:right;margin-left:10px;" @click="handleReport()">举报</el-button> -->
        <el-button style="float:right" @click="feedback()">反馈</el-button>
      </div>
      <div class="blockContent">
        <component
          ref="item"
          :disabled="disabled"
          @onPrev="prev"
          @onNext="next"
          @onSet="emitAnswer"
          :itemData="currentData"
          :is="currentComponet"
        ></component>
        <!-- <judgle @answer="answer"></judgle> -->
      </div>
    </div>
    <FeedbackDialog ref="FeedbackDialog"></FeedbackDialog>
    <DialogReport></DialogReport>
  </div>
</template>
<script>
import single from "./answerSheet/single";
import multiple from "./answerSheet/multiple";
import judgle from "./answerSheet/judgle";
import fill from "./answerSheet/fill";
import qa from "./answerSheet/qa";
import FeedbackDialog from "./FeedbackDialog";
import DialogReport from "@/layouts/Components/Dialog/Report.vue";

import { mapMutations } from "vuex";
export default {
  props: {
    subject: {
      type: Object,
      default: () => {
        return {};
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    typeName: {
      type: String,
      default: "考试",
    },
    // examData: {
    //   type: Object,
    //   default: () => {
    //     return {};
    //   },
    // },
  },
  components: {
    single,
    multiple,
    fill,
    judgle,
    qa,
    FeedbackDialog,
    DialogReport,
  },
  watch: {
    subject: {
      immediate: true,
      handler(val) {
        if (val) {
          this.currentData = { ...val };
        }
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
      currentData: {
        examQuestionVO: {
          type: "",
        },
      },
      typeMap: {
        RADIO: "单选题",
        CHECKBOX: "多选题",
        CHECKED: "判断题",
        GAPFILLING: "填空题",
        ESSAYQUESTION: "问答题",
      },
    };
  },
  computed: {
    currentComponet() {
      const componentMap = {
        RADIO: "single",
        CHECKBOX: "multiple",
        CHECKED: "judgle",
        GAPFILLING: "fill",
        ESSAYQUESTION: "qa",
      };
      return componentMap[(this.currentData.examQuestionVO || {}).type];
    },
  },
  methods: {
    ...mapMutations({
      openReportDialog: "OPEN_REPORT_DIALOG",
    }),
    handleReport() {
      this.openReportDialog({ id: this.$route.params.id, type: 7 });
    },
    getAnswer(cb) {
      this.$refs["item"].getAnswer(cb);
    },
    emitAnswer(val, cb) {
      this.$emit("onSet", val, cb);
    },
    prev(val) {
      this.$emit("onPrev", val);
    },
    next(val) {
      this.$emit("onNext", val);
    },
    feedback() {
      this.$refs.FeedbackDialog.questionId = this.currentData.quesId;
      this.$refs.FeedbackDialog.dialogShow = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.main {
  .title {
    font-size: 20px;
  }
  .description {
    background: #f5f4f7;
    font-size: 14px;
    padding: 15px;
    border-radius: 15px;
    margin: 10px 0;
    line-height: 25px;
  }
  .subject {
    .blockTitle {
      position: relative;
      font-size: 16px;
      margin: 25px 0;
      span {
        font-size: 14px;
        color: $--color-text-secondary;
      }
      .btn {
        padding: 0;
        width: 70px;
        height: 30px;
        line-height: 14px;
        border-radius: 10px;
      }
    }
    .blockContent {
      margin: 10px 0;
    }
  }
}
</style>
