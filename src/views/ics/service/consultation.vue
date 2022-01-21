<template>
  <iep-dialog
    class="talk-dialog"
    :dialog-show="questionDialogShow"
    :title="isArtificial ? '人工服务' : '小能在线'"
    width="600px"
    @close="close"
  >
    <div class="content" id="consultation_content">
      <div class="frame" v-for="(item, index) in list" :key="index">
        <div class="item question" v-if="item.type === 'question'">
          <div class="talking">
            <p>{{item.content}}</p>
          </div>
          <div class="avatar">
            <iep-img :src="item.avatar"></iep-img>
          </div>
        </div>
        <div class="item answer" v-else>
          <div class="avatar">
            <iep-img :src="avatar"></iep-img>
          </div>
          <div class="talking">
            <!-- 存在推荐的问题 -->
            <div class="options not-serve" v-if="item.options.length > 0">
              <!-- 初始化问候语加推荐问题 -->
              <p v-if="item.isDefault">{{item.defaultSentence}}</p>
              <p v-if="item.isDefault">{{item.defaultQuestion}}</p>
              <!-- 未找到答案，推荐相关的问题 -->
              <p v-else>为您找到“{{item.question}}”相关内容：</p>
              <div
                class="option"
                v-for="(option, i) in item.options"
                :key="i"
                @click="handleSubmit('select', option.desc)"
              >{{option.desc}}</div>
              <!-- <p>都不是？请一句话完整描述您的问题？</p> -->
            </div>
            <!-- 存在答案，直接显示答案 -->
            <div class="options not-serve" v-else-if="item.answer && item.answer.questionId">
              <iep-jodit-read class="pre" v-model="item.answer.desc"></iep-jodit-read>
              <div class="operation">
                <!-- <i class="icon-like" v-show="!item.ishate" @click="handleUp(item.answer, index, item.islike)"></i>
                <i class="icon-caikongxin" v-show="!item.islike"  @click="handleDown(item.answer, index, item.ishate)"></i>-->
              </div>
            </div>
            <!-- 无任何返回（即无问题答案或点赞点踩），或者为人工客服对话 -->
            <div class="options text" v-else>
              <div v-if="item.answer !== ''">
                <iep-jodit-read class="pre" v-model="item.answer"></iep-jodit-read>
              </div>
              <div v-else-if="item.islike">多谢您的鼓励，我会再接再厉的！</div>
              <div v-else-if="item.ishate">非常抱歉，没有解决您的问题，我会继续学习，变得更加智能。</div>
              <div v-else>啊哦，小能还不够聪明，没有找到你要的答案，可以寻求人工客服解答疑问哦。</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template slot="footer">
      <div class="form">
        <div class="remark" v-if="isArtificial">--- 已成功切换到人工服务 ---</div>
        <!-- 人工客服 -->
        <el-input
          class="input"
          v-model="question"
          @keyup.enter.native="handleSentMsg"
          v-if="isArtificial"
          placeholder="请完整描述你的问题"
        >
          <template slot="prepend">
            <i class="icon-icon-test1" @click="handleArtificial" title="切换智能客服"></i>
          </template>
          <template slot="append">
            <el-button @click="handleSentMsg">发送</el-button>
          </template>
        </el-input>
        <!-- 智能问答 -->
        <el-input
          class="input"
          v-model="question"
          @keyup.enter.native="handleSubmit('submit')"
          v-else
          placeholder="请完整描述你的问题"
        >
          <!-- <template slot="prepend">
            <i class="icon-kefu" @click="handleArtificial" title="联系人工客服"></i>
          </template>-->
          <template slot="append">
            <div @click="handleSubmit('submit')">发送</div>
          </template>
        </el-input>
      </div>
    </template>
  </iep-dialog>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import { getQuery } from "@/api/ims/serviceDialog";
import { goodReview, badReview } from "@/api/ims/question";
import { putQuestion } from "@/api/ims/manualCustomer";
import artificial from "./artificial";

const defaultQuestion = [
  { desc: "我要加入节能保" },
  { desc: "拓展人脉相关问题" },
  { desc: "我要发布生态说说" },
  { desc: "怎么创建组织" },
  { desc: "如何邀请他人加组织" },
  { desc: "怎么在组织内群聊" },
  { desc: "如何发布组织公告" },
  { desc: "如何成为星级合伙人" },
  { desc: "怎么发宝贝红包" },
  { desc: "节能保平台价值如何产生" },
];

