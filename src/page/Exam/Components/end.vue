<template>
  <div class="end-wrap">
    <!-- 答卷成功 -->
    <div class="tip-wrap success" v-if="data.code==='2'">
      <i class="el-icon-woneng-chenggong2shixin"></i>
      <span>交卷成功，感谢您的作答！</span>
      <span>成绩由阅卷后最终确定</span>
    </div>
    <div class="tip-wrap score" v-if="data.code==='1'">
      <i v-if="data.result==='优秀' || data.result==='及格'" class="el-icon-woneng-biaoqing"></i>
      <i v-else class="el-icon-woneng-guanbihuozheshibai"></i>
      <span>
        <span :class="{pass:data.result==='优秀'}">{{data.score}}</span>&nbsp;分
      </span>
      <span>{{data.result==='不及格'?"考试不及格":data.result==='及格' ? "考试及格":"考试优秀"}}，{{data.msg}}</span>
    </div>
    <div class="btn-group">
      <el-button
        v-if="data.code==='1'"
        type="primary"
        @click="handleView(data.examinationId, data.manageId)"
      >查看试卷</el-button>
      <el-button v-if="history" type="default" @click="handleBack()">返回</el-button>
      <el-button v-if="data.repeat" type="default" @click="handleAgain()">再考一次</el-button>
    </div>
    <ExamViewDialog ref="ExamViewDialog"></ExamViewDialog>
  </div>
</template>
<script>
import { checkState } from "@/api/qms/test_questions_library";
import ExamViewDialog from "@/views/exam/examList/Page/Components/ExamViewDialog";
export default {
  components: {
    ExamViewDialog,
  },
  props: {
    backUrl: {
      type: Object,
      default: () => ({}),
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    history() {
      return history.length;
    },
  },
  methods: {
    handleAgain() {
      this.$refs["ExamViewDialog"].id = this.data.examinationId;
      this.$refs["ExamViewDialog"].dialogShow = true;
    },
    handleBack() {
      this.$router.push({
        path: this.backUrl.fullPath,
      });
    },
    handleView(examinationId, manageId) {
      checkState({ id: examinationId, manageId: manageId }).then(({ data }) => {
        if ("20" === data.code) {
          this.$message.error(data.hint);
        } else {
          this.$emit("review");
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.end-wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.tip-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  i {
    margin-bottom: 15px;
    font-size: 75px;
  }
  &.success {
    i {
      color: $--color-third;
    }
    & > span {
      margin-bottom: 10px;
      &:nth-of-type(1) {
        color: $--color-text-primary;
        font-size: 26px;
      }
      &:nth-of-type(2) {
        color: $--color-text-secondary;
        font-size: 14px;
      }
    }
  }
  &.score {
    i {
      color: $--color-input-regular;
    }
    & > span {
      margin-bottom: 10px;
      &:nth-of-type(1) {
        font-size: 14px;
        color: $--color-text-secondary;
        & > span {
          font-size: 20px;
          color: $--color-primary;
          &.pass {
            color: $--color-third;
          }
        }
      }
      &:nth-of-type(2) {
        color: $--color-text-regular;
        font-size: 16px;
      }
    }
  }
}
.btn-group {
  margin: 80px 0 100px;
  .el-button {
    margin-left: 10px;
    &:first-of-type {
      margin-left: 0;
    }
  }
}
</style>
