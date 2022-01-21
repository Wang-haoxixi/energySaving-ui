<template>
  <div class="content-tpl">
    <div class="head">热门材料</div>
    <div class="list" v-if="list.length > 0">
      <div class="data" v-for="(item, index) in list" :key="index" @click="handleDetail(item)">
        <div class="icon">{{index+1}}</div>
        <div class="title iep-ellipsis" :title="item.materialName">{{item.materialName}}</div>
      </div>
    </div>
    <div class="none" v-else>暂无数据</div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getTopMaterialRanking } from "@/api/dms/material";

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
      getTopMaterialRanking().then(({ data }) => {
        this.list = [...data];
      });
    },
    handleDetail(item) {
      this.$router.push(`/channel/material/detail/${item.id}`);
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
      &:hover .title {
        color: $--color-primary;
      }
      .icon {
        border: 1px solid $--border-color;
        border-radius: $--small-border-radius;
        margin-right: 10px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        font-size: 12px;
      }
      .title {
        width: calc(100% - 30px);
        font-size: 14px;
      }
    }
  }
}
.none {
  padding: 15px 0;
  color: $--color-text-secondary;
}
</style>
