<template>
  <div class="activity-list">
    <div class="banner-bg">
      <div class="banner-content">
        <div class="banner-content-txt">
          <div class="title">
            <span>节能宝</span>
            <span>活动</span>
          </div>
          <p>以组织为核心，用协同社交的新方式，构建全新服务交流体验</p>
        </div>
        <iep-img class="banner-content-img" src="/img/banner/pic-meenting.png"></iep-img>
      </div>
    </div>
    <SearchFilter
      name="活动"
      @search-page="handleSearch"
      :total="pagination.total"
      :categoryOption="categoryOption"
    ></SearchFilter>
    <div class="list-content">
      <div class="content-wrapper" v-if="pagedTable.length">
        <iep-activity-card v-for="item of pagedTable" :key="item.id" :activity="item"></iep-activity-card>
      </div>
      <iep-no-data complex v-else></iep-no-data>
      <div class="page">
        <iep-pagination
          @size-change="handlePaginationSizeChange"
          @current-change="handlePaginationCurrentChange"
          :pagination-option="pagination"
          :layout="layout"
        ></iep-pagination>
      </div>
    </div>
  </div>
</template>
<script>
// 活动列表
import mixins from "@/mixins/mixins";
import SearchFilter from "./Components/SearchFilter";
import { getActivitiePage } from "@/api/meetting/publish";
import { mapGetters } from "vuex";
export default {
  name: "List",
  components: {
    SearchFilter,
  },
  mixins: [mixins],
  data() {
    return {
      layout: "prev, pager, next",
    };
  },
  computed: {
    ...mapGetters(["dictGroup", "cityTree"]),
    qms_activity_type() {
      return (
        (this.dictGroup.get("qms_activity_type") &&
          this.dictGroup.get("qms_activity_type").map((m) => {
            return {
              id: m.value,
              name: m.label,
            };
          })) ||
        []
      );
    },
    categoryOption() {
      return {
        typeList: [
          {
            id: null,
            name: "全部",
          },
          ...this.qms_activity_type,
        ],
        area: [
          {
            id: null,
            name: "全部",
          },
          ...this.cityTree,
        ],
      };
    },
  },
  methods: {
    handleSearch(searchForm) {
      this.searchPage(searchForm);
      // this.loadPage(searchForm);
    },
    async loadPage(param = { ...this.searchForm }) {
      param.size = 12;
      await this.loadTable(param, getActivitiePage);
    },
  },
};
</script>
<style lang="scss" scoped>
.activity-list {
  .list-content {
    width: 1200px;
    margin: 0 auto;
    .content-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 20px;
      margin-top: 30px;
    }
  }
}
.banner-bg {
  height: 280px;
  width: 100%;
  background: url("/img//banner/bg-meeting.jpg") no-repeat;
  background-size: cover;
}
.banner-content {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
  width: 1200px;
  height: 280px;
  .title {
    margin-bottom: 30px;
    font-size: 40px;
    height: 40px;
    line-height: 40px;
    font-family: "微软雅黑";
    color: $--color-text-primary;
    span:nth-child(2) {
      color: #f74437;
    }
  }
  p {
    font-size: 18px;
    height: 18px;
    line-height: 18px;
    font-family: "微软雅黑";
    color: $--color-text-primary;
  }
  .banner-content-img {
    flex: 0 0 360px;
    width: 360px;
  }
}
.page ::v-deep .el-pagination {
  text-align: center;
}
</style>
