<template>
  <div class="dynamic" ref="dynamic">
    <!-- 动态类型 -->
    <div class="dynamic-type-list">
      <i class="el-icon-woneng-dongtai"></i>
      <el-dropdown class="dropdown">
        <span class="el-dropdown-link">
          {{ dynamicType.name }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(item, index) in typeList"
            :key="index"
            @click.native="()=>{dynamicType = item}"
          >{{item.name}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 动态list -->
    <div class="dynamic-list" ref="dynamicList" v-infinite-scroll="currentChange">
      <div v-if="list.length > 0">
        <div class="dynamic-item" v-for="(item, index) in list" :key="index">
          <div class="item-title">
            <!-- 1-发布任务 2-修改任务 3-协作者评论 4-回复 -->
            <div class="avatar">
              <iep-img :src="item.avatar" class="avatar-img"></iep-img>
            </div>
            <div class="title" v-if="item.type === '1' || item.type === '2'">{{item.content}}</div>
            <div class="title" v-if="item.type === '3'">{{item.name}}发表了评论</div>
            <div class="time">{{item.createTime}}</div>
          </div>
          <div class="content" v-if="item.type === '3'">
            <div class="pre">{{item.content}}</div>
            <span @click="handleReply('replyIndex', index)">
              <i class="el-icon-woneng-pinglun1"></i>
              <span v-if="item.reply">{{item.reply.total}}</span>
            </span>
          </div>
          <div class="reply" v-if="index === replyIndex">
            <el-input class="input" v-model="commentForm" :placeholder="`回复${item.name}`"></el-input>
            <iep-button class="button" @click="handleCommentSubmit(item.id)">回复</iep-button>
          </div>
          <!-- 回复列表 -->
          <div
            class="reply-list"
            v-if="item.reply && index === replyIndex"
            v-loading="replyLoadState"
          >
            <div class="reply-item" v-for="(reply, rIndex) in replyList" :key="rIndex">
              <div class="reply-title">
                <div class="avatar">
                  <iep-img :src="reply.createAvatar" class="avatar-img"></iep-img>
                </div>
                <div class="title">{{`${reply.createName} 回复 ${reply.replyName}`}}</div>
                <div class="time">{{reply.createTime}}</div>
              </div>
              <div class="reply-content">
                <div class="pre">{{reply.content}}</div>
                <i class="el-icon-woneng-pinglun1" @click="handleReply('replyRIndex', rIndex)"></i>
              </div>
              <div class="reply" v-if="rIndex === replyRIndex">
                <el-input class="input" v-model="replyForm" :placeholder="`回复${reply.createName}`"></el-input>
                <iep-button class="button" @click="handleReplySubmit(reply.id)">回复</iep-button>
              </div>
            </div>
            <!-- 回复的分页 -->
            <div class="reply-pagination">
              <el-pagination
                background
                layout="prev, pager, next"
                :current-page.sync="replyPageOption.current"
                :total="item.reply.total"
                @current-change="replyCurrentChange"
              ></el-pagination>
            </div>
          </div>
        </div>
      </div>
      <div class="no-data" v-else>
        <img src="/img/default/default-search-notask.png" alt />
        <div class="no-data-title">暂无该类型动态</div>
      </div>
    </div>
    <!-- 评论 -->
    <div class="dynamic-comment">
      <el-input
        type="textarea"
        rows="5"
        placeholder="请输入您的评论并按评论键提交"
        v-model="comment"
        maxlength="250"
        show-word-limit
      ></el-input>
      <div class="button-list">
        <iep-button class="button iep-btn-m" @click="handleSubmit">评论</iep-button>
      </div>
    </div>
  </div>
</template>

<script>
import replyMixin from "./replyMixin";
import { getCommentPage, createComment } from "@/api/qms/cooperation_comment";

export default {
  mixins: [replyMixin],
  props: {
    taskId: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    contentHeight: {
      get() {
        return this.$refs.dynamic.offsetHeight;
      },
      set(val) {
        const a = window.document.getElementsByClassName("dynamic-list");
        a.offsetHeight = val;
      },
    },
  },
  data() {
    const typeList = [
      {
        name: "所有动态",
        value: 0,
      },
      {
        name: "仅评论",
        value: 3,
      },
    ];
    return {
      dynamicType: typeList[0],
      typeList,
      list: [],
      comment: "",
      commentForm: "",
      replyIndex: -1,
      pageOption: {
        current: 1,
        size: 10,
      },
      total: 0,
      pages: 0,
      params: {
        taskId: 0,
        type: 0,
      },
    };
  },
  methods: {
    handleSubmit() {
      if (this.comment === "") return;
      createComment({
        taskId: this.taskId,
        content: this.comment,
      }).then(() => {
        this.pageOption.current = 1;
        this.loadPage(true);
        this.comment = "";
      });
    },
    currentChange() {
      if (this.pages <= this.pageOption.current) return;
      ++this.pageOption.current;
      this.loadPage();
    },
    loadPage(type = false) {
      getCommentPage(Object.assign({}, this.params, this.pageOption)).then(
        ({ data }) => {
          this.total = data.total;
          this.pages = data.pages;
          if (type) {
            this.list = [...data.records];
          } else {
            this.list = this.list.concat(data.records);
          }
        },
      );
    },
  },
  watch: {
    taskId(val) {
      this.replyIndex = -1;
      this.replyRIndex = -1;
      this.params.taskId = val;
      this.dynamicType = this.typeList[0];
      if (val !== 0) {
        this.pageOption.current = 1;
        this.loadPage();
      } else {
        this.list = [];
      }
    },
    dynamicType(val) {
      this.params.type = val.value;
      this.pageOption.current = 1;
      if (+this.params.taskId) {
        this.loadPage(true);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.dynamic {
  padding: 15px 0 15px 15px;
  position: relative;
  .dynamic-type-list {
    display: flex;
    align-items: center;
    > i {
      font-size: 20px;
      margin-right: 10px;
    }
    .dropdown {
      vertical-align: text-bottom;
      .el-dropdown-link {
        font-size: 16px;
        cursor: pointer;
      }
    }
  }
  .dynamic-list {
    padding-top: 10px;
    height: 300px;
    overflow-y: scroll;
    margin-bottom: 10px;
    .dynamic-item {
      padding: 5px 0;
      .item-title {
        display: flex;
        justify-content: space-between;
        .avatar {
          margin-right: 10px;
          .avatar-img {
            width: 24px;
            height: 24px;
            border-radius: 5px;
            border: 1px solid $--border-color;
          }
        }
        .title {
          width: calc(100% - 174px);
          line-height: 24px;
          color: $--color-text-secondary;
        }
        .time {
          color: #babec0;
          width: 140px;
          text-align: right;
        }
      }
      .content {
        color: $--color-text-regular;
        font-size: 14px;
        display: flex;
        margin-top: 15px;
        .pre {
          flex: 1;
          margin: 0 20px 0 34px;
        }
        > span {
          color: $--color-text-secondary;
          cursor: pointer;
          display: flex;
          i {
            color: $--color-text-secondary;
            width: 16px;
            cursor: pointer;
          }
          span {
            font-size: 12px;
            line-height: 14px;
          }
          &:hover {
            color: $--color-primary;
            i {
              color: $--color-primary;
            }
          }
        }
      }
      .reply {
        margin: 20px;
        display: flex;
        .input {
          margin-right: 20px;
        }
        .button {
          color: #fff;
          background-color: $--color-primary;
        }
      }
      .reply-list {
        padding-left: 34px;
        .reply-item {
          margin: 23px 0 20px;
          .reply-title {
            display: flex;
            justify-content: space-between;
            .avatar {
              margin-right: 10px;
              .avatar-img {
                width: 24px;
                height: 24px;
                border-radius: 5px;
              }
            }
            .title {
              width: calc(100% - 174px);
              line-height: 24px;
              color: $--color-text-secondary;
            }
            .time {
              color: #babec0;
              width: 140px;
              text-align: right;
            }
          }
          .reply-content {
            color: $--color-text-regular;
            font-size: 14px;
            display: flex;
            margin-left: 34px;
            margin-top: 15px;
            .pre {
              flex: 1;
              margin-right: 20px;
            }
            i {
              width: 20px;
              cursor: pointer;
              &:hover {
                color: #f74437;
              }
            }
          }
        }
        .reply-pagination {
          margin: 10px 0 5px;
          text-align: center;
          &::v-deep .el-pagination {
            .btn-prev,
            li,
            .btn-next {
              background-color: #fff !important;
              border: 0 !important;
              height: 20px;
            }
          }
        }
      }
    }
    .no-data {
      text-align: center;
      .no-data-title {
        color: #bbb;
      }
    }
  }
  .dynamic-comment {
    position: absolute;
    bottom: 0;
    width: calc(100% - 20px);
    border-top: 1px solid #f2f2f2;
    &::v-deep .el-textarea__inner {
      border: 0;
      padding: 10px 0 0 0;
      resize: none;
    }
    .button-list {
      text-align: right;
      .button {
        height: 36px;
        padding: 0 20px;
        border-color: $--custom-menu-background-color;
        background-color: $--custom-menu-background-color;
        // color: #f74437;
        color: $--color-primary;
        &:hover {
          background-color: $--color-primary;
          border-color: $--color-primary;
          // background-color: #f74437;
          // border-color: #f74437;
          color: #fff;
        }
      }
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
</style>
