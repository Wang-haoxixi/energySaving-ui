<template>
  <div class="message-content">
    <div class="content-wrapper" v-loading="msgLoading" v-show="currentConversation.targetId">
      <h3 v-if="!isCustom">
        <span style="cursor:pointer" @click="handleStyle">{{getName}}</span>
        <span class="recruit-name" v-if="currentConversation.recruit">
          沟通{{currentConversation.recruit.canType==="0"?"职位":"项目"}}:
          <span
            @click="handleToRecruit(currentConversation.recruit)"
          >{{currentConversation.recruit.name}}</span>
        </span>
      </h3>
      <ChatContainer ref="ChatContainer" v-if="!isCustom"></ChatContainer>
      <CustomContainer ref="CustomContainer" v-else></CustomContainer>
    </div>
    <div class="content-wrapper noconversation" v-show="!currentConversation.targetId">
      <!-- <i class="el-icon-woneng-icanlogo"></i> -->
    </div>
    <div class="footer-wrapper" v-if="!isCustom">
      <div class="operate">
        <el-upload
          class="upload"
          :action="uploadUrl"
          :headers="header"
          :file-list="fileList"
          :on-success="handleSuccess"
          :before-upload="beforeImgUpload"
          :on-error="handleError"
          :show-file-list="false"
          accept="image/*"
        >
          <i class="el-icon-woneng-tupian" title="发送图片"></i>
        </el-upload>
        <el-popover placement="top" width="500" trigger="click">
          <EmojiList :emojiList="emojiList" @handleAddEmoji="handleAddEmoji"></EmojiList>
          <i
            class="el-icon-woneng-biaoqing emoji"
            title="发送表情"
            slot="reference"
            style="margin-top: 2px;"
          ></i>
        </el-popover>
        <i
          v-loading="inviteLoading"
          class="el-icon-woneng-file-jiyao1"
          title="发送投递邀请"
          @click="handleInvitation(currentConversation.recruit)"
          v-if="currentConversation.recruit&&currentConversation.recruit.createBy===userInfo.userId"
        ></i>
      </div>
      <div class="input">
        <el-input
          class="iep-basic-scroll"
          v-model="content"
          type="textarea"
          resize="none"
          @keydown.native="handleKeyDown"
        ></el-input>
        <el-button type="primary" class="iep-btn-submit" @click="handleSend()">发送</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import EmojiList from "./Components/EmojiList";
