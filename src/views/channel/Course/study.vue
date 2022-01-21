<template>
  <div class="study-container">
    <div class="header-box">
      <div class="title-box">
        <div class="title">{{form.courseName}}</div>
        <div class="lecturer">讲师：{{form.lecturerName}}</div>
      </div>
      <div class="opt">
        <el-button @click="handleBack()">返回课程</el-button>
      </div>
    </div>
    <div class="assets-box">
      <AssetsBox ref="AssetsBox" :situationId="form.situationId"></AssetsBox>
    </div>
    <div class="content-box">
      <ContentBox ref="ContentBox"></ContentBox>
    </div>
  </div>
</template>
<script>
import AssetsBox from "./Components/AssetsBox";
import ContentBox from "./Components/ContentBox";
import { getStudyInfoById } from "@/api/qms/course_info";
import { CourseStudyInfoVO } from "./options";
export default {
  props: ["id"],
  components: {
    AssetsBox,
    ContentBox,
  },
  data() {
    return {
      form: new CourseStudyInfoVO(),
    };
  },
  mounted() {
    this.loadPage();
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
    },
    async loadPage() {
      const { data } = await getStudyInfoById(this.id);
      this.form = this.$mergeByFirst(new CourseStudyInfoVO(), data);
      this.$refs["ContentBox"].loadPage();
      this.$refs["AssetsBox"].loadPage();
    },
  },
};
</script>
<style lang="scss" scoped>
.study-container {
  width: 1200px;
  margin: 20px auto;
  display: grid;
  box-sizing: border-box;
  grid-template-columns: 1fr 300px;
  grid-template-rows: 70px 1fr;
  gap: 25px 25px;
  grid-template-areas:
    "header-box header-box"
    "assets-box content-box";
  border-radius: 10px;
  border: 1px solid $--border-color;
  padding: 25px;
}
.header-box {
  grid-area: header-box;
  display: flex;
  justify-content: space-between;
  .title-box {
    .title {
      margin-bottom: 10px;
      font-size: 20px;
      color: $--color-text-primary;
    }
    .lecturer {
      font-size: 14px;
      color: $--color-text-secondary;
    }
  }
}
.assets-box {
  grid-area: assets-box;
  ::v-deep .header {
    margin-top: -20px;
  }
}
.content-box {
  grid-area: content-box;
}
</style>
