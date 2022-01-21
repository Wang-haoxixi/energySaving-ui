<template>
  <div class="share-message" :class="data.messageDirection===1?'right':'left'">
    <div class="avatar">
      <iep-img :resizeOpt="{l:40}" :src="getAvatar(data)"></iep-img>
    </div>
    <div class="message-inner">
      <div class="name">{{getName(data)}}</div>
      <div class="content" @click="handleLink(data)">
        <div class="title">{{content.cornerMark}}</div>
        <el-divider></el-divider>
        <!-- 能聘 -->
        <div class="box recruit" v-if="data.messageType===msgShareType[1]">
          <div class="title iep-ellipsis-2-flex" :title="content.name">{{trantfName(content.name)}}</div>
          <div class="other">
            <span
              class="salary"
            >{{content.salaryStart||content.salaryEnd?`${content.salaryStart} - ${content.salaryEnd}K`:"面议"}}</span>
            <span class="place">{{content.workplace}}</span>
          </div>
          <div class="info">
            <iep-img :src="content.avatar" :resizeOpt="{l:40}"></iep-img>
            <div>
              <div
                class="iep-ellipsis-flex"
                :title="content.realName+' / '+trantfName(content.position)"
              >
                {{content.realName}}
                <span>/</span>
                {{trantfName(content.position)}}
              </div>
              <div>{{content.soName}}</div>
            </div>
          </div>
        </div>
        <!-- 魔方 -->
        <div class="box product" v-else-if="data.messageType===msgShareType[2]">
          <div class="title iep-ellipsis-2-flex" :title="content.name">{{content.name}}</div>
          <div class="price">{{content.price}}</div>
          <iep-img :src="content.imageUrl" :resizeOpt="{w:300}"></iep-img>
        </div>
        <!-- 用户 -->
        <div class="box user" v-else-if="data.messageType===msgShareType[3]">
          <iep-img :src="content.avatar" :resizeOpt="{w:40}"></iep-img>
          <div class="info">
            <div class="name iep-ellipsis-flex" :title="content.realName">{{content.realName}}</div>
            <div
              class="position iep-ellipsis-flex"
              :title="content.industry+' / '+content.position"
            >
              <span>{{content.industry}}</span>
              <span>&nbsp;/&nbsp;</span>
              <span>{{content.position}}</span>
            </div>
          </div>
        </div>
        <!-- 组织 -->
        <div class="box org" v-else-if="data.messageType===msgShareType[4]">
          <iep-img :src="content.avatar" :resizeOpt="{w:40}"></iep-img>
          <div class="info">
            <div class="name iep-ellipsis-flex" :title="content.name">{{content.name}}</div>
            <div class="slogan iep-ellipsis-flex" :title="content.slogan">{{content.slogan}}</div>
          </div>
        </div>
        <!-- 文章 -->
        <div class="box article" v-else-if="data.messageType===msgShareType[5]">
          <div
            class="title iep-ellipsis-2-flex"
            :title="content.materialName"
          >{{content.materialName}}</div>
          <div
            class="intro iep-ellipsis-2-flex"
            :title="content.materialIntro"
          >{{content.materialIntro}}</div>
        </div>
        <!-- 考试 -->
        <div class="box exam" v-else-if="data.messageType===msgShareType[6]">
          <div class="title iep-ellipsis-2-flex" :title="content.examName">{{content.examName}}</div>
          <div class="text">{{content.orgName}}</div>
          <div class="other">
            <span class="icon-warp">
              <i class="iconfont el-icon-woneng-touxiang"></i>
            </span>
            <span class="num">{{content.testNumber}}人参与</span>
            <span class="time">{{content.examTime}}</span>
          </div>
        </div>
        <!-- 活动 -->
        <div class="box activity" v-else-if="data.messageType===msgShareType[7]">
          <div class="title iep-ellipsis-2-flex">{{content.name}}</div>
          <iep-img :src="content.poster" :resizeOpt="{w:300}"></iep-img>
          <div class="place iep-ellipsis-flex" :title="content.place">{{content.place}}</div>
          <div class="start-time">{{content.startTime}}</div>
        </div>
        <!-- 任务 -->
        <div class="box task" v-else-if="data.messageType===msgShareType[8]">
          <div class="title iep-ellipsis-2-flex">{{content.title}}</div>
          <div class="other">
            <span>
              <i class="el-icon-woneng-touxiang"></i>
              {{content.taskUserNum}}人加入
            </span>
            <span>
              <i class="el-icon-woneng-gengduo1-sx iep-green"></i>
              进度：{{content. completionRate}}
            </span>
          </div>
        </div>
        <!-- 问卷 -->
        <div class="box ques" v-else-if="data.messageType===msgShareType[9]">
          <div class="title iep-ellipsis-2-flex">{{content.name}}</div>
          <div class="info">
            <span class="join-people">
              <i class="el-icon-woneng-touxiang"></i>
              {{ content.joinPeople }}人参与
            </span>
            <span class="award-number" v-if="content.awardNumber">
              <i class="el-icon-woneng-caiwu1"></i>
              {{content.awardNumber}}贝
            </span>
          </div>
          <div class="time">{{content.timeRange}}</div>
        </div>
      </div>
    </div>
    <ExamViewDialog ref="ExamViewDialog"></ExamViewDialog>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { msgShareType, shareTypeList } from "../options";
