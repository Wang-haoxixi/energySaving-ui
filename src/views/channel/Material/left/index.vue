<template>
  <div class="body">
    <div class="page-list" v-loading="loading">
      <div class="list" v-if="dataList.length > 0">
        <div
          class="item"
          v-for="(item, index) in dataList"
          :key="index"
          @click="handleDetail(item)"
        >
          <div class="title iep-ellipsis-flex" :title="item.materialName">{{item.materialName}}</div>
          <div class="materialIntro iep-ellipsis-flex">{{item.materialIntro}}</div>
          <div class="info">
            <iep-img :src="item.avatar" class="img"></iep-img>
            <div class="info-item">{{item.realName}}</div>
            <div class="info-item">
              <i class="el-icon-woneng-shijian"></i>
              <span>{{item.createTime}}</span>
            </div>
            <div class="info-item">
              <i class="el-icon-woneng-yanjing1"></i>
              <span>{{item.views}}人浏览</span>
            </div>
          </div>
          <div class="tag" v-if="item.tag && item.tag.length > 0">
            <div class="tag-item" v-for="(tag, i) in item.tag" :key="i">{{tag}}</div>
          </div>
        </div>
        <div style="text-align: center;margin: 15px 0;" v-if="dataList.length > 0">
          <el-pagination
            background
            layout="prev, pager, next"
            prev-text="上一页"
            next-text="下一页"
            :total="total"
            :page-size="params.size"
            :current-page="params.current"
            @current-change="currentChange"
          ></el-pagination>
        </div>
      </div>
      <div class="no-data" v-else>暂无数据</div>
    </div>
  </div>
</template>
<script>
import { getSoPublicPage } from "@/api/dms/material";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      dataList: [],
      searchForm: {},
      total: 0,
      params: {
        current: 1,
        size: 10,
      },
      loading: true,
    };
  },
  computed: {
    ...mapGetters(["dictGroup", "userInfo"]),
  },
  methods: {
    searchPage(params = {}) {
      this.searchForm = Object.assign({}, this.searchForm, params);
      this.params.current = 1;
      this.loadPage();
    },
    async loadPage() {
      this.loading = true;
      await getSoPublicPage({
        ...this.searchForm,
        ...this.params,
      }).then((res) => {
        this.dataList = res.data.records;
        this.total = res.data.total;
        this.loading = false;
      });
    },
    currentChange(val) {
      this.params.current = val;
      this.loadPage();
    },
    handleDetail(row) {
      this.$router.push(`/channel/material/detail/${row.id}`);
    },
  },
  created() {
    this.loadPage();
  },
};
</script>
<style lang="scss" scoped>
.body {
  width: 100%;
  .total {
    flex: 0 0 450px;
    font-size: 14px;
    color: $--color-text-regular;
  }
  .list {
    border: 1px solid $--border-color;
    padding: 20px;
    border-radius: 10px;
    .item {
      border-bottom: 1px solid $--border-color;
      padding: 15px 0 25px;
      cursor: pointer;
      &:nth-child(1) {
        padding-top: 0;
      }
      &:hover {
        .title {
          color: $--color-primary;
        }
      }
      .title {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        color: $--color-text-primary;
      }
      .materialIntro {
        font-size: 14px;
        color: $--color-text-secondary;
        margin-bottom: 15px;
      }
      .info {
        display: flex;
        .img {
          width: 30px;
          height: 30px;
          min-width: 30px;
          border-radius: $--border-radius-base;
          border: 1px solid $--border-color;
          margin-right: 10px;
        }
        .info-item {
          font-size: 14px;
          color: $--color-text-secondary;
          margin-right: 20px;
          line-height: 30px;
          i {
            margin-right: 5px;
          }
        }
      }
      .tag {
        display: flex;
        flex-wrap: wrap;
        margin-top: 13px;
        margin-bottom: -10px;
        .tag-item {
          margin-bottom: 10px;
          margin-right: 10px;
          padding: 6px 10px;
          font-size: 12px;
          background-color: $--background-color;
          border-radius: $--small-border-radius;
          color: $--color-text-regular;
        }
      }
    }
  }
  .no-data {
    color: $--color-text-secondary;
    text-align: center;
  }
}
.search ::v-deep .el-input .el-input__icon {
  line-height: 36px;
}
</style>
