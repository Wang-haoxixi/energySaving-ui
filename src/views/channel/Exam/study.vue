<template>
  <div style="padding-top:10px;">
    <div class="list-wrap">
      <h2>{{$route.query.name}}</h2>
    </div>
    <div class="list-wrap">
      <h3>学习视频</h3>
      <template v-if="!currentNumber">
        <iep-no-data message="暂无学习视频" complex></iep-no-data>
      </template>
      <template v-else>
        <div class="video-wrap">
          <video :src="currentVideo.videoUrl" controls height="500"></video>
        </div>
        <div class="v-list-wrap">
          <span
            class="v-item"
            v-for="item in videoList"
            :title="item.videoName"
            :key="item.id"
            @click="currentNumber = item.number"
          >{{item.number}}</span>
        </div>
      </template>
    </div>
    <div class="list-wrap">
      <h3>学习材料</h3>
      <template v-if="!materialList.length">
        <iep-no-data message="暂无学习材料" complex></iep-no-data>
      </template>
      <template v-else>
        <div v-for="item in materialList" :key="item.id" class="m-item">
          <el-link
            :title="item.name"
            @click="$openPage(`/my/index/material/${item.id}`)"
          >{{item.name}}</el-link>
        </div>
      </template>
    </div>
    <div class="list-wrap">
      <h3>相关练习</h3>
      <template v-if="!exerciseList.length">
        <iep-no-data message="暂无相关练习" complex></iep-no-data>
      </template>
      <template v-else>
        <div class="m-item" v-for="item in exerciseList" :key="item.exerciseId">
          <el-link :title="item.examName" @click="openExe(item.exerciseId)">{{item.examName}}</el-link>
        </div>
      </template>
    </div>
    <div class="list-wrap">
      <div style="display:flex;justify-content: space-between;">
        <h3>相关用户</h3>
        <el-button v-if="learnList.length" type="text" @click="openMore(getMoreStudyUser)">更多</el-button>
      </div>
      <template v-if="!learnList.length">
        <iep-no-data message="暂无相关用户" complex></iep-no-data>
      </template>
      <template v-else>
        <div class="l-wrap">
          <div class="l-item" v-for="item in learnList" :title="item.realName" :key="item.userId">
            <iep-img class="avatar" :src="item.avatar"></iep-img>
            <div class="name iep-ellipsis-2-flex">{{item.realName}}</div>
          </div>
        </div>
      </template>
    </div>
    <MoreUserDialog :examId="$route.params.id" ref="MoreUserDialog"></MoreUserDialog>
    <ExerciseViewDialog ref="ExerciseViewDialog"></ExerciseViewDialog>
  </div>
</template>
<script>
import MoreUserDialog from "@/views/exam/examList/Page/Components/MoreUserDialog";
import {
  getExamStudyV2ById,
  getMoreStudyUser,
  getMaterialById,
} from "@/api/qms/exam_examination";
import { getExamStudyVideoListById } from "@/api/qms/exam_examination_video";
import ExerciseViewDialog from "@/views/exam/examList/Page/Components/ExerciseViewDialog";
export default {
  components: {
    MoreUserDialog,
    ExerciseViewDialog,
  },
  data() {
    return {
      currentNumber: "",
      videoList: [],
      exerciseList: [],
      learnList: [],
      materialList: [],
    };
  },
  computed: {
    currentVideo() {
      return this.videoList.find(m => m.number == this.currentNumber);
    },
  },
  created() {
    this.loadVideoList();
    this.loadStudy();
    this.loadMoreStudyUser();
  },
  methods: {
    openExe(id) {
      this.$refs["ExerciseViewDialog"].id = id;
      this.$refs["ExerciseViewDialog"].dialogShow = true;
    },
    getMoreStudyUser,
    openMore(method) {
      this.$refs["MoreUserDialog"].reqFunction = method;
      this.$refs["MoreUserDialog"].dialogShow = true;
    },
    async loadMoreStudyUser() {
      const res = await getMoreStudyUser(this.$route.params.id);
      console.log(res);
    },
    async loadVideoList() {
      const { data } = await getExamStudyVideoListById(this.$route.params.id);
      this.videoList = data;
      if (this.videoList.length) {
        this.currentNumber = this.videoList[0].number;
      } else {
        this.currentNumber = "";
      }
    },
    async loadStudy() {
      const { data } = await getExamStudyV2ById(this.$route.params.id);
      getMaterialById(this.$route.params.id).then(resp => {
        this.materialList = resp.data;
      });

      this.exerciseList = data.exerciseList;
      this.learnList = data.learnList;
    },
  },
};
</script>
<style lang="scss" scoped>
.list-wrap {
  width: 1000px;
  margin: 10px auto;
  padding: 15px;
  background: #f1f1f1;
  border-radius: 10px;
  h2 {
    font-size: 18px;
  }
  h3 {
    font-size: 16px;
  }
  .m-item {
    cursor: pointer;
    padding: 10px 20px;
    margin-bottom: 5px;
  }
  .l-wrap {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 10px 10px;
    .l-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px 20px;
      .avatar {
        width: 50px;
        height: 50px;
        border: 1px solid $--border-color;
      }
      .name {
        margin-top: 5px;
        height: 40px;
      }
    }
  }
  .video-wrap {
    width: 100%;
    video {
      width: 100%;
    }
  }
  .v-list-wrap {
    display: flex;
    margin-top: 10px;
    .v-item {
      cursor: pointer;
      width: 25px;
      height: 25px;
      background: #fff;
      border-radius: 5px;
      text-align: center;
      margin-right: 10px;
    }
  }
}
</style>
