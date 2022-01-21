<template>
  <div>
    <iep-page-header title="" :backOption="backOption"></iep-page-header>
    <list ref="list" class="list" :dataList="dataList" @load-page="loadPage" v-if="state"></list>
    <div class="no-data" v-else>{{response.msg}}</div>
  </div>
</template>

<script>
import list from "../../thoughtDetail/list";
import { getDetailById } from "@/api/dms/thoughts";
export default {
  components: { list },
  data() {
    return {
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.$emit("back_page", false);
        },
      },
      dataList: [],
      state: true,
      response: {},
      thoughtsId: 0,
    };
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  methods: {
    loadData(row) {
      this.thoughtsId = row.thoughtsId;
      getDetailById(row.thoughtsId).then(({ data }) => {
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
      this.loadData(this.thoughtsId);
    },
  },
};
</script>

<style lang="scss" scoped>
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
.list,
.no-data {
  margin: auto;
}
@media (max-width: 1400px) {
  .breadcrumb-wrapper {
    width: calc(100% - 50px);
  }
  .list,
  .no-data {
    width: calc(100% - 50px);
  }
}
.no-data {
  height: 100px;
  line-height: 100px;
  text-align: center;
  font-size: 20px;
}
</style>
