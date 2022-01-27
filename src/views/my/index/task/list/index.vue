<template>
  <div class="task-list">
    <!-- 头部快速新建 -->
    <div class="head-form">
      <el-input
        v-model="formData.title"
        placeholder="添加新任务，按回车键（Enter）快速新建"
        @keyup.enter.native="handleEnter"
        class="input"
      >
        <div class="button-list" slot="suffix">
          <i class="el-icon-user el-input__icon" @click="handlePlusUser"></i>
          <IepContactsInput
            ref="IepContactsInput"
            v-show="false"
            v-model="cooperationTaskUserVOList"
            :showFriend="false"
            :limitUserIds="[userInfo.userId]"
          ></IepContactsInput>
          <i class="el-icon-time el-input__icon" @click="hanleChosenTime"></i>
          <div class="chosen-time hide">
            <el-date-picker
              v-model="formData.finishTime"
              type="datetime"
              placeholder="请选择时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </div>
        </div>
      </el-input>
      <div class="user-list" v-if="cooperationTaskUserVOList.length > 0">
        <el-tag
          class="user-tag"
          v-for="(item, index) in cooperationTaskUserVOList"
          :key="item.id"
          type="info"
          closable
          @close="handleUserColse(item, index)"
        >{{item.name}}</el-tag>
      </div>
    </div>
    <!-- 列表内容 -->
    <div class="content-list" v-loading="listState">
      <div class="head">
        <div class="title">我的任务</div>
        <div class="button-list">
          <el-tooltip content="日历" placement="top" effect="dark">
            <i class="el-icon-woneng-rili" @click="handleCalendar"></i>
          </el-tooltip>
          <el-tooltip content="搜索及排序" placement="top" effect="dark">
            <el-popover placement="bottom" width="240" trigger="click">
              <SearchForm ref="search" @search_page="searchPage"></SearchForm>
              <i class="el-icon-woneng-paixu2" slot="reference"></i>
            </el-popover>
          </el-tooltip>
          <el-tooltip content="新增" placement="top" effect="dark">
            <i class="el-icon-woneng-jia1" @click="handleCreate"></i>
          </el-tooltip>
        </div>
      </div>
      <!-- 列表 -->
      <div class="list" v-infinite-scroll="currentChange">
        <div class="item" v-for="(item, index) in list" :key="index" @click="handleDetail(item)">
          <div class="state grid" @click.stop="handleFinish(item)">
            <el-progress
              type="circle"
              :width="25"
              :percentage="item.plan"
              :stroke-width="2"
              :status="item.status"
              color="#3CD489"
            ></el-progress>
          </div>
          <div class="title grid">
            <div
              class="top"
              :class="[{'not-dec': !item.description}, {'task-finish': item.taskState === '1'}]"
            >
              <div class="top-title">{{item.title}}</div>
              <div class="top-guanfang" v-if="item.isOfficial === '1'">
                <i class="el-icon-woneng-icon_guanfang"></i>
              </div>
              <div class="top-reward" v-if="item.allocationType !== '0'">
                <i class="el-icon-woneng-qian1"></i>
              </div>
              <div
                class="top-zhiding"
                :class="{'top-zhiding-show' : item.isTop === '1'}"
                @click.stop="handleTop(item)"
              >置顶</div>
            </div>
            <div class="bottom">{{item.description}}</div>
          </div>
          <div class="org grid">{{item.orgName || "节能宝官方"}}</div>
          <div
            class="urgency grid"
            :class="urgencyObj[item.urgency].color"
          >{{urgencyObj[item.urgency].name}}</div>
          <!-- 普通任务 -->
          <div v-if="item.type === '0'" class="time grid">
            <!-- 参与者已经完成 || 发布者已经完成 || 发布者已经关闭，显示此任务的截止时间 -->
            <div
              v-if="item.state === '2' || item.taskState === '1' || item.taskState === '2'"
            >{{item.finishTime | parseToTimeMinutes}}</div>
            <!-- 若任务没有完成，显示逾期或剩余的时间 -->
            <div
              v-else
              :class="item.timeDifference.state ? 'red' : item.timeDifference.day === 0 ? 'orange' : 'green'"
            >
              <span>{{item.timeDifference.state ? '逾期' : '剩余'}}</span>
              <span v-if="item.timeDifference.day > 0">{{item.timeDifference.day}}天</span>
              <span v-else>{{item.timeDifference.hour}}时</span>
            </div>
          </div>
          <!-- 重复任务，显示重复了几次 -->
          <div class="time grid" v-else>已重复{{item.repeatTime}}次</div>
          <div class="avatar grid">
            <iep-img class="img" :src="item.avatar" :resizeOpt="{l:40}"></iep-img>
          </div>
        </div>
      </div>
    </div>
    <!-- 新建表单 -->
    <CreateDialog ref="create" @load_page="loadPage"></CreateDialog>
    <!-- 修改详情 -->
    <DetailDialog ref="detail" @load_data="loadPage()"></DetailDialog>
    <!-- 奖励分配 -->
    <DistributeDialog ref="distribute"></DistributeDialog>
  </div>
