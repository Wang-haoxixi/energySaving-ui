<template>
  <div class="body">
    <div class="sort">
      <div class="total">共{{total}}条数据</div>
      <div class="dropdown" v-for="(item, index) in sortList" :key="index">
        {{item.name}}：
        <el-dropdown>
          <span class="el-dropdown-link">
            {{getSearchName(item)}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(t, i) in item.list"
              :key="i"
              @click.native="dropdownClick(item, t)"
            >{{t.label}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="page-list" v-loading="loading">
      <div class="list" v-if="dataList.length > 0">
        <div
          class="item"
          v-for="(item, index) in dataList"
          :key="index"
          @click="handleDetail(item)"
        >
          <div class="head">
            <div class="title">
              <div class="task-name nowrap" :title="item.title">{{item.title}}</div>
              <i class="el-icon-woneng-icon_guanfang" v-if="item.isOfficial === '1'"></i>
              <i class="el-icon-woneng-qian1" v-if="item.allocationType !== '0'"></i>
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
              <div class="sub-title nowrap" v-if="item.description">{{item.description}}</div>
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
                  <div class="userName">{{item.userName}}</div>
                </div>
                <!-- 组织 -->
                <div class="block orgName nowrap">来自：{{item.orgName || "节能保官方"}}</div>
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
import { getPcTaskWorkPage } from "@/api/qms/cooperation_list";
import { applyJoin } from "@/api/qms/cooperation_task";
import { parseDate } from "@/filters/index";
import { sortList, initSearchData } from "./options";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      parseDate,
      sortList,
      dataList: [],
      searchForm: initSearchData(),
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
    dropdownClick(item, t) {
      this.searchForm[item.value] = t.value;
      this.searchPage();
    },
    searchPage(params = {}) {
      this.searchForm = Object.assign({}, this.searchForm, params);
      this.params.current = 1;
      this.loadPage();
    },
    async loadPage() {
      this.loading = true;
      const query = {
        ...this.searchForm,
        ...this.params,
        isSquare: 1,
      };
      this.$router.replace({
        query,
      });
      await getPcTaskWorkPage(query).then((res) => {
        this.dataList = res.data.records;
        this.total = res.data.total;
        this.loading = false;
      });
    },
    currentChange(val) {
      this.params.current = val;
      this.loadPage();
    },
    // 加入任务
    handleJoin(row) {
      this.$prompt(
        "提醒：加入任务申请通过后，会自动加入该组织，请知悉。",
        "申请理由",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputPlaceholder: "请输入申请理由",
          inputErrorMessage: "最多输入50个字符",
          inputValidator: (value) => {
            if (value.length > 50) {
              return false;
            } else {
              return true;
            }
          },
        },
      ).then(({ value }) => {
        applyJoin({
          applyReason: value,
          taskId: row.id,
        })
          .then(({ data }) => {
            if (data) {
              this.$message.success("报名成功！");
              this.loadPage();
            }
          })
          .catch(() => {});
      });
    },
    handleDetail(row) {
      this.$router.push(`/channel/task_detail/${row.id}`);
    },
    getSearchName(row) {
      for (const item of row.list) {
        if (item.value === this.searchForm[row.value]) {
          return item.label;
        }
      }
    },
  },
  created() {
    const query = this.$route.query;
    const { current, size } = query;
    this.params = {
      current: Number(current) || 1,
      size: Number(size) || 10,
    };
    this.searchForm = Object.assign({}, initSearchData(), query);
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
  .sort {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
    padding: 14px 20px;
    border: 1px solid $--border-color;
    border-radius: 10px;
    display: flex;
    .dropdown {
      font-size: 14px;
      width: 25%;
      text-align: right;
      ::v-deep .el-dropdown {
        cursor: pointer;
      }
      ::v-deep i {
        color: $--color-input-regular;
      }
    }
  }
  .list {
    border: 1px solid $--border-color;
    padding: 20px;
    border-radius: 10px;
    .item {
      border-bottom: 1px solid $--border-color;
      margin-bottom: 15px;
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
          font-family: "微软雅黑";
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
        padding: 0 0 19px;
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
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          .orgName {
            width: 270px;
            display: block;
          }
        }
        .button {
          padding: 0;
          width: 80px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border-radius: 5px;
        }
      }
    }
  }
  .no-data {
    color: $--color-text-secondary;
    text-align: center;
  }
  .nowrap {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
}
.search ::v-deep .el-input .el-input__icon {
  line-height: 36px;
}
</style>
