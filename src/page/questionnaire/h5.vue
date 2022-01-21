<template>
  <div class="ques-edit-container">
    <template v-if="!end">
      <div-view
        :isHeader="true"
        :isFooter="false"
        :disabled="disabled"
        ref="view"
        @getData="getQuesData"
      ></div-view>
      <div-footer @submit="submit" v-if="!disabled" :loading="loading"></div-footer>
    </template>
    <template v-else>
      <div-end :endMessage="endMessage"></div-end>
    </template>
    <DialogReport class="report"></DialogReport>
    <DialogConfirm ref="confirm"></DialogConfirm>
  </div>
</template>
<script>
import DivView from "@/views/qms/questionnaire/manage/dialog/view";
import DivFooter from "./footer";
import DivEnd from "./h5End";
import DialogConfirm from "./Components/DialogConfirm";
import { createPage } from "@/api/qms/answer";
import { statusType } from "@/views/qms/questionnaire/manage/const/const";
import { quesType } from "@/views/qms/questionnaire/manage/const/ques";
import currentMixins from "./mixins/index"; // 题目验证_validate和答案序列化_getContent
import DialogReport from "@/layouts/Components/Dialog/Report.vue";
import { mapActions } from "vuex";
export default {
  mixins: [currentMixins],
  components: {
    DivView,
    DivFooter,
    DivEnd,
    DialogReport,
    DialogConfirm,
  },
  data() {
    return {
      disabled: true,
      loading: false,
      end: false,
      id: "",
      endMessage: {},
    };
  },
  beforeCreate() {
    const head = document.getElementsByTagName("head");
    const meta = document.createElement("meta");
    meta.name = "viewport";
    meta.content =
      "width=device-width,initial-scale=1.0,maximum-scale=1.0, user-scalable=0";
    head[0].appendChild(meta);
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions(["dictGroupGet"]),
    init() {
      const token = this.$route.query.token;
      if (token) {
        const id = +this.$route.params.id;
        this.$storage.set("SET_ACCESS_TOKEN", token);
        this.dictGroupGet();
        this.$refs.view.open(id, token);
      } else {
        this.$message({
          message: "未检测到登录用户",
          type: "warning",
        });
      }
    },
    // 获取问卷题目
    getQuesData(row) {
      document.title = row.name;
      this.disabled = row.status !== statusType.doing || row.delFlag === "1";
      if (row.delFlag === "1") {
        this.$message("问卷已删除");
        return;
      }
      if (
        [
          statusType.nostart,
          statusType.draft,
          statusType.review,
          statusType.reject,
        ].includes(row.status)
      ) {
        this.$message("问卷未开始");
      } else if (row.status === statusType.end) {
        this.$message("问卷已结束");
      } else if (row.participate === "2") {
        this.$message("您已参与该问卷");
        this.endMessage.content = "您已参与该问卷，感谢您的帮助与支持！";
        this.endMessage.status = 3;
        this.end = true;
      } else {
        this.goToLoginByUplodaer(row);
      }
    },
    // 题型处理 移除 移动端不适配的三种题型
    goToLoginByUplodaer(row) {
      row.quesQuestionDTO.forEach((item, index, arr) => {
        const i = arr.findIndex(item => ["7", "9", "10"].includes(item.type));
        if (i !== -1) {
          arr.splice(i, 1);
        }
      });
    },
    // 提交问卷 创建答案
    async realSubmit(newArr) {
      this.loading = true;
      const { data } = await createPage({ list: newArr });
      if (data) {
        this.endMessage = data;
        this.$refs["confirm"].dialogShow = false;
        this.end = true;
      }
    },
    // 提交问卷 获取数据并校验
    submit() {
      const data = this.$refs.view.getResult();
      if (!this._validate(data.quesQuestionDTO)) {
        return false;
      }
      const newArr = [];
      for (const item of data.quesQuestionDTO) {
        if (item.isShow === "2") {
          continue;
        }
        newArr.push({
          questionnaireId: data.id,
          isRequire: item.isRequire,
          questionId: item.id,
          content: this._getContent(item.type, item.answer, item.isShow),
          // grade: this._getGrade(item),
          type: item.type,
          isShow: item.isShow,
          files:
            this._getContent(quesType.fileUpload, item.files, item.isShow) ||
            null,
          optionId: item.optionId,
        });
      }
      // setStore({ name: QUESTION_LIST, content: data });
      // return false;
      if (this.$storage.get("SET_ACCESS_TOKEN")) {
        this.$refs["confirm"].dialogTitle = "提示";
        this.$refs["confirm"].callback = this.realSubmit;
        this.$refs["confirm"].params = newArr;
        this.$refs["confirm"].dialogShow = true;
        // this.realSubmit(newArr);
      } else {
        this.$message({
          message: "未检测到登录用户",
          type: "warning",
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.ques-edit-container {
  background-color: #fff;
  min-height: 100vh;
  box-sizing: border-box;
  padding: 10px 12px;
}
</style>
<style lang="scss" scoped>
// 移动端适配的样式
.ques-edit-container {
  ::v-deep .view-wrapper {
    overflow: hidden;
    span {
      font-size: 14px;
    }
    .title {
      font-size: 16px;
      text-align: left;
    }
    .desc {
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
    }
    .remarks {
      font-size: 14px;
      padding-left: 0;
    }
    .el-image-viewer__btn {
      font-size: 40px;
      i {
        color: #ffffff;
      }
    }
    .el-radio,
    .el-radio_label,
    .el-checkbox,
    .el-checkbox__label {
      width: 100%;
    }
    .radio-item {
      max-width: 90%;
    }
    .imgDiv {
      width: 100%;
      .el-radio__input,
      .el-checkbox__input {
        left: 0;
        top: 160px;
      }
      .el-radio__label,
      .el-checkbox__label {
        p {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          word-break: break-all;
          white-space: normal;
          left: 23px;
          width: 280px;
          text-align: left;
        }
      }
      .img {
        left: 70px;
      }
    }
    .el-select-dropdown__item {
      width: 300px;
    }
  }
}
.report {
  ::v-deep .el-dialog {
    width: 90% !important;
  }
}
</style>