</template>

<script>
import CreateDialog from "../form/create";
import DetailDialog from "../form/detail";
import { getCooperationPage } from "@/api/qms/cooperation_list";
import { timeDifference } from "@/util/date";
import SearchForm from "./searchForm";
import { parseDate } from "@/filters/index.ts";
import { createTask, taskTop } from "@/api/qms/cooperation_task";
import { mapGetters } from "vuex";
import { urgencyObj } from "./options";
import finishMixin from "@/views/task/components/finish/mixin.js";
import DistributeDialog from "@/views/task/components/finish/distribute";

const initForm = () => {
  return {
    title: "",
    orgId: "",
    userSet: [],
    finishTime: parseDate(new Date(), "yyyy-MM-DD") + " 23:59:59",
  };
};

export default {
  mixins: [finishMixin],
  components: { CreateDialog, DetailDialog, SearchForm, DistributeDialog },
  data() {
    return {
      urgencyObj,
      list: [],
      pageOption: {
        current: 1,
        size: 10,
      },
      params: {},
      listState: false,
      pages: 0,
      formData: initForm(),
      cooperationTaskUserVOList: [],
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    // 搜索
    searchPage(params) {
      this.params = { ...params };
      this.loadPage();
    },
    refreshData() {
      this.loadPage();
    },
    loadPage() {
      this.pageOption.current = 1;
      this.list = [];
      this.loadData();
    },
    currentChange() {
      if (this.pageOption.current >= this.pages) return;
      this.pageOption.current += 1;
      this.loadData();
    },
    loadData(param = this.params) {
      this.listState = true;
      getCooperationPage(Object.assign({}, param, this.pageOption)).then(
        ({ data }) => {
          this.listState = false;
          this.pages = data.pages;
          const list = data.records.map((m) => {
            if (m.state === "4") {
              m.status = "exception";
            } else if (m.state === "2") {
              m.status = "success";
            }
            m.timeDifference = timeDifference(m.finishTime);
            return m;
          });
          this.list = this.list.concat(list);
          // 当没有任务查询条件的时候，将统计数据插入搜索
          this.$refs.search.total = {
            total: data.taskTotal,
            overdueTask: data.overdueTask,
          };
        },
      );
    },
    // 快速选时间
    hanleChosenTime() {},
    // 快速新建任务提交
    handleEnter() {
      if (this.formData.title === "") return;
      const row = { ...this.formData };
      row.orgId = this.userInfo.orgId;
      row.userSet = this.cooperationTaskUserVOList.map((m) => m.id);
      createTask(row).then(({ data }) => {
        if (data) {
          this.cooperationTaskUserVOList = [];
          this.formData = initForm();
          this.loadPage();
        }
      });
    },
    handleCalendar() {
      this.$emit("changeWeb", "CalendarTpl");
    },
    handleCreate() {
      this.$refs.create.loadData();
    },
    handleDetail(row) {
      this.$refs.detail.loadData(row);
    },
    // 置顶
    handleTop(row) {
      taskTop({
        id: row.taskUserId,
        isTop: row.isTop === "1" ? 0 : 1,
      }).then(({ data }) => {
        if (data) {
          this.loadPage();
        }
      });
    },
    handlePlusUser() {
      this.$refs.IepContactsInput.handleEdit();
    },
    handleUserColse(row, index) {
      this.cooperationTaskUserVOList.splice(index, 1);
    },
  },
  created() {
    // 加载数据从搜索框内发起
    // this.loadData();
  },
};
</script>
<style lang="scss" scoped>
.task-list {
  .head-form {
    margin-bottom: 20px;
    .input {
      &::v-deep input {
        border: 1px solid $--border-color;
        background-color: $--background-color;
      }
      &::v-deep .hide {
        width: 25px;
        height: 30px;
        display: inline-block;
        position: absolute;
        top: 6px;
        overflow: hidden;
        opacity: 0;
      }
      .popover {
        right: 25px;
      }
      .chosen-time {
        right: 1px;
        cursor: pointer;
      }
      .button-list .el-input__icon {
        font-size: 18px;
        width: 30px;
        cursor: pointer;
      }
      .button-list .chosen-user {
        left: 2px;
        top: 4px;
      }
    }
    .user-list {
      padding-top: 15px;
      .user-tag {
        margin: 0 10px 10px 0;
      }
    }
  }
  .content-list {
    border: 1px solid rgba(239, 240, 241, 1);
    border-radius: 10px;
    min-height: 100px;
    .head {
      padding: 15px 15px 0;
      display: flex;
      justify-content: space-between;
      .title {
        font-family: Microsoft YaHei;
        font-weight: 400;
        font-family: "微软雅黑";
        color: $--color-text-primary;
        font-size: 16px;
      }
      .button-list {
        i {
          font-size: 18px !important;
          margin-left: 15px;
          cursor: pointer;
        }
      }
    }
    .list {
      margin-top: 30px;
      padding: 15px 0;
      max-height: 560px;
      overflow-y: scroll;
      .item {
        display: flex;
        margin-bottom: 10px;
        padding: 15px;
        cursor: pointer;
        box-sizing: border-box;
        &:last-of-type {
          margin-bottom: 0;
        }
        &:hover {
          .title .top .top-zhiding {
            opacity: 1;
          }
        }
        .grid {
          font-size: 14px;
          margin-right: 20px;
          &:last-of-type {
            margin: 0;
          }
        }
        .state {
          width: 30px;
          padding-top: 15px;
          &::v-deep .el-progress__text {
            display: none;
          }
          &::v-deep .is-success .el-progress__text,
          &::v-deep .is-exception .el-progress__text {
            display: inline-block;
          }
        }
        .title {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 400px;
          .top {
            font-size: 14px;
            font-weight: 400;
            margin-bottom: 13px;
            font-family: "微软雅黑";
            color: $--color-text-primary;
            display: flex;
            align-items: center;
            width: 100%;
            .top-title {
              max-width: calc(100% - 72px);
              height: 20px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              word-break: break-all;
            }
            .top-guanfang {
              margin-left: 9px;
              i {
                color: $--color-secondary;
              }
            }
            .top-reward {
              margin-left: 9px;
              i {
                color: $--color-primary;
              }
            }
            .top-zhiding {
              opacity: 0;
              margin-left: 9px;
              color: $--color-primary;
              height: 20px;
              width: 36px;
              text-align: center;
              line-height: 20px;
              font-size: 12px;
              // background-color: #feeceb;
              background-color: #C7E8DC;
              border-radius: 5px;
            }
            .top-zhiding-show {
              opacity: 1;
            }
          }
          .not-dec {
            display: flex;
            align-items: center;
            margin-bottom: 0;
          }
          .bottom {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;
            font-size: 14px;
            color: $--color-text-secondary;
          }
          .task-finish {
            text-decoration: line-through;
            color: $--color-text-secondary;
          }
        }
        .org {
          width: 170px;
          // line-height: 60px;
          color: $--color-text-regular;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
        }
        .urgency {
          display: flex;
          align-items: center;
          width: 70px;
          // line-height: 60px;
          color: $--color-text-regular;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
        }
        .time {
          width: 140px;
          // line-height: 60px;
          .span {
            color: $--color-text-regular;
          }
          i {
            font-style: normal;
            color: $--color-text-secondary;
          }
        }
        .red {
          color: $--color-primary;
        }
        .blue {
          color: $--color-secondary;
        }
        .green {
          color: $--color-third;
        }
        .gray {
          color: #babec0;
        }
        .orange {
          color: #ff9667;
        }
        .avatar {
          padding-top: 10px;
          .img {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            border: 1px solid #eff0f1;
          }
        }
      }
    }
  }
}
::-webkit-scrollbar {
  border-radius: 10px;
  width: 6px;
  background-color: #fff;
}
::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #fff;
  -webkit-transition: 0.3s background-color;
  transition: 0.3s background-color;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #ddd;
  -webkit-transition: 0.3s background-color;
  transition: 0.3s background-color;
  display: none;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
}
:hover ::-webkit-scrollbar-thumb {
  display: block;
}
</style>
