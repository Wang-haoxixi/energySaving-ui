<template>
  <iep-basic-container class="report-details">
    <iep-page-header title="举报详情" :backOption="backOption" v-if="!isDialog"></iep-page-header>
    <div class="content">
      <div class="title">被投诉内容</div>
      <component class="report-detail" v-bind:is="tabComponent" :data="componentData"></component>
    </div>
    <div class="content">
      <div class="title">投诉详情</div>
      <div class="form">
        <div class="item" v-for="(item, index) in formOptions" :key="index">
          <div class="label">{{item.label}}：</div>
          <div class="span" v-if="item.type === 'dict'">{{dictsMap[item.value][data[item.value]]}}</div>
          <div class="span" v-else>{{data[item.value]}}</div>
        </div>
      </div>
      <div class="footer-button" v-if="!noFooter">
        <iep-button
          class="button iep-btn-m"
          type="primary"
          @click="handleDeal(button)"
          v-for="(button, bIndex) in detailTypeList[data.tipOffType].buttonList"
          :key="bIndex"
          :loading="loadState"
        >{{button.name}}</iep-button>
        <iep-button
          class="button iep-btn-m"
          type="primary"
          @click="handleClose"
          :loading="loadState"
        >关闭投诉</iep-button>
      </div>
    </div>
  </iep-basic-container>
</template>

<script>
import { mapGetters } from "vuex";
import { dictsMap } from "../options";
import { formOptions, detailTypeList } from "./options";
// 模板
import noDataTpl from "./components/noDataTpl";
import ThoughtTpl from "./components/thought";
import ReplyTpl from "./components/reply";
import CommentTpl from "./components/comment";
import MaterialTpl from "./components/material";
import QuestionTpl from "./components/question";
import TaskTpl from "./components/task";
import ActivityTpl from "./components/activity";
import SoTpl from "./components/so";
import UserTpl from "./components/user";
import TaskComment from "./components/taskComment";
import ExamTpl from "./components/exam";
// 接口
import {
  getDataById,
  handleClose,
  lockUnlockUser,
} from "@/api/dms/tip_off_manage";
import {
  lowerShelfById,
  thoughtCommentShield,
  thoughtReplyShield,
} from "@/api/dms/thoughts";
import { materialReportHandling } from "@/api/dms/material";
import { questionDismount } from "@/api/qms/questionnaire";
import { reportTask } from "@/api/qms/cooperation_task";
import { reportComment } from "@/api/qms/cooperation_comment";
import { reportDealById } from "@/api/qms/exam_examination";
import { violationHandling } from "@/api/meetting/publish";

