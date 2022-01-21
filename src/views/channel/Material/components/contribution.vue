<template>
  <div class="content-tpl">
    <div class="head">材料贡献榜</div>
    <div class="list" v-if="list.length">
      <div class="data" v-for="(item, index) in list" :key="index" @click="handleDetail(item)">
        <div class="icon">{{index + 1}}</div>
        <iep-img :src="item.avatar" class="img"></iep-img>
        <div class="info">
          <div class="so-name iep-ellipsis" :title="item.name">{{item.name}}</div>
          <div class="number">贡献材料{{item.num}}篇</div>
        </div>
      </div>
    </div>
    <div class="none" v-else>暂无数据</div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getMaterialContribution } from "@/api/dms/material";

export default {
  computed: {
    ...mapGetters(["dictGroup", "userInfo"]),
  },
  data() {
    return {
      list: [],
    };
  },
  methods: {
    loadData() {
      getMaterialContribution().then(({ data }) => {
        this.list = [...data];
      });
    },
    handleDetail(row) {
      this.$router.push(`/channel/styles/so/${row.orgId}/index`);
    },
  },
  created() {
    this.loadData();
  },
};
</script>

<style lang="scss" scoped>
.content-tpl {
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
    font-size: 16px;
    margin-top: 30px;
    .data {
      display: flex;
      margin-bottom: 20px;
      cursor: pointer;
      &:nth-child(-n + 3) {
        .icon {
          border-color: $--color-primary;
          color: $--color-primary;
        }
      }
      &:hover .info {
        .so-name {
          color: $--color-primary;
        }
      }
      .icon {
        border: 1px solid $--border-color;
        border-radius: $--small-border-radius;
        margin-right: 10px;
        width: 20px;
        height: 20px;
        min-width: 20px;
        line-height: 20px;
        text-align: center;
        font-size: 12px;
        margin-top: 15px;
      }
      .img {
        margin-right: 10px;
        width: 50px;
        height: 50px;
        min-width: 50px;
        border-radius: $--border-radius-base;
        border: 1px solid $--border-color;
      }
      .info {
        width: calc(100% - 90px);
        font-size: 14px;
        .so-name {
          color: $--color-text-primary;
          margin-bottom: 5px;
        }
        .number {
          color: $--color-text-secondary;
        }
      }
    }
  }
}
.none {
  padding: 15px 0;
  color: $--color-text-secondary;
}
</style>
