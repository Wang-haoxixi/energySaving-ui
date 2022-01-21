<template>
  <div class="list-box">
    <iep-no-data v-if="!pagedTable.length"></iep-no-data>
    <div class="all-list" style="text-align:left">
      <el-card class="item" v-for="(item,index) in pagedTable" :key="index" shadow="hover">
        <div class="item-top">
          <div class="img">
            <iep-img :src="item.icon" alt></iep-img>
          </div>
          <div class="txt">
            <h3 class="name" :title="item.name">{{item.name}}</h3>
            <span>{{item.classification}}</span>
            <span :class="item.outlay">{{item.cost}}</span>
          </div>
        </div>
        <div class="item-bottom">
          <p>{{item.introduction}}</p>
          <iep-button
            type="primary"
            class="btn"
            @click="$openPage(`/channel/app_store_detail/${item.id}`)"
          >获取</iep-button>
        </div>
      </el-card>
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
  </div>
</template>
<script>
import { getAppStorePage } from "@/api/admin/app_store";
import mixins from "@/mixins/mixins";
export default {
  mixins: [mixins],
  data() {
    return {
      layout: "prev,pager,next",
    };
  },
  created() {
    this.loadPage();
  },
  methods: {
    async loadPage(param = { ...this.searchForm, status: 2 }) {
      await this.loadTable(param, getAppStorePage);
    },
  },
};
</script>
<style lang="scss" scoped>
.list-box {
  margin: 70px auto 40px;
  width: 1200px;
}
.pages ::v-deep .el-pagination {
  text-align: center;
}
.all-list {
  display: grid;
  grid-auto-flow: row dense;
  gap: 25px;
  grid-template-columns: 1fr 1fr 1fr;
  overflow: hidden;
  .item {
    display: inline-block;
    vertical-align: middle;
    .item-top {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      padding-bottom: 15px;
      border-bottom: 1px solid $--border-color;
      .img {
        margin-right: 15px;
        min-width: 80px;
        width: 80px;
        height: 80px;
        border: 1px solid $--border-color;
        border-radius: 10px;
      }
      .txt {
        .name {
          margin-bottom: 10px;
          width: 240px;
          font-size: 16px;
          font-family: "微软雅黑";
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: $--color-text-primary;
        }
        span {
          display: block;
          margin-bottom: 10px;
          font-size: 14px;
          max-width: 249px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          &:nth-child(2) {
            margin-bottom: 0;
          }
        }
        .free {
          color: $--color-third;
        }
        .charge {
          color: $--color-primary;
        }
      }
    }
    .item-bottom {
      padding-top: 15px;
      p {
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: $--color-text-secondary;
      }
      .btn {
        border-radius: 10px;
        width: 64px;
        text-align: center;
      }
    }
  }
}
.item-top ::v-deep .iep-img {
  width: 100%;
}
</style>