export default {
  props: {
    // 用于标记是否为外部弹窗使用，若是，需要将不必要的按钮、抬头等都去掉
    isDialog: {
      type: Boolean,
      default: false,
    },
    noFooter: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    noDataTpl,
    ThoughtTpl,
    ReplyTpl,
    CommentTpl,
    MaterialTpl,
    QuestionTpl,
    TaskTpl,
    ActivityTpl,
    SoTpl,
    UserTpl,
    TaskComment,
    ExamTpl,
  },
  data() {
    return {
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.$emit("back_page", false);
        },
      },
      formOptions,
      detailTypeList,
      data: {
        tipOffType: 0,
      },
      loadState: false,
      tabComponent: "noDataTpl",
      componentData: {},
    };
  },
  computed: {
    ...mapGetters(["dictGroup"]),
    dictsMap() {
      const data = { ...dictsMap };
      const obj = {};
      for (const item of this.dictGroup.get("dms_report_content_type") || []) {
        obj[item.value] = item.label;
      }
      data.tipOffType = obj;
      const obj1 = {};
      for (const item of this.dictGroup.get("dms_report_type") || []) {
        obj1[item.value] = item.label;
      }
      data.tipOffReason = obj1;
      return data;
    },
  },
  methods: {
    lowerShelfById,
    thoughtCommentShield,
    thoughtReplyShield,
    materialReportHandling,
    questionDismount,
    reportDealById,
    loadData(row) {
      getDataById(row.id).then(({ data }) => {
        const componentDetail = detailTypeList[data.tipOffType];
        this.data = { ...data };
        this.componentData = data[componentDetail.voName];
        this.tabComponent = componentDetail.component;
        if (this.isDialog) {
          // 不同类型的举报按钮文字不同，需要返给父级
          this.$emit("load_msg", {
            obj: detailTypeList[data.tipOffType].buttonList,
            type: this.data.tipOffType,
          });
        }
      });
    },
    // 关闭举报
    handleClose() {
      handleClose(this.data.id).then(({ data }) => {
        if (data) {
          this.$message.success("举报已关闭");
          this.$emit("back_page", true);
        }
      });
    },
    // 处理举报
    handleDeal(row) {
      if (row.type === 1 || row.type === 2) {
        const dealList = {
          1: "toDealWith",
          2: "offTheShel",
        };
        this[dealList[row.type]](row);
      } else {
        this[row.fn](row);
      }
    },
    toDealWith(row) {
      this.$router.push({
        path: row.url + this.data[row.params],
      });
    },
    offTheShel(row) {
      this.$confirm(row.tips, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // this[row.requestFn](row);
          this.handleRequest(row);
        })
        .catch(() => {});
    },
    handleRequest(row) {
      this.loadState = true;
      this[row.requestFn](this.data.tipOffContentId).then(({ data }) => {
        this.loadState = false;
        if (data) {
          this.$message.success(row.success);
          this.$emit("back_page", true);
        }
      });
    },
    // 锁定用户
    lockUnlockUser() {
      this.$confirm("是否确认锁定此用户", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          lockUnlockUser({
            reportId: this.data.id,
            userId: this.data.tipOffContentId,
          }).then(({ data }) => {
            if (data) {
              this.$message.success("锁定用户成功！");
              this.$emit("back_page", true);
            }
          });
        })
        .catch(() => {});
    },
    // 下架任务
    OffTheShelfTask() {
      this.$confirm("是否确认下架此任务", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reportTask({
            taskId: this.data.tipOffContentId,
            type: 1,
          }).then(({ data }) => {
            if (data) {
              this.$message.success("下架任务成功！");
              this.$emit("back_page", true);
            }
          });
        })
        .catch(() => {});
    },
    // 下架任务评论
    reportComment() {
      this.$confirm("是否确认下架此评论", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reportComment({
            commentId: this.data.tipOffContentId,
            type: 1,
          }).then(({ data }) => {
            if (data) {
              this.$message.success("下架评论成功！");
              this.$emit("back_page", true);
            }
          });
        })
        .catch(() => {});
    },
    // 活动下架
    dismountPublish() {
      this.$confirm("是否确认下架活动", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.loadState = true;
          violationHandling({
            id: this.data.tipOffContentId,
            type: 5,
          }).then(({ data }) => {
            this.loadState = false;
            if (data) {
              this.$message.success("下架成功");
              this.$emit("back_page", true);
            }
          });
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  font-size: 14px;
  line-height: 32px;
  margin-bottom: 10px;
  .title {
    margin-bottom: 10px;
    // padding-left: 10px;
    font-size: 14px;
    font-family: "微软雅黑";
    color: $--color-text-primary;
  }
  .report-detail {
    border: 1px solid $--border-color;
    border-radius: $--border-radius-base;
    padding: 10px;
  }
  ::v-deep .examine-container {
    margin-bottom: 20px;
    overflow-y: scroll;
    max-height: 600px;
    min-height: auto;
    background: none;
  }
  .form {
    .item {
      display: flex;
      margin-bottom: 10px;
      .label {
        width: 80px;
        text-align: right;
        margin-right: 5px;
      }
      .span {
        width: calc(100% - 100px);
      }
    }
  }
  .footer-button {
    margin-top: 40px;
    border-top: 1px solid $--border-color;
    padding-top: 20px;
    text-align: right;
    .button {
      font-size: 14px;
      border-radius: $--border-radius-base;
      margin-left: 10px;
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
.report-details ::v-deep .title-wrapper,
.report-details ::v-deep .title-col {
  float: none !important;
}
::v-deep .iep-image {
  border: 1px solid $--border-color;
}
</style>
