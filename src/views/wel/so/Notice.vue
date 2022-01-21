<template>
  <div class="notice-box box" v-loading="loading">
    <div class="title">
      <div class="sub-title">通知</div>
      <el-link v-if="form.text" :underline="false" @click="$openPage('/spa/notice_member')">更多</el-link>
    </div>
    <div class="notice-wrap">
      <iep-no-data v-if="!form.text" message="暂无通知" complex></iep-no-data>
      <template v-else>
        <div class="notice-title" :title="form.title" @click="handleShow()">
          <div class="title iep-ellipsis-flex" :title="form.title">{{form.title}}</div>
          <div class="notice-time">{{form.sendTime | parseToTimeMinutes}}</div>
        </div>
        <pre class="notice-content" @click="handleShow()">{{form.text}}</pre>
      </template>
    </div>
  </div>
</template>
<script>
import { getSoNewestNotice } from "@/api/ims/message";
class NoticeVo {
  sysInfoId = 0;
  title = "";
  text = "";
  parentType = 0;
  type = 0;
  senderId = 0;
  dataId = 0;
  delFlag = "";
  sendTime = "";
  updateTime = "";
}
export default {
  data() {
    return {
      loading: false,
      form: new NoticeVo(),
    };
  },
  async created() {
    this.loading = true;
    const res = await getSoNewestNotice();
    if (res.data) {
      this.form = this.$mergeByFirst(new NoticeVo(), res.data);
    }
    this.loading = false;
  },
  methods: {
    handleShow() {
      this.$openPage(`/spa/notice/${this.form.sysInfoId}`);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./common.scss";
.notice-box {
  display: flex;
  flex-direction: column;
  .sub-title {
    font-family: "微软雅黑";
    color: $--color-text-primary;
  }
  & > .title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
}

.notice-wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  font-size: 14px;
  &:hover {
    .notice-title,
    .notice-content {
      color: $--color-primary;
    }
  }
  .notice-title {
    margin-right: -8px;
    cursor: pointer;
    // display: flex;
    // justify-content: space-between;
    // align-items: center;
    width: 100%;
    font-family: "微软雅黑";
    color: $--color-text-primary;
    .title {
      display: block;
      margin-right: 8px;
      min-width: 230px;
      font-size: 14px;
      font-weight: 600;
      text-align: justify;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .notice-content {
    cursor: pointer;
    margin: 2px 0;
    width: 100%;
    line-height: 24px;
    text-align: justify;
    display: -webkit-box;
    -webkit-line-clamp: 8;
    -webkit-box-orient: vertical;
    overflow: hidden;
    color: $--color-text-regular;
  }
  .notice-time {
    display: inline-block;
    text-align: right;
    color: $--color-input-regular;
    font-size: 12px;
  }
}
</style>
