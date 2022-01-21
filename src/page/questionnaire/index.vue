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
    </div>
  </div>
</template>
<script>
import DivView from "@/views/qms/questionnaire/manage/dialog/view";
import ValidateMobile from "./Components/ValidateMobile";
import DivFooter from "./footer";
import DivEnd from "./end";
import {
  createPage,
  createOuterMobilePage,
  createOuterPage,
} from "@/api/qms/answer";
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
    ValidateMobile,
  },
  data() {
    return {
      disabled: true,
      loading: false,
      end: false,
      endMessage: {},
      openAward: 1,
      isMobile: 0,
      canAnswerMobileQues: "",
    };
  },
  beforeCreate() {
    if (browserRedirect()) {
      this.$router.replace({
        path: `/questionnaire_edit/${this.$route.params.id}/pe`,
      });
    }
  },
  mounted() {
    this.init();
  },
  computed: {
    id() {
      return +this.$route.params.id;
    },
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
      this.openAward = row.openAward;
      const newArr = this.$storage.get("SET_QUESTION_ANSWER");
      if (newArr) {
        this.$refs.view.setAnswer(newArr);
      }
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
        if (this.isMobile) return this.delUpload(row);
        this.goToLoginByUplodaer(row);
      }
    },
    // 删除上传题目
    delUpload(row) {
      row.quesQuestionDTO.forEach((item, index, arr) => {
        const i = arr.findIndex((item) => ["9"].includes(item.type));
        if (i !== -1) {
          arr.splice(i, 1);
        }
      });
    },
    // 游客遇到上传题前往登录
    goToLoginByUplodaer(row) {
      if (!this.$storage.get("SET_ACCESS_TOKEN")) {
        const flag = row.quesQuestionDTO.findIndex((item) => {
          return item.type === "9";
        });
        if (flag > -1) {
          this.$message("该问卷含有上传题，需登录后才能答卷");
          this.$router.push({
            path: "/login",
            query: { redirect: this.$route.fullPath },
          });
        }
      }
    },
    // 提交问卷 创建答案
    realSubmit(newArr) {
      this.$confirm("是否提交问卷", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.loading = true;
          createPage({ list: newArr })
            .then((data) => {
              if (data.code === 0) {
                if (data.data.status > 3) {
                  this.$notify({
                    title: "错误",
                    type: "warning",
                    message: data.data.content,
                  });
                } else {
                  this.$notify({
                    title: "提示",
                    // type: "success",
                    message: "提交成功!",
                  });
                  this.$storage.get("SET_QUESTION_ANSWER") &&
                    this.$storage.remove("SET_QUESTION_ANSWER");
                  this.endMessage = data.data;
                  this.end = true;
                }
              }
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        })
        .catch(() => {
          this.loading = false;
        });
    },
    // 游客提交
    touristSubmit(newArr) {
      const tips =
        this.openAward === 2
          ? "登录后可查看分析报告并有机会获取宝贝，是否前往登录？"
          : "登录后可查看分析报告，是否前往登录？";
      this.$confirm(tips, "提示", {
        distinguishCancelAndClose: true,
        confirmButtonText: "前往登录",
        cancelButtonText: "跳过并提交",
        dangerouslyUseHTMLString: true,
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "info",
            message: "保存问卷并前往登录",
          });
          this.$storage.set("SET_QUESTION_ANSWER", newArr);
          this.$router.push({
            path: "/login",
            query: { redirect: this.$route.fullPath },
          });
        })
        .catch((action) => {
          if (action === "cancel") {
            this.loading = true;
            createOuterPage({ list: newArr })
              .then((data) => {
                if (data.code === 0) {
                  this.$notify({
                    title: "提示",
                    // type: "success",
                    message: "提交成功!",
                  });
                  this.$storage.get("SET_QUESTION_ANSWER") &&
                    this.$storage.remove("SET_QUESTION_ANSWER");
                  this.endMessage = { content: null };
                  this.end = true;
                }
                this.loading = false;
              })
              .catch(() => {
                this.loading = false;
              });
          }
        });
    },
    // 限制手机号问卷提交
    mobileSubmit(newArr) {
      this.$confirm("是否提交问卷", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          this.loading = true;
          const { data, code } = await createOuterMobilePage(
            { list: newArr },
            this.canAnswerMobileQues,
          );
          if (code === 0) {
            if (data.status > 3) {
              this.$notify({
                title: "错误",
                type: "warning",
                message: data.content,
              });
            } else {
              this.$notify({
                title: "提示",
                // type: "success",
                message: "提交成功!",
              });
              this.$storage.get("SET_QUESTION_ANSWER") &&
                this.$storage.remove("SET_QUESTION_ANSWER");
              this.endMessage = data;
              this.end = true;
            }
          }
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
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
      if (data.isMobile) {
        if (!this.canAnswerMobileQues) {
          this.$message.warning("请重新进行手机号验证");
          location.reload();
          return;
        }
        this.mobileSubmit(newArr);
        return;
      }
      if (this.$storage.get("SET_ACCESS_TOKEN")) {
        // 有token代表已登录 无token让其选择登录
        this.realSubmit(newArr);
      } else {
        this.touristSubmit(newArr);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.ques-edit-container {
  background-color: #fff;
  width: 70%;
  min-width: 700px;
  min-height: 100vh;
  padding: 20px 30px;
  margin: 0 auto;
}
</style>