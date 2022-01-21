<template>
  <div class="layout-wrapper">
    <div class="aside background">
      <el-scrollbar style="height: 100%;">
        <iep-no-data v-if="!conversationList.length"></iep-no-data>
        <div
          class="message-item"
          :class="{active:item.targetId===currentConversation.targetId}"
          v-for="item in conversationList"
          :key="item.id"
        >
          <div class="message-item-brd" @click="handleOpen(item)">
            <div class="icon-wrapper">
              <iep-img :resizeOpt="{l:40}" :src="getAvatar(item)"></iep-img>
            </div>
            <div class="title-wrapper">
              <div
                class="title"
                :class="{'is-deal':item.unreadMessageCount}"
                :title="item.latestMessage.content.content"
              >
                <span style="margin-right:5px" class="name iep-ellipsis-flex">{{getName(item)}}</span>
                <span class="time">{{item.latestMessage.sentTime | parseToDay}}</span>
              </div>
              <div class="con iep-ellipsis-flex">
                <!-- 特殊消息 -->
                <span title="[图片]" v-if="item.latestMessage.messageType===msgType[2]">[图片]</span>
                <span title="[语音消息]" v-else-if="item.latestMessage.messageType===msgType[4]">[语音消息]</span>
                <span title="[语音消息]" v-else-if="item.latestMessage.messageType===msgType[7]">[语音消息]</span>
                <span
                  v-else-if="item.latestMessage.messageType==='RC:RcCmd'"
                  :title="`${getName({targetId:item.latestMessage.senderUserId})}撤回了一条消息`"
                >{{getName({targetId:item.latestMessage.senderUserId})+"撤回了一条消息"}}</span>
                <!-- 能聘消息 -->
                <template v-else-if="recruitTypeList.includes(item.latestMessage.messageType)">
                  <!-- 能聘投递邀请 -->
                  <template v-if="recruitType[2]===item.latestMessage.messageType">
                    <span
                      v-if="item.latestMessage.messageDirection===1"
                    >{{item.latestMessage.content.recruiterTips}}</span>
                    <span v-else>{{item.latestMessage.content.content}}</span>
                  </template>
                  <!-- 能聘面试邀请 -->
                  <template v-else-if="recruitType[4]===item.latestMessage.messageType">
                    <span v-if="item.latestMessage.messageDirection===1">发送一份面试邀请函</span>
                    <span v-else>发来一份面试邀请函</span>
                  </template>
                  <!-- 能聘其他消息 -->
                  <span v-else>{{item.latestMessage.content.content}}</span>
                </template>
                <!-- 普通消息 -->
                <span
                  v-else
                  :title="unicodeToTxt(item.latestMessage.content.content)"
                >{{unicodeToTxt(item.latestMessage.content.content)}}</span>
                <!-- <span v-else>{{item.latestMessage.content.}}</span> -->
              </div>
            </div>
          </div>
          <i class="el-icon-close operate" title="关闭会话" @click="handleCloseConversation(item)"></i>
          <span
            v-show="item.unreadMessageCount"
            class="unread operate"
          >{{item.unreadMessageCount>99?"99":item.unreadMessageCount}}</span>
        </div>
      </el-scrollbar>
    </div>
    <message-content ref="messageContent" class="content background"></message-content>
  </div>
