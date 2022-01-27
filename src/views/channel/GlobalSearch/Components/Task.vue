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
        <el-card shadow="never" v-for="(item, index) in pagedTable" :key="index">
          <div class="item" @click="handleDetail(item)">
            <div class="head">
              <div class="title">
                <div class="task-name iep-ellipsis-flex" :title="item.title">{{item.title}}</div>
                <i class="el-icon-woneng-icon_guanfang" v-if="item.isOfficial === '1'"></i>
                <div
                  v-if="item.urgency !== '0'"
                  class="urgency"
                  :class="item.urgency === '1' ? 'er' : 'est'"
                >{{item.urgency === '1' ? '紧急' : '非常紧急'}}</div>
              </div>
              <div class="state">
                <i class="el-icon-woneng-gengduo1-sx"></i>进行中
              </div>
            </div>
            <div class="footer">
              <div class="desc">
                <div
                  class="sub-title iep-ellipsis-flex"
                  v-if="item.description"
                >{{item.description}}</div>
                <div class="content">
                  <!-- 进度 -->
                  <div class="block">
                    <div class="label">进度：</div>
                    <div class="span">{{item.plan}}%</div>
                  </div>
                  <!-- 人数 -->
                  <div class="block">
                    <i class="el-icon-woneng-touxiang"></i>
                    <div class="span">{{item.teamNumber}}人加入</div>
                  </div>
                  <!-- 时间 -->
                  <div class="block">
                    <i class="el-icon-woneng-shijian1"></i>
                    <div
                      class="span"
                      v-if="item.type === '0'"
                    >{{parseDate(item.finishTime, 'yyyy-MM-DD')}}</div>
                    <div class="span" v-else>已重复{{item.repeatTime}}次</div>
                  </div>
                  <!-- 发布者 -->
                  <div class="block">
                    <iep-img class="img" :src="item.avatar"></iep-img>
                    <div class="userName iep-ellipsis">{{item.userName}}</div>
                  </div>
                  <!-- 组织 -->
                  <div class="block orgName iep-ellipsis-flex">来自：{{item.orgName || "节能宝官方"}}</div>
                </div>
              </div>
              <div class="button">
                <iep-button
                  type="primary"
                  class="button"
                  v-if="item.publisher === userInfo.userId"
                >查看任务</iep-button>
                <iep-button type="primary" class="button" @click.stop="handleJoin(item)" v-else>加入任务</iep-button>
              </div>
            </div>
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
    </template>
  </div>
</template>
<script>
import mixins from "@/mixins/mixins";
import { getPcTaskWorkPage } from "@/api/qms/cooperation_list";
import { mapGetters } from "vuex";
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
      iepPageSize: 5,
    };
  },
  mounted() {
    this.loadPage();
  },
  computed: {
    ...mapGetters(["dictGroup", "userInfo"]),
  },
  methods: {
    async loadPage(
      param = {
        name: this.$route.query.keyword,
        type: this.$route.query.type,
        sort: 0,
        isSquare: 1,
        status: 0,
      },
    ) {
      this.loading = true;
      this.$emit("loadSearchCount");
      await this.loadTable(param, getPcTaskWorkPage);
      this.loading = false;
    },
    handleDetail(row) {
      this.$router.push(`/channel/task_detail/${row.id}`);
    },
  },
  watch: {
    $route: {
      handler: function () {
        this.loadPage();
      },
      deep: true,
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./common.scss";
.grid-box {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}
.item {
  cursor: pointer;
  &:hover {
    .title .task-name {
      color: $--color-primary;
    }
  }
  .head {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    .title {
      width: 80%;
      display: flex;
      color: $--color-text-primary;
      .task-name {
        margin-right: 6px;
      }
      i {
        margin-top: 2px;
        margin-right: 10px;
        font-size: 18px;
        color: $--color-secondary;
      }
      .urgency {
        margin-top: 2px;
        border-radius: 5px;
        height: 20px;
        font-size: 12px;
        line-height: 20px;
        padding: 0 5px;
        min-width: 24px;
      }
      .er {
        background: #eaf2ff;
        color: $--color-secondary;
      }
      .est {
        flex: 0 0 48px;
        background: #feeceb;
        color: $--color-primary;
      }
    }
    .state {
      display: flex;
      align-items: center;
      font-size: 14px;
      i {
        line-height: 15px;
        margin-right: 6px;
        font-size: 18px;
        color: $--color-third;
      }
    }
  }
  .desc {
    .sub-title {
      margin-bottom: 20px;
      max-width: 95%;
      font-size: 14px;
      color: $--color-text-regular;
    }
  }
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .content {
      color: $--color-text-secondary;
      display: flex;
      align-items: center;
      font-size: 14px;
      .block {
        display: flex;
        align-items: center;
        margin-right: 15px;
        i {
          line-height: 15px;
          margin-right: 4px;
          font-size: 18px;
        }
        .img {
          margin-right: 5px;
          width: 22px;
          height: 22px;
          border-radius: 5px;
          margin-right: 5px;
          border: 1px solid $--border-color;
          box-sizing: border-box;
        }
      }
      .userName {
        display: block;
        width: 120px;
      }
      .orgName {
        width: 270px;
        display: block;
      }
    }
    .button {
      min-width: 82px;
    }
  }
}
</style>
