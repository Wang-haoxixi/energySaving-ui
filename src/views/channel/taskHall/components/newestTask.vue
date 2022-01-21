<template>
  <div class="newest-tpl">
    <div class="head">最新任务</div>
    <div class="list" v-if="list.length">
      <div class="data" v-for="(item, index) in list" :key="index" @click="handleDetail(item)">
        <div class="title nowrap">{{item.title}}</div>
        <div class="desc">
          <div class="label">
            <i class="el-icon-woneng-shijian1"></i>
            <span class="span" v-if="item.type === '0'">{{parseDate(item.finishTime, 'yyyy-MM-DD')}}</span>
            <span class="span" v-else>已重复{{item.repeatTime}}次</span>
          </div>
          <div class="label">
            <i class="el-icon-woneng-touxiang"></i>
            {{item.teamNumber}}人加入
          </div>
        </div>
        <div class="footer">来自：{{item.orgName || '节能保官方'}}</div>
      </div>
    </div>
    <div class="none" v-else>暂无数据</div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getPcTaskWorkPage } from "@/api/qms/cooperation_list";
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
      getPcTaskWorkPage({
        status: 0,
        sort: 1,
        current: 1,
        size: 5,
        isSquare: 1,
      }).then(({ data }) => {
        this.list = [...data.records];
      });
    },
    handleDetail(row) {
      this.$router.push(`/channel/task_detail/${row.id}`);
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
    font-size: 16px;
    .data {
      margin-top: 15px;
      padding-bottom: 10px;
      border-bottom: 1px solid $--border-color;
      cursor: pointer;
      &:last-child {
        padding-bottom: 0;
        border: 0;
      }
      &:hover {
        .title {
          color: $--color-primary;
        }
      }
      .title {
        color: #666769;
        margin-bottom: 10px;
        font-size: 14px;
      }
      .desc {
        display: flex;
        font-size: 14px;
        color: $--color-text-regular;
        margin-bottom: 10px;
        .label {
          margin-right: 10px;
          font-size: 12px;
          font-family: Arial;
          i {
            margin-right: 2px;
            color: #babec0;
          }
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
