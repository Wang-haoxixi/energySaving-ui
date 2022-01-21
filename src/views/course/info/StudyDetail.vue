<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="title" :backOption="backOption"></iep-page-header>
      <div class="container">
        <div class="course-name">{{studyDetailTitle.courseName}}</div>
        <div class="course-exam" v-if="studyDetailTitle.examId">
          <div class="exam-name">考试名称：{{examResult.examName}}</div>
          <el-table :data="examResult.examRecords" style="width: 100%">
            <el-table-column prop="no" label="序号"></el-table-column>
            <el-table-column prop="score" label="得分"></el-table-column>
            <el-table-column prop="result" label="结果" width="180"></el-table-column>
          </el-table>
        </div>
        <div class="course-detail">
          <div class="section-wrap" v-for="sec in sectionTree" :key="sec.sectionNumber">
            <div class="title">第{{nzhCn(sec.sectionNumber)}}章：{{sec.sectionName}}</div>
            <div class="item-wrap" v-for="item in sec.children" :key="item.id">
              <div class="intro">
                <div>
                  <span class="text">{{item.sectionNumber}}-{{item.smallSectionNumber}}</span>
                  <span class="text">{{item.smallSectionName}}</span>
                </div>
                <div class="status">
                  <span v-if="item.progress==1">未学习</span>
                  <span v-if="item.progress==2">学习中</span>
                  <span v-if="item.progress==3">已学习</span>
                </div>
              </div>
              <div class="detail">
                <template v-if="item.exerciseId">
                  <span class="text score" v-if="item.exerciseScore">{{item.exerciseScore}}分</span>
                  <span class="text score" v-else>/</span>
                </template>
                <span class="text">首次学习时间：{{item.startTime}}</span>
                <span class="text">最近学习时间：{{item.lastTime}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </iep-basic-container>
  </div>
</template>
<script>
import nzhcn from "nzh/cn";
import {
  getStudyDetail1ById,
  getStudyDetail2ById,
  getStudyDetail3ById,
} from "@/api/qms/course_study_situation";
class StudyDetailTitleVO {
  courseName = "";
  examId = 0;
  id = 0;
  realName = "";
}
class StudyExamVO {
  examId = 0;
  examName = "";
  examRecords = [];
  id = 0;
}
export default {
  data() {
    return {
      backOption: {
        isBack: true,
      },
      studyDetailTitle: new StudyDetailTitleVO(),
      sectionTree: [],
      examResult: new StudyExamVO(),
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    title() {
      const { realName } = this.studyDetailTitle;
      const { name } = this.$route.meta;
      if (realName) {
        return `${realName}的${name ?? "学习明细"}`;
      } else {
        return name;
      }
    },
  },
  mounted() {
    this.load1();
    this.load3();
  },
  methods: {
    nzhCn(number) {
      return nzhcn.encodeS(number);
    },
    async load1() {
      const { data } = await getStudyDetail1ById(this.id);
      this.studyDetailTitle = this.$mergeByFirst(
        new StudyDetailTitleVO(),
        data,
      );
      if (this.studyDetailTitle.examId) {
        this.load2();
      }
    },
    async load2() {
      const { data } = await getStudyDetail2ById(this.id);
      this.examResult = this.$mergeByFirst(new StudyExamVO(), data);
    },
    async load3() {
      const { data } = await getStudyDetail3ById(this.id);
      this.sectionTree = data;
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  .course-name {
    font-size: 20px;
    font-weight: 400;
    color: $--color-text-primary;
    text-align: center;
  }
  .course-exam {
    margin-top: 20px;
    padding: 20px;
    background-color: $--background-color;
    border-radius: 10px;
    .exam-name {
      margin-bottom: 20px;
      color: $--color-text-regular;
      font-size: 16px;
    }
  }
  .course-detail {
    margin-top: 20px;
    padding: 20px;
    .section-wrap {
      margin-top: 15px;
      .title {
        font-size: 16px;
        font-weight: bold;
        color: $--color-text-regular;
      }
      .item-wrap {
        font-size: 14px;
        color: $--color-text-regular;
        margin: 10px 0;
        .intro {
          display: flex;
          justify-content: space-between;
          .text {
            margin-right: 10px;
          }
        }
      }
      .detail {
        margin: 10px 0;
        padding: 10px 0;
        .score {
          color: $--color-text-primary;
          padding: 10px;
          background-color: $--background-color;
          border-radius: 10px;
        }
        .text {
          color: $--color-text-secondary;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
