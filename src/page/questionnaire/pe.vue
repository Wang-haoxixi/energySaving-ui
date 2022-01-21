<template>
  <div>
    <ValidateMobile v-if="isMobile&&!canAnswerMobileQues" :canAnswer.sync="canAnswerMobileQues"></ValidateMobile>
    <div class="ques-edit-container" v-show="!(isMobile&&!canAnswerMobileQues)">
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
      <DialogReport></DialogReport>
      <DialogConfirm ref="confirm"></DialogConfirm>
    </div>
  </div>
</template>
<script>
import DivView from "@/views/qms/questionnaire/manage/dialog/view";
import ValidateMobile from "./Components/ValidateMobile";
import DivFooter from "./footer";
import DivEnd from "./peEnd";
import DialogConfirm from "./Components/DialogConfirm";
import { createOuterPage, createOuterMobilePage } from "@/api/qms/answer";
import { statusType } from "@/views/qms/questionnaire/manage/const/const";
import { quesType } from "@/views/qms/questionnaire/manage/const/ques";
import currentMixins from "./mixins/index"; // 题目验证_validate和答案序列化_getContent
import DialogReport from "@/layouts/Components/Dialog/Report.vue";
import { browserRedirect } from "@/util/util";
export default {
  mixins: [currentMixins],
  components: {
    DivView,
    DivFooter,
    DivEnd,
    DialogReport,
    DialogConfirm,
    ValidateMobile,
  },
  data() {
    return {
      disabled: true,
      loading: false,
      end: false,
      id: "",
      endMessage: {},
      isMobile: 0,
      canAnswerMobileQues: "",
    };
  },
  beforeCreate() {
    if (!browserRedirect()) {
      this.$router.replace({
        path: `/questionnaire_edit/${this.$route.params.id}`,
      });
    } else {
      const head = document.getElementsByTagName("head");
      const meta = document.createElement("meta");
      meta.name = "viewport";
      meta.content =
        "width=device-width,initial-scale=1.0,maximum-scale=1.0, user-scalable=0";
      head[0].appendChild(meta);
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const id = +this.$route.params.id;
      const token = this.$storage.get("SET_ACCESS_TOKEN");
      // 根据是否有token 判断当前的登录状态
      this.$refs.view.open(id, token);
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
        this.endMessage.participateText =
          "您已参与该问卷，感谢您的帮助与支持！";
        this.end = true;
      } else {
        this.isMobile = row.isMobile;
        this.goToLoginByUplodaer(row);
      }
    },
    // 游客遇到上传题删除上传题
    goToLoginByUplodaer(row) {
      if (!this.$storage.get("SET_ACCESS_TOKEN")) {
        row.quesQuestionDTO.forEach((item, index, arr) => {
          const i = arr.findIndex((item) => ["9"].includes(item.type));
          if (i !== -1) {
            arr.splice(i, 1);
          }
        });
      }
    },
    // 游客提交
    async touristSubmit(newArr) {
      this.loading = true;
      this.$refs["confirm"].dialogShow = false;
      const { data } = await createOuterPage({ list: newArr });
      if (data) {
        this.$notify({
          title: "提示",
          // type: "success",
          message: "问卷提交成功，感谢您的参与！",
        });
        this.endMessage = { content: null };
        this.end = true;
      }
      this.loading = false;
    },

    // 限制手机号问卷提交
    async mobileSubmit(newArr) {
      this.loading = true;
      this.$refs["confirm"].dialogShow = false;
      const { data } = await createOuterMobilePage(
        { list: newArr },
        this.canAnswerMobileQues,
      );
      if (data) {
        this.$notify({
          title: "提示",
          // type: "success",
          message: "问卷提交成功，感谢您的参与！",
        });
        this.end = true;
      }
      this.loading = false;
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
      this.$refs["confirm"].dialogTitle = "提示";
      this.$refs["confirm"].callback = this.isMobile
        ? this.mobileSubmit
        : this.touristSubmit;
      this.$refs["confirm"].params = newArr;
      this.$refs["confirm"].dialogShow = true;
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
</style>