import ChatContainer from "./Components/ChatContainer";
import CustomContainer from "./Components/CustomContainer";
import uploadMixin from "./mixins/upload";
import currentMixin from "./mixins/mixin";
import * as types from "./options";
import { sendInvitation } from "@/api/ims/rong";
export default {
  mixins: [uploadMixin, currentMixin],
  components: {
    EmojiList,
    ChatContainer,
    CustomContainer,
  },
  data() {
    return {
      types,
      content: "",
      fileList: [],
      inviteLoading: false,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    ...mapState({
      dialogShow: state => state.imc.dialogShow,
      isCustom: state => state.imc.isCustom,
      msgLoading: state => state.imc.msgLoading,
      currentConversation: state => state.imc.currentConversation,
      infoMap: state => state.imc.infoMap,
      emojiList: state => state.imc.emojiList,
      messageContent: state => state.imc.messageContent,
    }),
    getName() {
      const index = JSON.stringify({
        id: this.currentConversation.targetId,
        type: this.currentConversation.type || 1,
      });
      const name = this.infoMap.name[index];
      return name;
    },
  },
  mounted() {
    this.loadContent();
  },
  methods: {
    ...mapMutations({
      setMessageContent: "SET_MESSAGE_CONTENT",
      setDialogShow: "SET_DIALOGSHOW",
    }),
    ...mapActions([
      "imcSendMessage",
      "imcGetHistoryMessages",
      "imcGetMsgHistory",
    ]),
    loadContent() {
      this.content = this.messageContent ?? "";
      // this.setMessageContent("");
    },
    handleSend() {
      this.handleScrollFlag(true);
      const str = this.content;
      if (str.trim()) {
        this.imcSendMessage({ content: this.content, type: types.msgType[1] });
      }
      this.content = "";
    },
    handleScrollFlag(value) {
      if (this.isCustom) {
        this.$refs.CustomContainer.scrollFlag = value;
      } else {
        this.$refs.ChatContainer.scrollFlag = value;
      }
    },
    //图片上传成功回调
    handleSuccess(response) {
      const { url } = response.data;
      const options = {
        cRatio: 0, //是否固定比率压缩 0为按base64大小倍率压缩
        returnLimit: 80, // 当base大小大于提交大小该倍率时 不压缩如提交限制100kb 该值为10 则大于1M不压缩
        submitLimit: 100, // 提交大小限制 单位kb
      };
      this.imgToBase64(url, options, base64 => {
        if (base64) {
          const reg = new RegExp("^data:image/[a-z]{0,4};base64,");
          const newBase64 = base64.replace(reg, "");
          this.handleScrollFlag(true);
          const content = { content: newBase64, imageUri: url };
          this.imcSendMessage({ content: content, type: types.msgType[2] });
          this.fileList = [];
        }
      });
    },
    //添加emoji
    handleAddEmoji(emoji) {
      this.content += emoji;
    },
    handleKeyDown(e) {
      if (e.keyCode == 13 && e.ctrlKey) {
        this.content += "\n"; //换行
      } else if (e.keyCode == 13 && e.shiftKey) {
        this.content += "\n"; //换行
      } else if (e.keyCode == 13) {
        this.handleSend(); //提交的执行函数
        e.preventDefault(); //禁止回车的默认换行
      }
    },
    async handleInvitation(row) {
      if (row) {
        const params = {
          dataId: row.recruitId,
          targetId: this.currentConversation.targetId,
        };
        this.inviteLoading = true;
        await sendInvitation(params);
        this.inviteLoading = false;
      }
    },
    handleToRecruit(row) {
      if (row) {
        this.setDialogShow(false);
        const path =
          row.canType === "0"
            ? `/channel/recruit_detail/${row.recruitId}`
            : `/channel/partner_detail/${row.recruitId}`;
        this.$openPage(path);
      }
    },
    handleStyle() {
      const { targetId, type } = this.currentConversation;
      if (type === 1) {
        this.$openPage(`/channel/styles/user/${targetId}/index`);
      } else if (type === 3) {
        this.$openPage(`/channel/styles/so/${targetId}/index`);
      }
      this.setDialogShow(false);
    },
  },
  watch: {
    dialogShow(n) {
      if (n) {
        this.loadContent();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.message-content {
  display: flex;
  flex-direction: column;
  // padding: 20px;
  ::v-deep .el-scrollbar__view {
    padding-bottom: 30px;
  }
}
.content-wrapper {
  flex: 1;
  height: calc(100% - 60px);
  border-radius: $--border-radius-base;
  min-height: 0;
  h3 {
    margin: 0;
    padding: 20px;
    font-size: 16px;
    border-bottom: 1px solid $--border-color;
    background-color: #fff;
    .recruit-name {
      float: right;
      font-size: 14px;
      & > span {
        cursor: pointer;
        color: $--color-secondary;
      }
    }
  }
  &::v-deep .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  ::v-deep .history {
    margin-top: 25px;
    font-size: 12px;
    text-align: center;
  }
  &.noconversation {
    opacity: 0.5;
    display: flex;
    justify-content: center;
    align-items: center;
    i[class^="el-icon-"] {
      color: $--color-input-regular;
      font-size: 80px;
    }
  }
}
.footer-wrapper {
  margin: 0;
  padding: 20px;
  background-color: #fff;
  border-radius: 0;
  .operate {
    display: flex;
    align-items: center;
    margin-left: -10px;
    .upload {
      height: 20px;
    }
    .emoji {
      height: 20px;
    }
    i {
      font-size: 20px;
      text-indent: 10px;
      color: $--color-text-secondary;
      cursor: pointer;
      &:hover,
      &:active {
        color: $--color-primary;
      }
      &:visited {
        color: $--color-text-secondary;
      }
    }
  }
  .input {
    display: flex;
    flex-direction: column;
  }
  .el-textarea {
    margin: auto;
    padding: 5px 0;
    &::v-deep .el-textarea__inner {
      border: 0;
      height: 80px;
      padding: 0;
    }
  }
  // .el-input {
  //   margin: auto;
  //   ::v-deep .el-input__inner {
  //     border: 0;
  //     height: 80px;
  //     padding: 0 15px 0 0;
  //   }
  // }
  ::v-deep .el-input-group__append,
  .input {
    background: none;
    button.el-button {
      align-self: flex-end;
      padding: 0;
      width: 80px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      border-radius: $--border-radius-base;
      background-color: $--color-primary;
      border-color: $--color-primary;
      color: #fff;
      &:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>
