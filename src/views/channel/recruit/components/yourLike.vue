<template>
  <div class="newest-tpl">
    <div class="head">猜你喜欢</div>
    <div class="list" v-if="list.length > 0">
      <div class="data" v-for="(item, index) in list" :key="index" @click="handleDetail(item)">
        <div class="title">
          <div class="name" :title="item.name">{{transformString(item.name)}}</div>
          <div class="salary" v-if="!item.salaryStart && !item.salaryEnd">面议</div>
          <div class="salary" v-else>{{item.salaryStart}}K—{{item.salaryEnd}}K</div>
        </div>
        <div class="footer" :title="item.soName">{{item.soName}}</div>
      </div>
    </div>
    <div class="none" v-else>暂无数据</div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { parseDate } from "@/filters/index";
import { getRecruitHallPage } from "@/api/dms/recruit_query";
import { transformString } from "@/util/dataDeal";

export default {
  computed: {
    ...mapGetters(["dictGroup", "userInfo"]),
  },
  data() {
    return {
      parseDate,
      list: [],
    };
  },
  methods: {
    transformString,
    loadData() {
      getRecruitHallPage({
        sortType: 1,
        current: 1,
        size: 5,
      }).then(({ data }) => {
        this.list = [...data.records];
      });
    },
    handleDetail(row) {
      const url = row.type === "1" ? "partner_detail" : "recruit_detail";
      this.$router.push(`/channel/${url}/${row.recruitId}`);
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
      .footer {
        color: $--color-text-secondary;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      &:hover .avatar ::v-deep .el-image__inner {
        transform: scale(1.1);
        transition: all 0.3s;
      }
      &:hover .title {
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
.nowrap {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}
</style>
