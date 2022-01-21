<template>
  <el-card shadow="never">
    <div class="title">活动内容</div>
    <div class="box-wrapper">
      <IepJoditRead :value="activity.details"></IepJoditRead>
      <div v-if="activity.fileList.length">
        <div class="box-title">附件下载</div>
        <el-link
          v-for="item of activity.fileList"
          :key="item.attachFile"
          icon="el-icon-link"
          @click="handleDownload(item)"
        >{{item.original}}</el-link>
      </div>
      <div v-if="userList.length">
        <div class="box-title">您可能认识的人</div>
        <div class="box-content person-content">
          <div
            class="person-box"
            v-for="user of userList"
            :key="user.userId"
            @click="openStyle(user)"
          >
            <iep-img class="img" :resizeOpt="{l:70}" :src="user.avatar" :alt="user.realName" />
            <div class="name iep-ellipsis">{{user.realName}}</div>
            <div class="time">{{user.attendMeetingTime | formatTime}}</div>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>
<script>
import { getIsPeopleListById } from "@/api/meetting/publish";
import { downloadUrl } from "@/api/common";

export default {
  name: "ActivityContent",
  props: ["activity"],
  data() {
    return {
      userList: [],
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  mounted() {
    this.load();
  },
  methods: {
    async load() {
      const { data } = await getIsPeopleListById(this.id);
      this.userList = data;
    },
    openStyle(user) {
      this.$openPage(`${this.$pathPrefix_UserStyle}${user.userId}`);
    },
    handleDownload(item) {
      this.$message("附件下载中");
      downloadUrl(item.attachFile, item.original);
    },
  },
};
</script>
<style lang="scss" scoped>
.box-content {
  display: flex;
}
.title {
  margin-bottom: 25px;
  font-size: 18px;
}
.box-title {
  margin-top: 30px;
  margin-bottom: 20px;
  font-size: 16px;
}
.box-content {
  margin-bottom: 40px;
  font-size: 14px;
  line-height: 36px;
  color: $--color-text-regular;
  .img {
    width: 70px;
    height: 70px;
    border: 1px solid $--border-color;
    border-radius: 10px;
  }
  .person-box {
    margin: 0 20px 20px;
    max-width: 73px;
    text-align: center;
    cursor: pointer;
    transition: 0.5s;
    &:hover {
      opacity: 0.7;
    }
    .name {
      width: 70px;
      color: #666769;
    }
    .time {
      font-size: 12px;
      color: $--color-text-secondary;
    }
  }
}
.box-content-time {
  flex-direction: column;
}
.person-content {
  flex-wrap: wrap;
  margin: 0 -20px -10px;
  line-height: 24px;
}
</style>
