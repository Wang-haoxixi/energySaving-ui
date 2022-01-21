<template>
  <div class="course-container">
    <div class="course-header course-box">
      <CourseHeader :form="form" :tag="tag" @update-data="loadPage()"></CourseHeader>
    </div>
    <div class="course-content">
      <CourseContent :form="form"></CourseContent>
    </div>
    <div class="lecturer course-box">
      <div class="title">讲师</div>
      <div class="lecturer-box">
        <iep-img class="avatar" :src="lecturer.avatar"></iep-img>
        <div class="info">
          <div class="name">{{lecturer.lecturerName}}</div>
          <div class="desc">{{lecturer.diplomacyTitle}}</div>
        </div>
      </div>
    </div>
    <div class="lecturer-relation-course">
      <div class="lecturer-course course-box" v-if="courseInfoList.length">
        <div class="title">该讲师其他课程</div>
        <iep-no-data v-if="!courseInfoList.length"></iep-no-data>
        <CourseItem
          class="course-item"
          v-for="item in courseInfoList"
          :key="item.id"
          :item="item"
          @click="openSelf"
        ></CourseItem>
      </div>
      <div class="relation-course course-box" v-if="courseRelatedList.length">
        <div class="title">相关课程</div>
        <iep-no-data v-if="!courseRelatedList.length"></iep-no-data>
        <CourseItem
          class="course-item"
          v-for="item in courseRelatedList"
          :key="item.id"
          :item="item"
          @click="openSelf"
        ></CourseItem>
      </div>
    </div>
    <div class="black-course"></div>
  </div>
</template>
<script>
import {
  getInfoDetailById,
  getInfoLecturerById,
  getInfoRelatedById,
} from "@/api/qms/course_info";
import CourseHeader from "./Components/Header";
import CourseContent from "./Components/Content";
import CourseItem from "./Components/CourseItem";
import { CourseInfoVO, LecturerCard } from "./options";
export default {
  props: ["id"],
  inject: ["reload"],
  components: {
    CourseHeader,
    CourseContent,
    CourseItem,
  },
  data() {
    return {
      form: new CourseInfoVO(),
      lecturer: new LecturerCard(),
      courseInfoList: [],
      courseRelatedList: [],
      tag: [],
    };
  },
  watch: {
    "$route.params.id": function () {
      this.reload();
    },
  },
  mounted() {
    this.loadPage();
    this.loadLecturer();
    this.loadRelatedCourse();
  },
  methods: {
    async loadPage() {
      const { data } = await getInfoDetailById(this.id);
      this.form = this.$mergeByFirst(new CourseInfoVO(), data);
    },
    async loadLecturer() {
      const { data } = await getInfoLecturerById(this.id);
      this.lecturer = this.$mergeByFirst(new LecturerCard(), data.lecturer);
      this.courseInfoList = data.courseInfoList;
    },
    async loadRelatedCourse() {
      const { data } = await getInfoRelatedById(this.id);
      this.courseRelatedList = data.relatedCourse;
      this.tag = data.tag;
    },
    openSelf(row) {
      this.$router.push({
        params: {
          id: row.id,
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.course-container {
  width: 1200px;
  margin: 20px auto;
  display: grid;
  grid-template-columns: 1fr 275px;
  grid-template-rows: 310px 150px auto 1fr;
  gap: 20px 20px;
  grid-template-areas:
    "course-header course-header"
    "course-content lecturer"
    "course-content lecturer-relation-course"
    "course-content black-course";
  .course-box {
    border-radius: $--border-radius-base;
    border: 1px solid $--border-color;
    padding: 20px;
    box-sizing: border-box;
    overflow: hidden;
    .title {
      font-size: 16px;
      color: $--color-text-primary;
    }
    .course-item {
      margin-top: 19px;
    }
    .lecturer-box {
      display: flex;
      margin-top: 20px;
      .avatar {
        width: 60px;
        height: 60px;
        border: 1px solid $--border-color;
        border-radius: 10px;
        box-sizing: border-box;
      }
      .info {
        display: flex;
        margin-left: 15px;
        flex-direction: column;
        .name {
          font-size: 18px;
          color: $--color-text-primary;
        }
        .desc {
          margin-top: 10px;
          font-size: 14px;
          color: $--color-text-secondary;
        }
      }
    }
  }
  .relation-course {
    .course-item {
      margin-top: 16px;
    }
  }
}

.course-header {
  grid-area: course-header;
}

.course-content {
  grid-area: course-content;
}

.lecturer {
  grid-area: lecturer;
}

.lecturer-relation-course {
  grid-area: lecturer-relation-course;
  display: grid;
  gap: 20px;
}
.black-course {
  grid-area: black-course;
}
</style>