</template>
<script>
import MessageContent from "./content";
import { mapState, mapActions } from "vuex";
import { isCustomTypes, showTypeName, isDeleteFriend } from "./options";
import { msgType, recruitTypeList, recruitType } from "./options";
import currentMixin from "./mixins/mixin";
export default {
  mixins: [currentMixin],
  components: {
    MessageContent,
  },
  data() {
    return {
      showTypeName,
      msgType,
      recruitTypeList,
      recruitType,
    };
  },
  computed: {
    ...mapState({
      currentConversation: (state) => state.imc.currentConversation,
      conversationList: (state) => state.imc.conversationList,
      infoMap: (state) => state.imc.infoMap,
      rongIMLib: (state) => state.imc.rongIMLib,
    }),
  },
  methods: {
    ...mapActions([
      "imcGetMsg",
      "imcGetConversation",
      "imcDelConversationById",
      "getMsgUserOrgInfo",
    ]),
    getAvatar(item) {
      const { targetId, type } = item;
      const index = JSON.stringify({ id: targetId, type: type || 1 });
      const avatar = this.infoMap.avatar[index];
      if (!avatar) {
        this.getMsgUserOrgInfo({ targetId, type });
      }
      return avatar;
    },
    getName(item) {
      const { targetId, type } = item;
      const index = JSON.stringify({ id: targetId, type: type || 1 });
      const name = this.infoMap.name[index];
      if (!name) {
        this.getMsgUserOrgInfo({ targetId, type });
      }
      return name || "加载中";
    },
    handleOpen(item) {
      if (isDeleteFriend(item.targetId)) {
        // TODO: 不晓得被拉黑还是主动拉黑
        this.$message("该好友已经拉入黑名单");
        return;
      }
      if (isCustomTypes(item.targetId)) {
        this.imcGetMsg(item);
      } else {
        this.imcGetConversation(item);
      }
      this.$refs["messageContent"].content = "";
    },
    handleCloseConversation(item) {
      this.imcDelConversationById(item);
    },
  },
};
</script>
<style lang="scss" scoped>
.layout-wrapper {
  display: flex;
  height: calc(90vh - 65px);
  padding: 0;
  .aside {
    flex: 0 0 330px;
    border-right: 1px solid $--border-color;
    ::v-deep .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
  .content {
    flex: 1;
    // margin-left: 20px;
  }
  .background {
    background-color: rgba(244, 245, 246, 1);
    // border-radius: 5px;
  }
}
.message-item {
  position: relative;
  background-color: #fff;
  &:hover .el-icon-close {
    display: inline-block;
  }
  &:hover,
  &.active {
    background-color: rgba(244, 245, 246, 1);
  }
  .el-icon-close {
    cursor: pointer;
    background: $--color-text-regular;
  }
  &:hover .unread {
    display: none;
  }
  .operate {
    top: calc(50% - 8px);
    font-size: 12px;
    width: 16px;
    height: 16px;
    text-align: center;
    line-height: 16px;
    border-radius: 50%;
    right: 10px;
    display: none;
    position: absolute;
    color: #ffffff;
  }
  .unread {
    display: block;
    padding: 0;
    width: 24px;
    height: 16px;
    text-align: center;
    line-height: 16px;
    border-radius: 8px;
    background: $--color-primary;
  }
  .message-item-brd {
    position: relative;
    display: flex;
    margin: 0 20px 0 15px;
    padding: 15px 0;
    cursor: pointer;
    &::before {
      position: absolute;
      content: "";
      bottom: 0;
      width: 100%;
      height: 1px;
      background-color: rgba(247, 247, 247, 1);
    }
    .name {
      max-width: 150px;
      height: 20px;
    }
    ::v-deep .title-wrapper {
      width: 230px;
      .title.is-deal {
        color: $--color-text-regular;
      }
    }
  }
}
.is_read {
  font-weight: 600;
  background-color: #fafafa;
}
.icon-wrapper {
  height: 40px;
  width: 40px;
  min-width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  border-radius: $--border-radius-base;
  > i {
    font-size: 22px;
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: $--border-radius-base;
    color: $--color-text-primary;
  }
}
.title-wrapper {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .title {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    font-weight: 400;
    &.is-deal {
      color: $--color-text-secondary;
    }
  }
  .con {
    font-size: 12px;
    color: $--color-text-secondary;
  }
  .time {
    font-size: 12px;
    font-weight: 400;
    color: $--color-text-secondary;
  }
}
</style>
