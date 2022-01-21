<template>
  <div>
    <div class="title">
      跟Ta有关
      <el-link class="all" type="primary" @click="loadFollows()" :underline="false">
        <i class="el-icon-woneng-shuaxin"></i>换一批
      </el-link>
    </div>
    <div class="box">
      <IepSmartUserCard :item="item" v-for="item in userList" :key="item.userId"></IepSmartUserCard>
    </div>
  </div>
</template>
<script>
import { followRecommend } from "@/api/admin/follow";
export default {
  data() {
    return {
      userList: [],
    };
  },
  mounted() {
    this.loadFollows();
  },
  methods: {
    async loadFollows() {
      //请求推荐关注列表
      this.loadingShow = true;
      const { data } = await followRecommend(this.$route.params.id);
      this.userList = data;
      this.loadingShow = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .all {
    color: $--color-text-secondary;
    i {
      margin-right: 5px;
      font-size: 10px;
    }
    &:hover {
      color: $--color-primary;
    }
  }
}
.box {
  margin: 10px 0;
}
</style>
