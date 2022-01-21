<template>
  <div class="tasks-list">
    <div v-if="tasks.length > 0">
      <div
        class="tasks-list-item"
        v-for="(task, index) in tasks"
        :key="task.id"
        @click="handleDetail(task)"
      >
        <div class="left">
          <!-- <i class="el-icon-woneng-chenggong2" @click="handleFinishTask(task)"></i> -->
          <el-checkbox
            class="checkbox"
            v-model="task.state"
            true-label="2"
            false-label="1"
            disabled
            @click.native.stop="handleFinishTask(task, index)"
          ></el-checkbox>
          <div class="txt">
            <div class="title" :class="task.state" :title="task.title">{{task.title}}</div>
            <!-- <span>{{task.time}}</span> -->
            <div
              class="time"
              :class="task.diffTime.state ? 'red' : task.diffTime.day === 0 ? 'orange' : 'green'"
            >
              <span v-if="task.diffTime.state">逾期</span>
              <span v-else>剩余</span>
              <span v-if="task.diffTime.day > 0">{{task.diffTime.day}}天</span>
              <span v-else>{{task.diffTime.hour}}时</span>
            </div>
          </div>
        </div>
        <div class="person">
          <iep-img
            :alt="task.name"
            :title="task.name"
            :src="task.avatar"
            :key="task.id"
            :resizeOpt="{l:30}"
          ></iep-img>
        </div>
      </div>
    </div>
    <div class="no-data" v-else>
      <img src="/img/default/default-nodata1.png" alt />
      <div class="title">暂无任务</div>
    </div>
    <!-- 奖励分配 -->
    <DistributeDialog ref="distribute"></DistributeDialog>
  </div>
</template>

<script>
import { getCooperationPage } from "@/api/qms/cooperation_list";
import { timeDifference } from "@/util/date";
import { mapGetters } from "vuex";
import finishMixin from "@/views/task/components/finish/mixin.js";
import DistributeDialog from "@/views/task/components/finish/distribute";

export default {
  mixins: [finishMixin],
  components: { DistributeDialog },
  data() {
    return {
      tasks: [],
      taskIndex: 0,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    refreshData() {
      this.$set(this.tasks[this.taskIndex], "state", "2");
      setTimeout(() => {
        this.$emit("load-data");
      }, 500);
    },
    // 完成任务
    handleFinishTask(row, index) {
      this.taskIndex = index;
      this.handleFinish(row);
    },
    loadData() {
      getCooperationPage({
        state: "for",
        current: 1,
        size: 3,
      }).then(({ data }) => {
        let list = [...data.records];
        list = list.map(m => {
          m.diffTime = timeDifference(m.finishTime);
          return list;
        });
        this.tasks = data.records;
      });
    },
    handleDetail() {
      // 同产品确认直接跳转到个人中心任务列表页即可
      this.$router.push("/my/index/cooperation");
    },
  },
  created() {
    this.loadData();
  },
};
</script>

<style lang="scss" scoped>
.tasks-list {
  .tasks-list-item {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 25px;
    &:hover .title {
      color: $--color-primary;
    }
    .left {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      .checkbox {
        padding-right: 10px;
        line-height: 14px;
        &::v-deep .el-checkbox__inner {
          background-color: #fff;
          cursor: pointer;
          &::after {
            border-color: $--color-primary;
          }
        }
      }
    }
    &:last-child {
      margin-bottom: 0;
    }
    i {
      margin-right: 15px;
      font-size: 20px;
      color: $--color-primary;
    }
    .txt {
      .title {
        margin-bottom: 10px;
        max-width: 270px;
        height: 14px;
        font-size: 14px;
        line-height: 14px;
        font-family: "微软雅黑";
        color: $--color-text-primary;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .time {
        display: flex;
        font-size: 12px;
        color: #666769;
        .span {
          color: #666769;
        }
      }
      .red {
        color: #f74437;
      }
      .green {
        color: #3cd489;
      }
      .orange {
        color: #ff9667;
      }
      .state {
        text-decoration: line-through;
        color: $--color-text-secondary !important;
      }
    }
    .person {
      display: flex;
      align-items: center;
      margin-left: 10px;
      ::v-deep .el-image {
        margin-left: -10px;
        min-width: 30px;
        width: 30px;
        height: 30px;
        border-radius: 10px;
        border: 1px solid $--border-color;
        &:hover {
          box-shadow: 0 2px 12px 0 $--background-color;
        }
      }
    }
  }
  .no-data {
    img {
      width: 210px;
    }
    text-align: center;
    .title {
      font-size: 14px;
      color: $--color-text-secondary;
    }
  }
}
</style>
