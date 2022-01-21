<template>
  <iep-basic-container>
    <div class="top">
      <div class="breadcrumb-wrapper"></div>
      <div class="back">
        <iep-button class="iep-back-btn" @click="handleBack">返回</iep-button>
      </div>
    </div>
    <list ref="list" class="list" :dataList="dataList" @load-page="loadPage"></list>
  </iep-basic-container>
</template>

<script>
import list from "@/views/channel/thought/thoughtDetail/list";
import { getDetailById } from "@/api/dms/thoughts";
export default {
  components: { list },
  data() {
    return {
      id: 0,
      dataList: [],
    };
  },
  methods: {
    loadData(id) {
      this.id = id;
      getDetailById(id).then(({ data }) => {
        if (data) {
          this.dataList = [data];
        }
      });
    },
    loadPage() {
      this.loadData(this.id);
    },
    handleBack() {
      this.$emit("load-page", true);
    },
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
  width: 1200px;
  display: flex;
  align-items: center;
  font-size: 14px;
  span {
    margin-left: 3px;
  }
  .breadcrumb-item {
    display: flex;
    align-items: center;
    padding: 0;
    line-height: inherit;
  }
}
@media (max-width: 1400px) {
  .breadcrumb-wrapper {
    width: calc(100% - 200px);
  }
  .list,
  .no-data {
    width: calc(100% - 200px);
  }
}
// .back ::v-deep .el-button:hover {
//   border-color: #ea8d03;
//   background-color: #fff7ec;
//   color: #ea8d03;
// }
</style>
