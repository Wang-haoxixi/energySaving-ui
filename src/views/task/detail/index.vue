<template>
  <div class="left">
    <div class="head">
      <div class="title">
        <div class="name">{{formData.title}}</div>
        <div class="title-icon" v-if="formData.isOfficial === '1'">
          <i class="el-icon-woneng-icon_guanfang"></i>
        </div>
        <div class="urgency">{{urgency[formData.urgency]}}</div>
      </div>
      <div class="icon">
        <!-- <div class="code">
              <i class="el-icon-woneng-yanjing1"></i>
              {{formData.views}}
        </div>-->
        <div class="code" @click="handleCollect" v-if="false">
          <i class="el-icon-woneng-xingxing"></i>收藏
        </div>
        <div class="code">
          <iep-button class="iep-back-btn" @click="handleDetail">返回</iep-button>
        </div>
      </div>
    </div>
    <el-card class="card">
      <div class="state">
        <i :class="[taskStateObj.icon, taskStateObj.color]"></i>
        <div>{{taskStateObj.name}}</div>
      </div>
      <div class="speed">
        <div class="top">
          <div class="finish-time" v-if="formData.type === '0'">截止时间：{{formData.finishTime}}</div>
          <div class="finish-time" v-else>
            <span v-if="formData.type === '4'">重复任务：每{{formData.cycle}}天重复任务</span>
            <span v-else>重复任务：{{repeatList[formData.type]}}</span>
            <span style="margin-left: 17px;">已重复{{formData.repeatTime}}次</span>
          </div>
          <!-- 截止时间 当任务为完成状态的时候，不显示 -->
          <div
            class="surplus-time"
            :class="formData.timeDifference.state ? 'red' : formData.timeDifference.day === 0 ? 'orange' : 'green'"
            v-if="formData.taskState !== '1' && formData.type === '0'"
          >
            <span>{{formData.timeDifference.state ? '逾期' : '剩余'}}</span>
            <span v-if="formData.timeDifference.day > 0">{{formData.timeDifference.day}}天</span>
            <span v-else>{{formData.timeDifference.hour}}时</span>
          </div>
        </div>
        <div class="progress">
          <el-progress :percentage="formData.plan"></el-progress>
        </div>
      </div>
    </el-card>
    <div class="content">
      <!-- 归属SO -->
      <div class="form-item" v-if="formData.orgName">
        <div class="form-label form-label-describe">
          <i class="el-icon-woneng-so"></i>归属组织
        </div>
        <div class="form-span">{{formData.orgName}}</div>
      </div>
      <!-- 描述 -->
      <div class="desc form-item">
        <div class="form-label form-label-describe">
          <i class="iconfont el-icon-woneng-dingdan"></i>描述
        </div>
        <div class="form-span" v-html="formData.description || '暂无'"></div>
      </div>
      <!-- 协作人 -->
      <div class="collaborator form-item">
        <div class="form-label form-label-xiezuoren">
          <i class="iconfont el-icon-woneng-xiezuoren"></i>协作人
        </div>
        <div class="form-span">
          <div class="user-list">
            <div
              class="user-info"
              v-for="(item, index) in formData.cooperationTaskUserVOList.slice(0, personHidden ? 5 : formData.countNum)"
              :key="index"
              :title="item.userRealName"
            >
              <iep-img :src="item.avatar" class="user-avatar" :title="item.name"></iep-img>
              <i
                class="el-icon-woneng-touxiangshixin i-avatar"
                v-if="item.userId === formData.publisher"
              ></i>
            </div>
            <div
              class="coop-hidden"
              v-if="formData.countNum > 5"
              @click="handleGetCoop"
            >{{personHidden ? "展开" : "收拢"}}</div>
          </div>
        </div>
      </div>
      <!-- 奖励分配 -->
      <div class="form-item" v-if="formData.allocationType !== '0'">
        <div class="form-label form-label-reward">
          <i class="iconfont el-icon-woneng-qian1"></i>奖励分配
        </div>
        <div class="form-span reward">
          <div class="reward-item mode">{{rewardTips[formData.allocationType].name}}</div>
          <div
            class="reward-item amount"
            v-if="formData.allocationType === '2'"
          >{{formData.allocationAmount}}贝</div>
          <el-tooltip placement="top">
            <div slot="content" v-html="rewardTips[formData.allocationType].tip"></div>
            <i class="icon-info el-icon-info"></i>
          </el-tooltip>
          <el-button
            type="primary"
            class="reward-button"
            @click="openTips"
            v-if="formData.isOfficial === '0'"
          >风险提示</el-button>
        </div>
      </div>
      <!-- 关联元素 -->
      <div class="desc form-item" v-if="formData.material.length > 0">
        <div class="form-label form-label-describe">
          <i class="iconfont el-icon-woneng-guanlian1"></i>关联内容
        </div>
        <div class="form-span relation">
          <!-- 材料 -->
          <div class="material relation-card" v-if="formData.relation.material.length > 0">
            <div class="card-title">关联的材料</div>
            <div
              class="item"
              v-for="(item, index) in formData.relation.material"
              :key="`material-${index}`"
              @click="detailMaterial(item, 'material')"
            >
              <i class="el-icon-woneng-wendang"></i>
              <div class="title">{{item.name}}</div>
            </div>
          </div>
          <!-- 纪要 -->
          <div class="summary relation-card" v-if="formData.relation.summary.length > 0">
            <div class="card-title">关联的纪要</div>
            <div
              class="item"
              v-for="(item, index) in formData.relation.summary"
              :key="`summary-${index}`"
              @click="detailMaterial(item, 'summary')"
            >
              <i class="el-icon-woneng-jiyao"></i>
              <div class="title">{{item.name}}</div>
            </div>
          </div>
          <!-- 问卷 -->
          <div
            class="questionnaire relation-card"
            v-if="formData.relation.questionnaire.length > 0"
          >
            <div class="card-title">关联的问卷</div>
            <div
              class="item"
              v-for="(item, index) in formData.relation.questionnaire"
              :key="`questionnaire-${index}`"
              @click="detailMaterial(item, 'questionnaire')"
            >
              <i class="el-icon-woneng-wenjuan"></i>
              <div class="title">{{item.name}}</div>
            </div>
          </div>
          <!-- 活动 -->
          <div class="activity relation-card" v-if="formData.relation.activity.length > 0">
            <div class="card-title">关联的活动</div>
            <div
              class="item"
              v-for="(item, index) in formData.relation.activity"
              :key="`activity-${index}`"
              @click="detailMaterial(item, 'activity')"
            >
              <i class="el-icon-woneng-huodong"></i>
              <div class="title">{{item.name}}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 所有动态 -->
      <div class="form-item" v-if="formData.isOfficial === '0' && !isOfficial">
        <div class="form-label form-label-describe">
          <i class="el-icon-woneng-dongtai"></i>所有动态
        </div>
      </div>
    </div>
    <div class="comment-tpl" v-if="formData.isOfficial === '0' && !isOfficial">
      <CommentTpl :taskId="formData.id"></CommentTpl>
    </div>
  </div>