import ExamViewDialog from "@/views/exam/examList/Page/Components/ExamViewDialog.vue";
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  components: {
    ExamViewDialog,
  },
  data() {
    return {
      shareTypeList,
      msgShareType,
    };
  },
  computed: {
    ...mapState({
      infoMap: (state) => state.imc.infoMap,
    }),
    content() {
      return this.data.content;
    },
  },
  methods: {
    ...mapMutations({
      setDialogShow: "SET_DIALOGSHOW",
    }),
    ...mapActions(["getMsgUserOrgInfo"]),
    getAvatar(item) {
      const { senderUserId } = item;
      const type = 1;
      const index = JSON.stringify({ id: senderUserId, type: type || 1 });
      const avatar = this.infoMap.avatar[index];
      if (!avatar) {
        this.getMsgUserOrgInfo({ targetId: senderUserId, type });
      }
      return avatar;
    },
    getName(item) {
      const { senderUserId } = item;
      const type = 1;
      const index = JSON.stringify({ id: senderUserId, type: type || 1 });
      const name = this.infoMap.name[index];
      if (!name) {
        this.getMsgUserOrgInfo({ targetId: senderUserId, type });
      }
      return name;
    },
    handleLink(item) {
      const type = item.messageType;
      switch (type) {
        case msgShareType["1"]:
          //能聘
          this.$openPage(
            item.content.canType === "0"
              ? `/channel/recruit_detail/${item.content.recruitId}`
              : `/channel/partner_detail/${item.content.recruitId}`,
          );
          break;
        case msgShareType["2"]:
          //魔方
          this.$openPage(`/channel/mo_fang/detail/${item.content.productId}`);
          break;
        case msgShareType["3"]:
          //用户
          this.$openPage(`/channel/styles/user/${item.content.userId}/index`);
          break;
        case msgShareType["4"]:
          //组织
          this.$openPage(`/channel/styles/so/${item.content.orgId}/index`);
          break;
        case msgShareType["5"]:
          //文章
          this.$openPage(`/channel/material/detail/${item.content.materialId}`);
          break;
        case msgShareType["6"]:
          //考试
          this.$refs["ExamViewDialog"].id = item.content.examId;
          this.$refs["ExamViewDialog"].dialogShow = true;
          break;
        case msgShareType["7"]:
          //活动
          this.$openPage(`/channel/activity/detail/${item.content.activityId}`);
          break;
        case msgShareType["8"]:
          //任务
          this.$openPage(`/channel/task_detail/${item.content.taskId}`);
          break;
        case msgShareType["9"]:
          //问卷
          this.$openPage(`/questionnaire_edit/${item.content.quesId}`, 2);
          break;
        default:
          this.$message.info("暂不识别此类型");
          break;
      }
      if (
        ["1", "2", "3", "4", "5", "7", "8"]
          .map((m) => msgShareType[m])
          .includes(type)
      ) {
        this.setDialogShow(false);
      }
    },
    trantfName(val) {
      const list = val.split("-");
      return list[list.length - 1];
    },
  },
};
</script>
<style lang="scss" scoped>
.share-message {
  display: flex;
  &.left {
    flex-direction: row;
    .message-inner {
      align-items: flex-start;
    }
  }
  &.right {
    flex-direction: row-reverse;
    .message-inner {
      align-items: flex-end;
    }
  }
  .avatar {
    margin-top: 10px;
    width: 40px;
    height: 40px;
    img {
      width: 100%;
      height: 100%;
      font-family: "微软雅黑";
      border-radius: $--border-radius-base;
      color: $--color-text-primary;
    }
  }
  .message-inner {
    flex: 1;
    margin: 5px 10px;
    display: flex;
    flex-direction: column;
  }
  .name {
    color: $--color-text-secondary;
    margin-bottom: 5px;
  }
  .content {
    width: 300px;
    border-radius: $--border-radius-base;
    padding: 20px;
    background: #ffffff;
    overflow: hidden;
    cursor: pointer;
    .title {
      color: $--color-text-primary;
      font-size: 16px;
    }
    .box {
      .title {
        margin-bottom: 10px;
      }
      .text {
        font-size: 14px;
        color: $--color-text-secondary;
        height: 50px;
      }
      &.recruit {
        .other {
          margin-bottom: 15px;
          .salary {
            font-size: 16px;
            color: $--color-primary;
            margin-right: 20px;
          }
          .place {
            color: $--color-text-secondary;
          }
        }
        .info {
          display: flex;
          align-items: center;
          .iep-image {
            width: 40px;
            height: 40px;
            margin-right: 10px;
          }
          & > div:nth-of-type(2) {
            flex: 1;
            & > div:first-of-type {
              font-size: 14px;
              margin-bottom: 5px;
              span {
                color: $--border-color;
                margin: 0 2px;
              }
            }
            & > div:last-of-type {
              color: $--color-text-secondary;
            }
          }
        }
      }
      &.product {
        .iep-image {
          width: 300px;
          height: 180px;
          border-radius: $--border-radius-base;
          overflow: hidden;
          ::v-deep img {
            width: 100%;
          }
        }
        .price {
          margin-bottom: 10px;
          font-size: 14px;
          color: $--color-primary;
        }
      }
      &.user,
      &.org {
        display: flex;
        align-items: center;
        .iep-image {
          width: 40px;
          height: 40px;
          margin-right: 10px;
        }
        .info {
          flex: 1;
          .name {
            color: $--color-text-regular;
            font-size: 14px;
          }
          .position,
          .slogan {
            color: $--color-input-regular;
          }
        }
      }
      &.article {
        .intro {
          font-size: 14px;
          color: $--color-text-secondary;
        }
      }
      &.exam {
        .other {
          color: $--color-text-secondary;
          font-size: 12px;
          .icon-warp {
            margin-right: 5px;
            .iconfont {
              color: $--color-input-regular;
              font-size: 14px;
              vertical-align: text-bottom;
            }
          }
          .num {
            margin-right: 18px;
          }
          .time {
            margin-right: 9px;
          }
        }
      }
      &.activity {
        color: $--color-text-secondary;
        .iep-image {
          width: 300px;
          height: 180px;
          border-radius: $--border-radius-base;
          overflow: hidden;
          ::v-deep img {
            width: 100%;
          }
        }
        .place {
          margin-top: 10px;
        }
        .start-time {
          margin-top: 5px;
        }
      }
      &.task {
        .other {
          display: flex;
          justify-content: space-between;
          i {
            vertical-align: text-bottom;
          }
        }
      }
      &.ques {
        color: $--color-text-secondary;
        .info {
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;
          i {
            vertical-align: text-bottom;
          }
          .award-number {
            color: $--color-primary;
          }
        }
      }
    }
  }
  .el-divider--horizontal {
    margin: 15px 0;
  }
}
</style>