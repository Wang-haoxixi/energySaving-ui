<template>
  <div class="content-container">
    <div v-if="form.situationId" class="study-process-box course-box">
      <div class="title">学习进度</div>
      <el-progress
        class="progress"
        :percentage="+(form.studyClassCount/form.allClassCount * 100).toFixed(2)"
      ></el-progress>
      <div class="text">目前已完成 {{form.studyClassCount}} 个课时，加油啊！</div>
    </div>
    <div class="menu-box course-box">
      <iep-tabs v-model="tabName" :tab-list="tabList" @tab-click="handleClick">
        <template v-if="tabName ==='detail'" v-slot:detail>
          <detail class="txt" :content="form.courseExplain"></detail>
        </template>
        <template v-if="tabName ==='outline'" v-slot:outline>
          <outline :canStudy="!!form.situationId"></outline>
        </template>
        <template v-if="tabName ==='comments'" v-slot:comments>
          <comments :id="form.id" :canComment="isComments"></comments>
        </template>
        <template v-if="tabName ==='testing'" v-slot:testing>
          <testing :formData="form"></testing>
        </template>
        <template v-if="tabName ==='exam'" v-slot:exam>
          <exam :formData="form"></exam>
        </template>
      </iep-tabs>
    </div>
  </div>
</template>
<script>
import detail from "./MenuPage/detail";
import outline from "./MenuPage/outline";
import comments from "./MenuPage/comments";
import testing from "./MenuPage/testing";
import exam from "./MenuPage/exam";
export default {
  props: ["form"],
  components: {
    detail,
    outline,
    comments,
    exam,
    testing,
  },
  data() {
    return {
      tabName: "detail",
    };
  },
  computed: {
    isTesting() {
      return this.form.haveExercise != "0"
        ? [
            {
              label: "单元测试",
              value: "testing",
            },
          ]
        : [];
    },
    isExam() {
      return this.form.examId
        ? [
            {
              label: "认证考试",
              value: "exam",
            },
          ]
        : [];
    },
    isComments() {
      const { studyClassCount, allClassCount } = this.form;
      // 控制下学习30%以上才能评论
      const itsTrue = studyClassCount / allClassCount >= 0.3;
      return itsTrue;
    },
    tabList() {
      return [
        {
          label: "课程详情",
          value: "detail",
        },
        {
          label: "课程大纲",
          value: "outline",
        },
        {
          label: "课程评价",
          value: "comments",
        },
        ...this.isTesting,
        ...this.isExam,
      ];
    },
  },
  created() {
    if (this.$route.query.tabName) {
      this.tabName = this.$route.query.tabName;
    }
  },
  methods: {
    handleClick({ name }) {
      this.$router.replace({
        query: { tabName: name },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.content-container {
  display: flex;
  flex-direction: column;
  .course-box {
    border-radius: $--border-radius-base;
    border: 1px solid $--border-color;
    padding: 20px;
    box-sizing: border-box;
    overflow: hidden;
    .txt {
      font-size: 14px;
    }
    .title {
      font-size: 16px;
      color: $--color-text-primary;
    }
    .progress {
      margin: 20px 0;
    }
    .text {
      margin: 10px 0;
      font-size: 14px;
      color: $--color-text-regular;
    }
  }
  .study-process-box {
    flex: 0 0 150px;
    height: 150px;
    margin-bottom: 20px;
  }
  .menu-box {
    flex: 1;
  }
}
</style>