</template>

<script>
import {
  urgency,
  relationType,
  taskState,
  repeatList,
  routeList,
  rewardTips,
} from "./options";
import { timeDifference } from "@/util/date";
import { getDetailById } from "@/api/qms/cooperation_list";
import {
  getTaskUser,
  applyJoin,
  operationTask,
} from "@/api/qms/cooperation_task";
import { mapGetters } from "vuex";
import CommentTpl from "./comment";
import { createCollection } from "@/api/dms/collection";

export default {
  props: {
    isBack: {
      type: Boolean,
      default: false,
    },
    // 父级组件是否是运维工作台
    isOfficial: {
      type: Boolean,
      default: false,
    },
  },
  components: { CommentTpl },
  computed: {
    taskStateObj() {
      return taskState[this.formData.taskState];
    },
    ...mapGetters(["userInfo"]),
  },
  data() {
    return {
      rewardTips,
      repeatList,
      urgency,
      formData: {
        cooperationTaskUserVOList: [],
        views: 0,
        taskState: 0,
        relation: {
          activity: [],
          material: [],
          summary: [],
          questionnaire: [],
        },
        timeDifference: { day: 0 },
        material: [],
        authority: 0,
        allocationType: "0",
      },
      personHidden: true,
    };
  },
  methods: {
    loadData(id) {
      getDetailById({ taskId: id }).then(({ data }) => {
        const row = Object.assign({}, this.formData, { ...data });
        const relationList = {
          activity: [],
          material: [],
          summary: [],
          questionnaire: [],
        };
        for (const item of row.material) {
          relationList[relationType[item.type]].push(item);
        }
        row.relation = relationList;
        row.timeDifference = timeDifference(row.finishTime);
        this.formData = { ...row };
        this.$emit("changeOrg", row.orgId);
      });
    },
    // 获取更多协作人
    handleGetCoop() {
      this.personHidden = !this.personHidden;
      if (
        this.formData.cooperationTaskUserVOList.length !==
          this.formData.countNum &&
        this.personHidden === false
      ) {
        getTaskUser({
          taskId: this.formData.id,
        }).then(({ data }) => {
          this.$set(
            this.formData,
            "cooperationTaskUserVOList",
            data.map((m) => {
              m.id = m.userId;
              m.name = m.userRealName;
              return m;
            }),
          );
        });
      }
    },
    handleSignUp() {
      this.$confirm("是否确认报名此任务", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {});
    },
    // 加入任务
    handleJoin() {
      this.$prompt("请填写申请理由", "是否确认申请加入此任务", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(({ value }) => {
        applyJoin({
          applyReason: value,
          taskId: this.formData.id,
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
    handleDetail() {
      if (this.$route.params.id) {
        if (window.history.length > 1) {
          this.$router.go(-1);
        }
      } else {
        this.$emit("backPage");
      }
    },
    // 关联元素详情查看
    detailMaterial(row, type) {
      if (this.formData.authority) {
        this.$openPage(routeList[type] + row.id, 2);
      } else {
        this.$message.warning("只有任务成员才能查看关联元素");
      }
    },
    handleFinish() {
      const fn = (row) => {
        operationTask(row).then(() => {
          this.loadData(this.formData.id);
        });
      };
      if (
        this.formData.type !== "0" &&
        this.formData.publisher === this.userInfo.userId
      ) {
        this.$confirm("是否完成重复任务？", "提示", {
          distinguishCancelAndClose: true,
          confirmButtonText: "仅完成一次",
          cancelButtonText: "不再重复",
          type: "warning",
        })
          .then(() => {
            fn({
              type: 1,
              taskId: this.formData.id,
              repeatType: 1,
            });
          })
          .catch((action) => {
            if (action === "cancel") {
              fn({
                type: 1,
                taskId: this.formData.id,
                repeatType: 2,
              });
            }
          });
      } else {
        // 普通成员
        this.$confirm(`是否确认完成任务：${this.formData.title}`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            fn({
              type: 1,
              taskId: this.formData.id,
            });
          })
          .catch(() => {});
      }
    },
    // 收藏
    handleCollect() {
      createCollection({
        targetId: this.formData.id,
        type: 3,
        name: this.formData.title,
      }).then(({ data }) => {
        if (data) {
          this.$message.success("收藏成功！");
        }
      });
    },
    openTips() {
      this.$alert(
        "<div>1、该奖励任务以个人名义进行发布，加入任务时请注意规避风险；</div><div>2、若后续对分配的奖励有异议，建议直接与任务发布人联系；</div>",
        "风险提示",
        {
          dangerouslyUseHTMLString: true,
          showConfirmButton: false,
          showCancelButton: true,
          cancelButtonText: "我知道了",
        },
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.left {
  width: 100%;
  min-height: 200px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  .head {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    .title {
      display: flex;
      width: calc(100% - 170px);
      .name {
        font-size: 24px;
        max-width: calc(100% - 100px);
        margin-right: 10px;
        text-align: justify;
      }
      .title-icon {
        margin-right: 5px;
        line-height: 28px;
        i {
          font-size: 18px;
          color: $--color-secondary;
        }
      }
      .urgency {
        font-size: 12px;
        padding: 0 6px;
        color: #f74437;
        background-color: #feeceb;
        height: 20px;
        line-height: 20px;
        margin-top: 4px;
        border-radius: 5px;
      }
    }
    .icon {
      width: 170px;
      display: flex;
      justify-content: flex-end;
      .code {
        margin-left: 15px;
        font-size: 14px;
        line-height: 36px;
        color: $--color-text-secondary;
        cursor: pointer;
        i {
          margin-right: 5px;
          color: $--color-text-secondary;
        }
        &:hover {
          color: #f74437;
        }
        &:hover i {
          color: #f74437;
        }
        .iep-back-btn {
          height: 36px;
        }
      }
    }
  }
  .card {
    &::v-deep .el-card__body {
      display: flex;
      justify-content: space-between;
    }
    .state {
      display: flex;
      width: 100px;
      .blue {
        color: $--color-secondary;
      }
      .red {
        color: $--color-primary;
      }
      .green {
        color: $--color-third;
      }
      .gray {
        color: $--color-text-regular;
      }
      i {
        font-size: 39px;
        margin-right: 10px;
      }
      > div {
        line-height: 39px;
      }
    }
    .speed {
      width: calc(100% - 150px);
      .top {
        display: flex;
        justify-content: space-between;
        .finish-time {
          font-size: 14px;
          color: $--color-text-secondary;
          span {
            color: #babec0;
          }
        }
        .surplus-time {
          font-size: 14px;
        }
        .red {
          color: $--color-primary;
        }
        .green {
          color: $--color-third;
        }
        .orange {
          color: #ff9667;
        }
      }
    }
  }
  .content {
    margin-top: 30px;
    margin-bottom: 30px;
    .form-item {
      margin-bottom: 15px;
      font-size: 14px;
      &:last-of-type {
        margin-bottom: 20px;
      }
      display: flex;
      .form-label {
        font-size: 14px;
        color: $--color-text-secondary;
        width: 120px;
        i {
          position: relative;
          top: 1px;
          font-size: 18px;
          margin-right: 10px;
          color: #666769;
        }
      }
      .form-label-xiezuoren {
        position: relative;
        top: 14px;
      }
      .form-label-reward {
        line-height: 36px;
      }
      .form-span {
        font-family: "微软雅黑";
        color: $--color-text-primary;
        width: calc(100% - 120px);
        pre {
          margin: 0;
        }
        .user-list {
          display: flex;
          flex-wrap: wrap;
          .user-info {
            margin-right: 16px;
            margin-bottom: 16px;
            position: relative;
            .user-avatar {
              width: 50px;
              height: 50px;
              border-radius: 10px;
              border: 1px solid $--border-color;
            }
            .i-avatar {
              position: absolute;
              bottom: -9px;
              right: -9px;
              color: $--color-secondary;
              font-size: 20px;
              opacity: 1;
              background-color: #fff;
              border-radius: 50%;
            }
          }
          .coop-hidden {
            line-height: 50px;
            font-size: 14px;
            color: $--color-primary;
            cursor: pointer;
          }
        }
      }
      .relation {
        .relation-card {
          border: 1px solid $--border-color;
          border-radius: 10px;
          padding-bottom: 10px;
          margin-bottom: 10px;
          .card-title {
            font-size: 14px;
            color: #666769;
            padding: 20px 20px 5px;
          }
          .item {
            padding: 5px 20px;
            display: flex;
            align-items: center;
            cursor: pointer;
            i {
              width: 20px;
              line-height: 22px;
            }
            .title {
              width: calc(100% - 20px);
              font-size: 14px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              word-break: break-all;
              color: $--color-text-regular;
            }
          }
        }
      }
      .reward {
        display: flex;
        line-height: 36px;
        .reward-item {
          margin-right: 20px;
        }
        .reward-button {
          margin-left: 20px;
        }
        .icon-info {
          margin-top: 11px;
        }
      }
    }
  }
}
</style>
