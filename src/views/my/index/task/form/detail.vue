<template>
  <el-dialog
    title="任务详情"
    :visible.sync="dialogShow"
    :width="isOfficial ? '677px' : '1100px'"
    class="dialog"
    @close="_close"
  >
    <!-- 头部插槽 -->
    <div slot="title" class="dialog-title">
      <!-- 左部 -->
      <div class="left">
        <div class="title">任务详情</div>
        <el-tag
          type="primary"
          class="tag"
          v-if="formData.taskState === '1' && formData.allocationStatus === '1' && formData.publisher === userInfo.userId"
          @click="handleDistribution"
        >
          <el-checkbox true-label="2"></el-checkbox>去分配
          <div class="Mask"></div>
        </el-tag>
        <el-tag
          v-else
          :type="taskState[formData.state].type"
          @click.native="handleChangeState"
          class="tag"
        >
          <el-checkbox v-model="formData.state" :disabled="formData.state !== '1'" true-label="2"></el-checkbox>
          {{taskState[formData.state].name}}
          <div class="Mask"></div>
        </el-tag>
      </div>
      <!-- 右部 -->
      <div class="right">
        <el-popover placement="bottom" trigger="click" ref="popover">
          <div class="popover-button-list">
            <div
              class="button-item"
              v-if="userInfo.userId === formData.publisher && formData.taskState !== '2'"
              @click="handleState(3, '关闭')"
            >关闭任务</div>
            <!-- <div
              class="button-item"
              v-if="userInfo.userId === formData.publisher && formData.taskState === '2'"
              @click="handleState(5, '重启')"
            >重启任务</div>-->
            <div
              class="button-item"
              v-if="userInfo.userId === formData.publisher"
              @click="handleState(2, '删除')"
            >删除任务</div>
            <div
              class="button-item"
              v-if="userInfo.userId !== formData.publisher"
              @click="handleQuit"
            >退出任务</div>
            <div
              class="button-item"
              v-if="userInfo.userId === formData.publisher && formData.isWorkshop === '0' && formData.isAdmin"
              @click="handlePublish"
            >同步至工场</div>
          </div>
          <i class="el-icon-more" slot="reference"></i>
        </el-popover>
      </div>
    </div>
    <!-- 主体内容 -->
    <div class="dialog-content">
      <UpdateTpl
        class="left"
        :class="{'only-left': isOfficial}"
        ref="UpdateTpl"
        @load_page="update_submit"
      ></UpdateTpl>
      <DynamicTpl class="right" :taskId="formData.id" ref="dynamic" v-if="!isOfficial"></DynamicTpl>
    </div>
    <!-- 奖励分配 -->
    <DistributeDialog ref="distribute" @success-distribute="loadData(formData)"></DistributeDialog>
  </el-dialog>
</template>

<script>
import UpdateTpl from "./update";
import DynamicTpl from "./dynamic";
import { getDetailById } from "@/api/qms/cooperation_list";
import { initFormData, taskState } from "./options";
import { timeDifference } from "@/util/date";
import { mapGetters } from "vuex";
import {
  operationTask,
  restartTask,
  exitTask,
  publishWorkShop,
} from "@/api/qms/cooperation_task";
import DistributeDialog from "@/views/task/components/finish/distribute";
import finishMixin from "@/views/task/components/finish/mixin.js";

export default {
  mixins: [finishMixin],
  components: { UpdateTpl, DynamicTpl, DistributeDialog },
  data() {
    return {
      dialogShow: false,
      formData: initFormData(),
      taskState,
      isOfficial: false,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    update_submit() {
      this.$message.success("保存成功！");
      this.$emit("load_data", true);
      this.dialogShow = false;
      this._close();
    },
    loadData(row) {
      this.isOfficial = row.isOfficial === "1";
      this.dialogShow = true;
      getDetailById({ taskId: row.id }).then(({ data }) => {
        data.userSet = data.cooperationTaskUserVOList.map((m) => m.userId);
        data.timeDifference = timeDifference(data.finishTime);
        this.formData = { ...data };
        this.$refs.UpdateTpl.loadData(this.formData);
      });
    },
    _close() {
      this.formData = initFormData();
      this.$refs.UpdateTpl.loadData(this.formData); // 清空弹窗
      this.$refs.UpdateTpl._close();
    },
    /**
     * 任务操作
     * state 类型 1-完成 2-删除 3-关闭 4-取消完成 5-重启任务
     * msg 消息
     */
    handleState(state, msg) {
      this.$confirm(`是否确认${msg}任务`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 重启任务 - 5
          if (state === 5) {
            restartTask({
              taskId: this.formData.id,
            }).then(() => {
              this.loadData(this.formData);
              // 重新获取动态列表
              this.$refs.dynamic.pageOption.current = 1;
              this.$refs.dynamic.loadPage(true);
            });
          } else {
            operationTask({
              taskId: this.formData.id,
              type: state,
            }).then(() => {
              this.dialogShow = false;
              this._close();
              this.$emit("load_data", true);
            });
          }
        })
        .catch(() => {});
    },
    // 退出任务
    handleQuit() {
      this.$confirm("是否确认退出任务", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          exitTask({
            taskUserId: this.formData.taskUserId,
          }).then(() => {
            this.dialogShow = false;
            this._close();
            this.$emit("load_data", true);
          });
        })
        .catch(() => {});
    },
    // 完成任务回调
    refreshData() {
      this.loadData(this.formData);
      this.$refs.dynamic.loadData(this.formData.id);
      this.$emit("load_data", true);
    },
    // 完成任务
    handleChangeState() {
      this.$nextTick(() => {
        this.handleFinish(this.formData);
      });
    },
    // 同步至工场
    handlePublish() {
      publishWorkShop({ taskId: this.formData.id }).then(({ data }) => {
        if (data) {
          this.$message.success("已同步至工场");
          this.loadData(this.formData);
          this.$refs.popover.doClose();
        }
      });
    },
    handleDistribution() {
      this.$refs.distribute.open(this.formData.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog ::v-deep .el-dialog__body {
  padding-top: 0px;
}
.dialog-title {
  display: flex;
  justify-content: space-between;
  margin-right: 28px;
  line-height: 20px;
  .tag {
    width: 90px;
    height: 28px;
    line-height: 26px;
    border-radius: 5px;
    cursor: pointer;
    background: rgba(244, 245, 246, 1);
    position: relative;
    ::v-deep .el-checkbox__input {
      margin-right: 5px;
      width: 14px;
      height: 14px;
      .el-checkbox__inner {
        width: 14px;
        height: 14px;
      }
    }
    .Mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      z-index: 1;
    }
  }
  .left {
    .title {
      display: inline;
      margin-right: 15px;
    }
  }
  .right {
    i {
      font-size: 16px;
      font-weight: 200;
      color: $--color-text-secondary;
      cursor: pointer;
    }
  }
}
::v-deep .el-dialog__body {
  padding: 20px 30px;
}
.dialog-content {
  display: flex;
  height: 500px;
  border-top: 1px solid #f2f2f2;
  .left {
    width: calc(100% - 420px);
    border-right: 1px solid #f2f2f2;
  }
  .only-left {
    width: 100%;
  }
  .right {
    width: 420px;
  }
}
.popover-button-list {
  .button-item {
    padding: 0 0 10px;
    cursor: pointer;
    &:last-of-type {
      padding: 0;
    }
  }
}
.left ::v-deep .status {
  display: flex;
  align-items: center;
  margin: 20px 1px 30px;
  width: 99%;
  padding: 20px;
  height: 80px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  box-sizing: border-box;
}
</style>