export default {
  mixins: [artificial],
  name: "RewardDialog",
  data() {
    return {
      list: [],
      question: "",
      avatar: "/img/ics/ican.png",
      isArtificial: false, // 是否切换到人工客服
    };
  },
  computed: {
    ...mapGetters(["userInfo", "questionDialogShow"]),
  },
  methods: {
    ...mapMutations({
      setQuestionDialogShow: "SET_QUESTION_DIALOG_SHOW",
    }),
    handleSubmit(state, question) {
      const val = state === "submit" ? this.question : question;
      if (val !== "") {
        this.list.push({
          avatar: this.userInfo.avatar,
          type: "question",
          content: val,
        });
        this.scrollBottom();
        getQuery(val).then(({ data }) => {
          // 转义前，先把回车删掉
          data = data.replace(/(\r\n|\n|\r)/gm, " ");
          // 取到数据前先解析双引号
          data = this.dealDataForString(data);
          // 正常解析返回值
          const row = JSON.parse(data);
          row.type = "answer";
          row.question = val;
          this.list.push(row);
          this.question = "";
          this.scrollBottom();
        });
      }
    },
    dealData(data) {
      let list = [];
      const fn = (data, name, number) => {
        const index = list[list.length - 1] || 0;
        // 第一个src=
        const index1 = data.indexOf(name);
        // 若存在 src= ，截至第一个双引号
        if (index1 >= 0) {
          list.push(index1 + number + index);
          const string1 = data.substr(index1 + number + 1);
          // eslint-disable-next-line quotes
          const index2 = string1.indexOf('"');
          list.push(index1 + number + 1 + index2 + index);
          // 判断后续的文字中是否有双引号
          const string2 = string1.substr(index2);
          if (string2.indexOf(name) >= 0) {
            fn(string2, name, number);
          }
        }
      };
      fn(data, "src=", 4);
      for (const item of list) {
        data = data.substr(0, item) + "'" + data.substr(item + 1);
      }
      list = [];
      fn(data, "style=", 6);
      for (const item of list) {
        data = data.substr(0, item) + "'" + data.substr(item + 1);
      }
      return data;
    },
    dealDataForString(data) {
      const list = [];
      const fn = (data, name) => {
        const index = list[list.length - 1] || 0;
        // 第一个 ="
        const index1 = data.indexOf(name);
        // 若存在 src= ，截至第一个双引号
        if (index1 >= 0) {
          list.push(index1 + index + 1);
          const string1 = data.substr(index1 + 2);
          // eslint-disable-next-line quotes
          const index2 = string1.indexOf('"');
          list.push(index1 + 2 + index2 + index);
          // 判断后续的文字中是否有双引号
          const string2 = string1.substr(index2);
          if (string2.indexOf(name) >= 0) {
            fn(string2, name);
          }
        }
      };
      // eslint-disable-next-line quotes
      fn(data, '="');
      for (const item of list) {
        data = data.substr(0, item) + "'" + data.substr(item + 1);
      }
      return data;
    },
    close() {
      this.isArtificial = false;
      this.setQuestionDialogShow(false);
    },
    scrollBottom() {
      this.$nextTick(() => {
        const content = document.getElementById("consultation_content");
        content.scrollTop = content.scrollHeight;
      });
    },
    handleUp(row, index, state) {
      this.$set(this.list[index], "islike", true);
      if (!state) {
        this.list.push({
          options: [],
          answer: "",
          islike: true,
        });
        this.scrollBottom();
        goodReview({ id: row.questionId }).then(() => {});
      }
    },
    handleDown(row, index, state) {
      this.$set(this.list[index], "ishate", true);
      if (!state) {
        this.list.push({
          options: [],
          answer: "",
          ishate: true,
        });
        this.scrollBottom();
        badReview({ id: row.questionId }).then(() => {});
      }
    },
    handleArtificial() {
      if (this.isArtificial) {
        this.isArtificial = false;
      } else {
        this.isArtificial = true;
        // 建立与客服的聊天链接
        // let chat = {
        //   id: this.receiver.userId,
        //   chatNo: `user${this.receiver.userId}`,
        //   username: this.receiver.username,
        //   chatName: this.receiver.realName,
        //   avatar: this.receiver.avatar,
        //   type: 1,
        // }
        // this.$store.dispatch('updateCurrentChat', {chat, show: false})
        // 发送请求建立客服聊天室，根据返回的聊天室房间号进入聊天室
        putQuestion().then(({ data }) => {
          this.receiver.userId = data.data;
          // this.$store.commit('updateGroupMember', {
          //   groupId: data.data.groupId,
          //   type: true,
          //   ids: JSON.parse(this.userInfo.id),
          // })
        });
      }
    },
  },
  mounted() {
    // this.connection();
  },
  watch: {
    questionDialogShow(val) {
      if (val) {
        const options = {
          isDefault: true, // 初始化问候语
          answer: "",
          defaultSentence: `亲爱的${this.userInfo.realName}，我是智能客服小能，很高兴为您服务！`,
          defaultQuestion: "【我猜你想问】",
          options: defaultQuestion,
        };
        this.list.push(options);
        this.scrollBottom();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  border-top: 1px solid $--border-color;
  height: 450px;
  // overflow-y: scroll;
  .item {
    margin: 20px 0 25px;
    display: flex;
    position: relative;
    .talking {
      flex: 1;
    }
    .avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
    }
  }
  .question {
    padding-left: 100px;
    .talking {
      margin-right: 20px;
      text-align: right;
      color: #d56368;
      p {
        padding: 10px;
        border-radius: 0 15px;
        background-color: #ff7a7d;
        color: #fff;
        display: inline-block;
      }
    }
    // .talking:before {
    //   content: "";
    //   position: absolute;
    //   right: 67px;
    //   top: 20px;
    //   border-top: 10px solid transparent;
    //   border-bottom: 10px solid transparent;
    //   border-left: 15px solid #fdf6f5;
    // }
  }
  .answer {
    padding-right: 100px;
    .talking {
      margin-left: 20px;
      text-align: left;
      width: 330px;
      .options {
        // background-color: #f2f2f2;
        border-radius: 8px;
        padding: 15px;
        position: relative;
        .option {
          color: #f74437;
          margin-bottom: 10px;
          cursor: pointer;
        }
        p {
          margin-bottom: 10px;
        }
        .operation {
          position: absolute;
          bottom: -3px;
          right: -108px;
          width: 85px;
          .icon-like {
            color: #ff7a7d;
            border-color: #ff7a7d;
          }
          i {
            border: 1px solid $--border-color;
            padding: 7px;
            border-radius: 50%;
            text-align: center;
            font-size: 20px;
            cursor: pointer;
            margin-right: 10px;
            color: $--color-text-secondary;
          }
        }
      }
      .not-serve {
        background-color: $--background-color;
      }
      .text {
        display: inline-block;
        background-color: $--background-color;
        max-width: 300px;
      }
    }
    // .talking:before {
    //   content: "";
    //   position: absolute;
    //   left: 67px;
    //   top: 20px;
    //   border-top: 10px solid transparent;
    //   border-bottom: 10px solid transparent;
    //   border-right: 15px solid #fafafa;
    // }
  }
}
.form {
  width: 100%;
  text-align: left;
  .remark {
    text-align: center;
    font-size: 12px;
    color: #babec0;
  }
  .serve {
    border-radius: $--large-border-radius;
    margin-bottom: 10px;
    color: #e56569;
    border-color: #e56569;
  }
  .input {
    width: 100%;
    ::v-deep input {
      border-radius: 10px 0 0 10px;
    }
    ::v-deep .el-input-group__prepend {
      border-radius: 10px 0 0 10px;
      padding: 0;
      i {
        padding: 11px 20px;
        cursor: pointer;
      }
    }
    ::v-deep .el-input-group__append {
      border-radius: 0 10px 10px 0;
      background-color: #f74437;
      color: #fff;
      cursor: pointer;
    }
  }
}
::-webkit-scrollbar {
  border-radius: $--border-radius-base;
  width: 6px;
  background-color: #fff;
}
::-webkit-scrollbar-track {
  border-radius: $--border-radius-base;
  background-color: #fff;
  -webkit-transition: 0.3s background-color;
  transition: 0.3s background-color;
}
::-webkit-scrollbar-thumb {
  border-radius: $--border-radius-base;
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
.talk-dialog ::v-deep .el-dialog__body {
  padding: 0 20px;
}
</style>
