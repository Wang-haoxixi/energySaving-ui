<template>
  <div class="newest-tpl">
    <div class="head">最活跃的组织</div>
    <div class="list" v-if="list.length > 0">
      <div class="data" v-for="(item, index) in list" :key="index" @click="handleDetail(item)">
        <div class="avatar">
          <iep-img class="img" :src="item.avatar"></iep-img>
        </div>
        <div class="content">
          <div class="title nowrap">{{item.name}}</div>
          <div class="desc">
            <div class="label">今日任务：{{item.todayTaskCount}}</div>
            <div class="label">总任务：{{item.taskCount}}</div>
          </div>
          <div class="footer nowrap">{{item.abilityTag.join("/")}}</div>
        </div>
      </div>
    </div>
    <div class="none" v-else>暂无数据</div>
  </div>
</template>
<script>
import { SO_JOIN_TIP } from "@/const/env";
import { mapGetters } from "vuex";
import { getMostActiveSo } from "@/api/qms/cooperation_task";
import { parseDate } from "@/filters/index";

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
    loadData() {
      getMostActiveSo(5).then(({ data }) => {
        this.list = [...data];
      });
    },
    handleDetail(item) {
      if (item.isOpen) {
        this.$openPage(`${this.$pathPrefix_SoStyle}${item.orgId}`);
      } else {
        this.$message(SO_JOIN_TIP);
      }
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
      display: flex;
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
      .avatar {
        width: 50px;
        height: 50px;
        margin-right: 10px;
        border: 1px solid $--border-color;
        border-radius: 10px;
      }
      .content {
        width: calc(100% - 60px);
        .title {
          font-family: "微软雅黑";
          color: $--color-text-primary;
          margin-bottom: 5px;
        }
        .desc {
          display: flex;
          font-size: 12px;
          color: $--color-text-regular;
          margin-bottom: 5px;
          .label {
            margin-right: 10px;
            font-family: Arial;
          }
        }
        .footer {
          color: $--color-text-secondary;
          font-size: 12px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
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
