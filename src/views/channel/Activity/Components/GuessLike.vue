<template>
  <el-card shadow="never">
    <div class="sub-title">为您推荐</div>
    <iep-no-data v-if="!activityList.length"></iep-no-data>
    <div class="like-box" v-for="item of activityList" :key="item.id" @click="goToDetail(item.id)">
      <div class="img">
        <iep-img
          :resizeOpt="{l:100}"
          :src="item.poster"
          :alt="item.name"
          width="100px"
          height="60px"
        ></iep-img>
      </div>
      <div class="txt">
        <div class="inner-title" :title="item.name">{{item.name}}</div>
        <div class="inner-time">{{item.startTime | parseToDay}}</div>
      </div>
    </div>
  </el-card>
</template>
<script>
import { getGuessYouLikeList } from "@/api/meetting/publish";
export default {
  name: "GuessLike",
  data() {
    return {
      activityList: [],
    };
  },
  computed: {
    id() {
      return +this.$route.params.id;
    },
  },
  created() {
    this.load();
  },
  methods: {
    async load() {
      const { data } = await getGuessYouLikeList(this.id);
      this.activityList = data.slice(0, 3);
    },
    goToDetail(id) {
      this.$router.history.push({ path: `/channel/activity/detail/${id}` });
    },
  },
};
</script>
<style lang="scss" scoped>
.sub-title {
  margin-bottom: 15px;
}
.like-box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 15px;
  &:hover {
    opacity: 0.7;
  }
  &:hover ::v-deep img {
    transform: scale(1.1);
    transition: 0.5s;
  }
  .img {
    width: 100px;
    height: 60px;
    border: 1px solid $--border-color;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
  }
  .txt {
    max-width: 120px;
    margin-left: 10px;
    cursor: pointer;
    .inner-title {
      height: 42px;
      font-size: 14px;
      color: #666769;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .inner-time {
      font-size: 12px;
      color: $--color-text-secondary;
    }
  }
}
</style>
