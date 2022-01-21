<template>
  <div class="newest-tpl">
    <div class="head">热门文章</div>
    <div class="list" v-if="list.length > 0">
      <div
        class="data"
        v-for="(item, index) in list"
        :key="index"
        @click="handleDetail(item)"
      >{{item.materialName}}</div>
    </div>
    <div class="none" v-else>暂无数据</div>
  </div>
</template>
<script>
import { getDynamicHit } from "@/api/dms/material";

export default {
  data() {
    return {
      list: [],
    };
  },
  methods: {
    loadData() {
      getDynamicHit().then(({ data }) => {
        this.list = data;
      });
    },
    handleDetail(row) {
      this.$router.push(`/channel/material/detail/${row.id}`);
    },
  },
  created() {
    this.loadData();
  },
};
</script>

<style lang="scss" scoped>
.newest-tpl {
  padding: 10px 20px 0;
  background-color: #fff;
  border: 1px solid $--border-color;
  border-radius: 10px;
  .head {
    padding: 5px 0 0;
    font-family: "微软雅黑";
    color: $--color-text-primary;
  }
  .list {
    padding: 0 0 15px;
    font-size: 14px;
    .data {
      margin-top: 15px;
      padding-bottom: 10px;
      border-bottom: 1px solid $--border-color;
      cursor: pointer;
      &:hover {
        color: $--color-primary;
      }
      &:hover .name {
        color: $--color-primary;
      }
      .title {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        .name {
          width: calc(100% - 110px);
        }
        .salary {
          width: 110px;
          text-align: right;
          color: $--color-primary;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
      .tags {
        width: 100%;
        color: $--color-text-secondary;
        font-size: 12px;
      }
      &:hover .avatar ::v-deep .el-image__inner {
        transform: scale(1.1);
        transition: all 0.3s;
      }
      &:hover .content .title {
        color: $--color-primary;
        transition: all 0.3s;
      }
      &:last-child {
        padding-bottom: 0;
        border: 0;
      }
    }
  }
}
.none {
  padding: 15px 0;
  color: $--color-text-secondary;
}
</style>
