<template>
  <div class="list-box" v-loading="loading">
    <Nodata v-if="!pagedTable.length"></Nodata>
    <template v-else>
      <p>
        共
        <span>{{pagination.total}}</span>
        条数据
      </p>
      <div class="grid-box">
        <div
          class="material-box"
          v-for="item in pagedTable"
          :key="item.id"
          @click="$openPage(`/my/index/material/${item.id}`)"
        >
          <div class="title iep-ellipsis-flex">{{item.materialName}}</div>
          <div class="desc iep-ellipsis-2-flex" :title="item.materialIntro">{{item.materialIntro}}</div>
          <div class="info-wrap">
            <div class="user">
              <iep-img class="image" :resizeOpt="{l:26}" :src="item.avatar" alt></iep-img>
              <div class="name">{{item.realName}}</div>
            </div>
            <div class="time">
              <i class="el-icon-woneng-shijian"></i>
              {{item.createTime}}
            </div>
            <div class="view">
              <i class="el-icon-woneng-yanjing1" style="font-size: 16px;"></i>
              {{item.views}}
            </div>
            <!-- <div class="download">
              <i class="el-icon-woneng-xiazai"></i>
              {{item.downloadTimes}}
            </div>-->
          </div>
          <div class="tag-list" v-if="item.tag">
            <iep-tag-read :value="item.tag"></iep-tag-read>
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
import { getMaterialSearchPage } from "@/api/dms/material";
import Nodata from "./Nodata";
export default {
  components: {
    Nodata,
  },
  mixins: [mixins],
  data() {
    return {
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
      await this.loadTable(param, getMaterialSearchPage);
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
.material-box {
  box-sizing: border-box;
  height: 190px;
  display: flex;
  overflow: hidden;
  cursor: pointer;
  flex-direction: column;
  border-radius: $--border-radius-base;
  border: 1px solid $--border-color;
  padding: 20px;
  .title {
    margin-bottom: 15px;
    font-size: 16px;
    height: 16px;
    line-height: 16px;
    font-family: "微软雅黑";
    color: $--color-text-primary;
  }
  .desc {
    max-width: 438px;
    font-size: 14px;
    height: 40px;
    color: $--color-text-regular;
    margin-bottom: 15px;
  }
  .info-wrap {
    display: flex;
    align-items: center;
    .user {
      display: flex;
      align-items: center;
      font-size: 14px;
      .image {
        width: 28px;
        height: 28px;
        border: 1px solid #eff0f1;
        box-sizing: border-box;
      }
      .name {
        margin-left: 10px;
        color: $--color-text-regular;
      }
    }
    .time,
    .view {
      display: flex;
      align-items: center;
      margin-left: 20px;
      color: $--color-text-secondary;
      font-size: 12px;
      i {
        margin-right: 3px;
      }
    }
  }
  .tag-list {
    margin-top: 15px;
    font-size: 12px;
    color: $--color-text-secondary;
  }
}
</style>
