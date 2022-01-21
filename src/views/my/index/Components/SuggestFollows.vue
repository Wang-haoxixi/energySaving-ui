<template>
  <iep-wrapper class="right" title="推荐关注">
    <GraphDialog ref="GraphDialog"></GraphDialog>
    <div slot="right">
      <el-link class="all" :underline="false" @click="handleGraph()">关系图谱</el-link>
      <span class="divide">|</span>
      <el-link class="all" type="primary" @click="loadFollows()" :underline="false">
        <i class="el-icon-woneng-shuaxin"></i>换一批
      </el-link>
    </div>
    <div class="box" v-loading="loadingShow">
      <iep-no-data v-if="!userList.length"></iep-no-data>
      <IepSmartUserCard :item="item" v-for="item in userList" :key="item.userId"></IepSmartUserCard>
    </div>
  </iep-wrapper>
</template>
<script>
import { followRecommend } from "@/api/admin/follow";
import GraphDialog from "./GraphDialog";
export default {
  props: {
    userInfo: {
      type: Object,
      default: null,
    },
  },
  components: {
    GraphDialog,
  },
  data() {
    return {
      userList: [],
      loadingShow: false,
    };
  },
  mounted() {
    this.loadFollows();
  },
  methods: {
    handleGraph() {
      this.$refs["GraphDialog"].dialogShow = true;
    },
    async loadFollows() {
      //请求推荐关注列表
      this.loadingShow = true;
      const { data } = await followRecommend();
      this.userList = data;
      this.loadingShow = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.right {
  .all {
    color: $--color-text-secondary;
    &:hover {
      color: $--color-primary;
    }
    i {
      margin-right: 5px;
      font-size: 12px;
    }
  }
  .divide {
    color: $--background-color;
    font-size: 14px;
    margin: 0 8px;
  }
  .box {
    width: 100%;
  }
}

.right ::v-deep .content-wrapper {
  width: 100%;
}

.right .img ::v-deep img {
  transition: 0.5s;
}

.right .item:hover ::v-deep img {
  transform: scale(1.1);
  transition: all 0.3s;
}
.graph-btn {
  cursor: pointer;
}
</style>
