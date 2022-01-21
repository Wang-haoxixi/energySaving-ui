<template>
  <div>
    <Banner></Banner>
    <div class="content">
      <el-link class="more-btn" @click="$openPage('/channel/activity/list')">更多</el-link>
      <RecommandBox class="content-item"></RecommandBox>
      <YouLike class="content-item"></YouLike>
    </div>
    <DeepCollaboration class="content-item"></DeepCollaboration>
    <div class="bottom-content">
      <MeetingMasters></MeetingMasters>
    </div>
  </div>
</template>
<script>
// 活动大厅
import Banner from "./Components/Banner";
import RecommandBox from "./Components/RecommandBox";
import YouLike from "./Components/YouLike";
import DeepCollaboration from "./Components/DeepCollaboration";
import MeetingMasters from "./Components/MeetingMasters";
export default {
  name: "Index",
  components: {
    Banner,
    RecommandBox,
    YouLike,
    DeepCollaboration,
    MeetingMasters,
  },
};
</script>
<style lang="scss" scoped>
.content,
.bottom-content {
  padding: 40px 0;
  width: 1200px;
  margin: 0 auto;
  .content-item {
    margin-bottom: 40px;
    ::v-deep .iep-image {
      border-radius: 10px 10px 0 0;
    }
  }
}
.bottom-content ::v-deep .el-card__body {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
}
::v-deep .el-card {
  cursor: pointer;
}
.more-btn {
  float: right;
}
</style>
