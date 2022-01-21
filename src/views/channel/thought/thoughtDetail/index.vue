<template>
  <iep-basic-container>
    <div class="top">
      <div class="breadcrumb-wrapper">
        <span>当前位置：</span>
        <el-breadcrumb class="breadcrumb-item" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item
            v-for="item in routerMatch"
            :key="item.path"
            :to="{ path: item.path }"
          >{{item.name}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="back">
        <iep-button class="iep-back-btn" @click="handleBack">返回</iep-button>
      </div>
    </div>
    <list ref="list" class="list" :dataList="dataList" @load-page="loadPage" v-if="state"></list>
    <div class="no-data" v-else>{{response.msg}}</div>
  </iep-basic-container>
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
          name: "说说详情",
          path: `/thought/thought_detail/${this.$route.params.id}`,
        },
      ],
      dataList: [],
      state: true,
      response: {},
    };
  },
  beforeRouteUpdate(to, from, next) {
    // this.routerMatch = to.matched
    next();
  },
  methods: {
    loadData(id) {
      getDetailById(id).then(({ data }) => {
        if (data) {
          this.state = true;
          this.dataList = [data];
        } else {
          this.state = false;
          this.response = data;
        }
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
  margin: -4px auto 20px;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 14px;
  .breadcrumb-item {
    display: flex;
    align-items: center;
    padding: 0;
    line-height: inherit;
  }
}
.list,
.no-data {
  margin: 0 auto;
  width: 1200px;
}
@media (max-width: 1400px) {
  .breadcrumb-wrapper {
    // width: calc(100% - 200px);
  }
  .list,
  .no-data {
    // width: calc(100% - 200px);
  }
}
.no-data {
  height: 100px;
  line-height: 100px;
  text-align: center;
  font-size: 20px;
}
// .back ::v-deep .el-button:hover {
//   border-color: #ea8d03;
//   background-color: #fff7ec;
//   color: #ea8d03;
// }
</style>
