<template>
  <div id="person-message" class="person-message">
    <div
      v-if="typeList.includes(personItem.messageType)"
      class="message-wrapper"
      :class="personItem.messageDirection===1?'right':'left'"
    >
      <div class="avatar">
        <iep-img :resizeOpt="{l:40}" :src="getAvatar(personItem)"></iep-img>
      </div>
      <div class="message-inner">
        <div class="name">{{getName(personItem)}}</div>
        <!-- 文字消息 -->
        <div
          class="content"
          v-if="personItem.messageType===msgType[1]"
          v-html="(contentSolve(personItem.content.content))"
        ></div>
        <!-- 图片消息 -->
        <div class="content" v-else-if="personItem.messageType===msgType[2]">
          <iep-img
            class="img-viewer"
            :src="personItem.content.content?'data:image/png;base64,'+personItem.content.content:personItem.content.imageUri"
            :alt="personItem.content.imageUri"
            :preview-src-list="[personItem.content.imageUri]"
          />
        </div>
        <!-- 语音消息 -->
        <div
          class="content"
          v-else-if="personItem.messageType===msgType[7]||personItem.messageType===msgType[4]"
        >
          <div
            v-if="personItem.content.content"
            class="speaker-box"
            @click="handleAudio(personItem.content)"
          >
            <span>{{personItem.content.duration}}"</span>
            <div class="box">
              <div class="wifi-symbol">
                <div class="wifi-circle first"></div>
                <div class="wifi-circle second" :class="this.audioFlag?'wifiAnimation0P2':''"></div>
                <div class="wifi-circle third" :class="this.audioFlag?'wifiAnimation0P4':''"></div>
              </div>
            </div>
          </div>
          <div v-else>[暂不支持此语音消息]</div>
        </div>
        <!-- 其他 -->
        <div class="content" v-else>[暂不支持显示此消息]</div>
        <!-- 撤销按钮 -->
        <span
          v-if="personItem.messageDirection===1&&revokeShowByTime(personItem)"
          class="revoke"
          @click="handleRevoke(personItem)"
        >撤销</span>
      </div>
    </div>
    <!-- 分享 -->
    <div v-else-if="shareTypeList.includes(personItem.messageType)">
      <ShareMessage :data="personItem"></ShareMessage>
    </div>
    <!-- 能聘消息 -->
    <div v-else-if="recruitTypeList.includes(personItem.messageType)">
      <RecruitMessage :getAvatar="getAvatar" :getName="getName" :recruitItem="personItem"></RecruitMessage>
    </div>
    <!-- 特殊消息 -->
    <div class="message-revoke" v-else-if="personItem.messageType==='APP:RED_PACKET'">
      <div class="name">{{personItem.messageDirection===1?"发出":"收到"}}红包，请在手机上查看</div>
    </div>
    <div v-else-if="personItem.content.content" class="message-revoke">
      <div class="name">{{personItem.content.content}}</div>
    </div>
    <!-- 撤回指令消息 -->
    <div v-else-if="personItem.messageType==='RC:RcCmd'" class="message-revoke">
      <div class="name">{{getName(personItem)}}撤回了一条消息</div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { msgType, typeList, shareTypeList, recruitTypeList } from "../options";
import currentMixin from "../mixins/mixin";
import ShareMessage from "./ShareMessage";
import RecruitMessage from "./RecruitMessage";
export default {
  mixins: [currentMixin],
  props: {
    personItem: {
      type: Object,
      required: true,
    },
  },
  components: {
    ShareMessage,
    RecruitMessage,
  },
  computed: {
    ...mapState({
      infoMap: state => state.imc.infoMap,
      rongIMLib: state => state.imc.rongIMLib,
    }),
  },
  data() {
    return {
      msgType,
      typeList,
      shareTypeList,
      recruitTypeList,
    };
  },

  methods: {
    ...mapActions(["getMsgUserOrgInfo", "imcRevokeMessage"]),
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
    handleRevoke(item) {
      this.imcRevokeMessage({
        sentTime: item.sentTime,
        messageUId: item.messageUId,
      });
    },
    revokeShowByTime(item) {
      const now = new Date();
      const difTime = (now - item.sentTime) / 1000;
      return difTime < 120;
    },
  },
};
</script>
<style lang="scss" scoped>
#person-message {
  padding-top: 0;
  min-height: 20px;
}
.person-message {
  .message-wrapper {
    display: flex;
    &.left {
      flex-direction: row;
      .content {
        font-family: "微软雅黑";
        background: #fff;
        color: $--color-text-primary;
        &::v-deep a {
          color: $--color-secondary;
        }
        &::after {
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
        .wifi-circle {
          font-family: "微软雅黑";
          color: $--color-text-primary;
        }
      }
      .message-inner {
        align-items: flex-start;
      }
    }
    &.right {
      flex-direction: row-reverse;
      .content {
        background: $--color-secondary;
        color: #ffffff;
        &::selection,
        &::v-deep a::selection {
          background: $--color-input-regular;
        }
        &::v-deep a {
          color: #ffffff;
        }
        &::after {
          content: "";
          position: absolute;
          width: 10px;
          height: 10px;
          right: -7px;
          top: 2px;
          border-width: 0 0 10px 4px;
          border-style: solid;
          border-left-color: transparent;
          border-bottom-color: $--color-secondary;
          border-bottom-right-radius: 30px;
        }
        &:hover + .revoke {
          display: block;
        }
        .wifi-circle {
          color: #ffffff;
        }
      }
      .revoke:hover {
        color: $--color-secondary;
        display: block;
      }
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
      position: relative;

      .content {
        max-width: 80%;
        min-height: 18px;
        min-width: 5px;
        padding: 10px;
        border-radius: $--border-radius-base;
        position: relative;
        .el-image {
          ::v-deep img {
            max-height: 200px;
          }
        }
        .speaker-box {
          display: flex;
          align-items: center;
          cursor: pointer;
          .box {
            width: 30px;
            height: 20px;
            box-sizing: border-box;
            position: relative;
          }
          .wifi-symbol {
            width: 25px;
            height: 25px;
            box-sizing: border-box;
            overflow: hidden;
            transform: rotate(-45deg);
          }
          .wifi-circle {
            border: 2px solid;
            border-radius: 50%;
            position: absolute;
          }
          .first {
            width: 2px;
            height: 2px;
            background: #cccccc;
            top: 22.5px;
            left: 22.5px;
          }
          .second {
            width: 12px;
            height: 12px;
            top: 17.5px;
            left: 17.5px;
          }
          .third {
            width: 20px;
            height: 20px;
            top: 12.5px;
            left: 12.5px;
          }
          .wifiAnimation0P2 {
            animation: fadeInOut 1s infinite 0.2s;
          }
          .wifiAnimation0P4 {
            animation: fadeInOut 1s infinite 0.4s;
          }
          @keyframes fadeInOut {
            0% {
              opacity: 0; /*初始状态 透明度为0*/
            }
            100% {
              opacity: 1; /*结尾状态 透明度为1*/
            }
          }
        }
      }
      .revoke {
        display: none;
        height: 22px;
        line-height: 22px;
        cursor: pointer;
        position: absolute;
        right: 10px;
        bottom: -20px;
        z-index: 9;
      }
    }
  }
  .name {
    color: $--color-text-secondary;
    margin-bottom: 5px;
  }
  .message-revoke {
    text-align: center;
  }
  .img-viewer {
    ::v-deep .el-image-viewer__close {
      i {
        color: #ffffff;
      }
    }
  }
}
</style>

