<template>
  <div class="list-box" v-loading="loading">
    <Nodata v-if="!pagedTable.length"></Nodata>
    <template v-else>
      <p>
        共
        <span>{{pagination.total}}</span>
        条数据
      </p>
      <div class="table-box">
        <div class="header-box">
          <span v-for="header in headerList" :key="header.id">{{header.header}}</span>
        </div>
        <div class="person-box" v-for="item in pagedTable" :key="item.commonId">
          <div
            class="common-name"
            @click="$openPage(`/thought/subject_list?title=${item.commonName}&id=${item.commonId}`)"
          >
            <span :title="item.commonName">{{item.commonName}}</span>
          </div>
          <span class="launch-person">{{item.createName}}</span>
          <span class="num">{{item.count[0]}}</span>
          <div class="btn">
            <el-button
              class="iep-btn-s"
              @click="$openPage(`/thought/subject_list?title=${item.commonName}&id=${item.commonId}`)"
            >立即参与</el-button>
          </div>
        </div>
      </div>
      <div class="pages" v-if="pagedTable.length > 0">
        <iep-pagination
          @size-change="handlePaginationSizeChange"
          @current-change="handlePaginationCurrentChange"
          :pagination-option="pagination"
          :layout="layout"
          prev-text="上一页"
          next-text="下一页"
          background
        ></iep-pagination>
      </div>
    </template>
  </div>
</template>
<script>
import mixins from "@/mixins/mixins";
import { getSearchPage } from "@/api/dms/channel";
import Nodata from "./Nodata";
export default {
  components: {
    Nodata,
  },
  mixins: [mixins],
  data() {
    return {
      headerList: [
        {
          header: "话题",
        },
        {
          header: "发起人",
        },
        {
          header: "讨论数",
        },
        {
          header: "参与",
        },
      ],
      isRoute: true,
      layout: "prev,pager,next",
      loading: false,
    };
  },
  mounted() {
    this.loadPage();
  },
  methods: {
    async loadPage(
      param = {
        keyword: this.$route.query.keyword,
        type: this.$route.query.type,
      },
    ) {
      this.loading = true;
      this.$emit("loadSearchCount");
      await this.loadTable(param, getSearchPage);
      this.loading = false;
    },
  },
  watch: {
    $route: {
      handler: function() {
        this.loadPage();
      },
      deep: true,
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./common.scss";
.person-box {
  height: 80px;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  .common-name {
    font-family: "微软雅黑";
    color: $--color-text-primary;
    font-size: 18px;
    span {
      cursor: pointer;
      &:hover {
        color: $--color-primary;
      }
    }
  }
  .detail {
    color: $--color-text-regular;
    font-size: 14px;
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 12px;
    span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
