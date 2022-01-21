<template>
  <!-- 工作台的详情页 -->
  <div>
    <div class="top">
      <div class="breadcrumb-wrapper">
        <span>当前位置：</span>
      </div>
      <div class="back">
        <iep-button class="iep-back-btn" @click="handleBack">返回</iep-button>
      </div>
    </div>
    <list ref="list" class="list" :dataList="dataList" @load-page="loadPage"></list>
  </div>
</template>

<script>
import list from "./list";
import { getDetailById } from "@/api/dms/thoughts";
export default {
  components: { list },
  data() {
    return {
      routerMatch: [
        {
          name: "说说首页",
          path: "/channel/thought_list",
        },
        {
          name: "",
          path: "/thought/thought_detail/:id",
        },
      ],
      dataList: [],
    };
  },
  beforeRouteUpdate(to, from, next) {
    // this.routerMatch = to.matched
    next();
  },
  methods: {
    loadData(id) {
      getDetailById(id).then(({ data }) => {
        this.dataList = [data];
      });
    },
    loadPage() {
      this.loadData(this.$route.params.id);
    },
    handleBack() {
      this.$router.go(-1);
    },
  },
  created() {
    this.loadData(this.$route.params.id);
    console.log("routerMatch: ", this.routerMatch);
  },
};
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  width: 1200px;
}
.breadcrumb-wrapper {
  position: relative;
  width: 100%;
  margin: -4px auto 20px;
  text-align: right;
  .breadcrumb-item {
    display: flex;
    align-items: center;
    padding: 0;
    line-height: inherit;
  }
}
.list {
  margin: 0 auto;
  width: 1200px;
}
// .back ::v-deep .el-button:hover {
//   border-color: #ea8d03;
//   background-color: #fff7ec;
//   color: #ea8d03;
// }
@media (max-width: 1400px) {
  .breadcrumb-wrapper {
    // width: calc(100% - 200px);
  }
  .list {
    // width: calc(100% - 200px);
  }
}
</style>

