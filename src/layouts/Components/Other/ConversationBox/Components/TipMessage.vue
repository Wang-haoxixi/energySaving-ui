<template>
  <div class="tip-message">
    <div class="title">
      <div class="sender-box">
        <div class="img">
          <iep-img :src="tipItem.senderAvatar" :alt="tipItem.title" />
        </div>
        <div class="content-box">
          <div class="content">
            <div class="name">{{tipItem.senderName}}</div>
            <div class="sub-title">
              <el-link :underline="false" @click="handleOpen(tipItem)">
                {{tipItem.title}}
                <i
                  v-if="ALLIDS.includes(tipItem.type)"
                  class="el-icon-top-right el-icon--right"
                ></i>
              </el-link>
            </div>
            <div class="send-time">{{tipItem.time}}</div>
          </div>
          <i class="opt" :class="[opt,color]"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import {
  is聊天,
  isMofang,
  isMofangDetail,
  isSoWel,
  is说说,
  is问卷列表,
  isTask,
  is会议,
  is问卷详情,
  is活动,
  is考试,
  is课程,
  ALLIDS,
} from "./options";
export default {
  props: {
    // sentTime,
    // content.content,
    // messageUId
    tipItem: {
      type: Object,
      required: true,
    },
  },
  inject: ["reload"],
  data() {
    return {
      ALLIDS,
      opt: "el-icon-woneng-yidu1",
      color: "gray",
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    ...mapMutations({
      setDialogShow: "SET_DIALOGSHOW",
    }),
    ...mapActions(["orgChangeAction", "imcOpenConversionByTargetId"]),

    handleFinish() {
      this.setDialogShow(false);
      this.reload();
    },
    // 切换组织
    async orgChange({ dataId }) {
      if (dataId !== this.userInfo.orgId) {
        await this.orgChangeAction(dataId);
      }
    },
    async handleOpen(item) {
      // console.log(item);
      if (is聊天(item.type)) {
        this.imcOpenConversionByTargetId({
          targetId: item.senderId + "",
          type: 1,
        });
        // console.log("去聊天");
      } else if (isMofang(item.type)) {
        await this.orgChange(item);
        this.$openPage("/cpms/product");
        this.handleFinish();
        // console.log("去魔方列表");
      } else if (isMofangDetail(item.type)) {
        this.$openPage(`/channel/mo_fang/detail/${item.dataId}`);
        this.handleFinish();
        // console.log("去魔方详情");
      } else if (isSoWel(item.type)) {
        await this.orgChange(item);
        this.$openPage("/wel/index");
        this.handleFinish();
        // console.log("so赋能台");
      } else if (is说说(item.type)) {
        this.$openPage(`/thought/thought_detail/${item.dataId}`);
        this.handleFinish();
        // console.log("去说说");
      } else if (isTask(item.type)) {
        this.$openPage(`/channel/task_detail/${item.dataId}`);
        this.handleFinish();
        // console.log("去任务");
      } else if (is问卷列表(item.type)) {
        await this.orgChange(item);
        this.$openPage("/ques/questionnaire_my");
        this.handleFinish();
        // console.log("去问卷列表");
      } else if (is会议(item.type)) {
        this.$openPage(`/mlms/summary_detail/${item.dataId}`);
        this.handleFinish();
        // console.log("去会议");
      } else if (is问卷详情(item.type)) {
        this.$openPage(`/questionnaire_edit/${item.dataId}`, 2);
        this.handleFinish();
        // console.log("去问卷详情");
      } else if (is活动(item.type)) {
        await this.orgChange(item);
        this.$openPage(`/meetting/admin`);
        this.handleFinish();
      } else if (is考试(item.type)) {
        // console.log("去考试", item);
        this.$emit("openExamDialog", item);
      } else if (is课程(item.type)) {
        this.$openPage(`/channel/course/detail/${item.dataId}`);
        this.handleFinish();
      } else {
        console.log("其他类型未确认");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.tip-message {
  display: flex;
  flex-direction: column;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .sender-box {
      display: flex;
      align-items: flex-start;
      width: 100%;
      .img {
        margin-top: 5px;
        min-width: 36px;
        width: 36px;
        height: 36px;
      }
      .name {
        font-size: 12px;
        color: $--color-text-regular;
      }
    }
    .send-time {
      min-width: 115px;
      color: $--color-text-secondary;
    }
  }
  .content-box {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: calc(100% - 56px);
    margin: 0 0 0 20px;
    padding: 10px;
    min-height: 38px;
    font-family: "微软雅黑";
    color: $--color-text-primary;
    background-color: #fff;
    border-radius: $--border-radius-base;
    box-sizing: border-box;
  }
  .content {
    display: flex;
    flex-direction: column;
    &::before {
      content: "";
      position: absolute;
      width: 10px;
      height: 10px;
      left: -7px;
      top: 2px;
      border-width: 0 4px 10px 0;
      border-style: solid;
      border-right-color: transparent;
      border-bottom-color: #fff;
      border-bottom-left-radius: 30px;
    }
    .sub-title {
      margin: 5px 0;
    }
  }
  .red {
    color: $--color-primary;
  }
  .gray {
    color: #babec0;
  }
}
</style>
