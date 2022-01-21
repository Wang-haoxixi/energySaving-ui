<template>
  <div class="dynamic" ref="dynamic">
    <!-- 动态list -->
    <div class="dynamic-list" ref="dynamicList" v-infinite-scroll="currentChange">
      <div class="dynamic-item" v-for="(item, index) in list" :key="index">
        <div class="item-title">
          <!-- 1-发布任务 2-修改任务 3-协作者评论 4-回复 5-附件 -->
          <div class="avatar">
            <iep-img :src="item.avatar" class="avatar-img"></iep-img>
          </div>
          <div class="title" v-if="item.type === '1' || item.type === '2'">{{item.content}}</div>
          <div class="title" v-if="item.type === '3' || item.type === '5'">{{item.name}}发表了评论</div>
          <div class="time">{{item.createTime}}</div>
        </div>
        <div class="content" v-if="item.type === '3' || item.type === '5'">
          <div class="pre">{{item.content}}</div>
          <span @click="handleReply('replyIndex', index)" v-if="item.reply">
            <i class="el-icon-woneng-arrowup" v-if="index === replyIndex"></i>
            <i class="el-icon-woneng-arrowdown" v-else></i>
            <span v-if="item.reply">{{item.reply.total}}</span>
          </span>
        </div>
        <div class="download" v-if="item.type === '5' && item.commentAnnexes.length > 0">
          <div
            class="download-item"
            v-for="down in item.commentAnnexes"
            :key="down.id"
            @click="handleDownload(down)"
          >
            <div class="down-title nowrap" :title="down.original">{{down.original}}</div>
            <i class="el-icon-woneng-xiazai2"></i>
          </div>
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
  </div>
</template>

<script>
import replyMixin from "./replyMixin";
import { downloadFile } from "@/api/common";
import { getCommentPage } from "@/api/qms/cooperation_comment";

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
    return {
      list: [],
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
      formData: {},
    };
  },
  methods: {
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
    handleDownload(row) {
      downloadFile({
        url: row.attachFile,
        name: row.original,
      });
    },
  },
  watch: {
    taskId: {
      handler(val) {
        {
          // 任务id变为 0 的时候，表示弹框关闭，将所有数据清空
          this.replyIndex = -1;
          this.replyRIndex = -1;
          this.params.taskId = val;
          if (val !== 0) {
            this.pageOption.current = 1;
            this.loadPage();
          } else {
            this.list = [];
            this.formData = {};
          }
        }
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.dynamic {
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
    margin-bottom: 10px;
    .dynamic-item {
      margin-bottom: 15px;
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
          width: calc(100% - 200px);
          line-height: 24px;
          color: $--color-text-secondary;
          font-size: 14px;
        }
        .time {
          color: #babec0;
          width: 160px;
          text-align: right;
          font-size: 14px;
        }
      }
      .content {
        color: $--color-text-regular;
        font-size: 14px;
        display: flex;
        margin-top: 10px;
        .pre {
          flex: 1;
          margin: 0 20px 0 37px;
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
          margin: 15px 0 0px;
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
              width: calc(100% - 200px);
              line-height: 24px;
              color: $--color-text-secondary;
              font-size: 14px;
            }
            .time {
              color: #babec0;
              width: 160;
              text-align: right;
              font-size: 14px;
            }
          }
          .reply-content {
            color: $--color-text-regular;
            font-size: 14px;
            display: flex;
            margin-left: 52px;
            margin-top: 10px;
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
      .download {
        margin: 10px 2px 0 34px;
        .download-item {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          background-color: $--border-color;
          margin-bottom: 4px;
          border-radius: 3px;
          padding: 4px;
          cursor: pointer;
          .down-title {
            width: calc(100% - 20px);
          }
          i {
            cursor: pointer;
            line-height: 18px;
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
    .upload-list {
      width: calc(100% - 130px);
      overflow: hidden;
      display: flex;
      .upload-item {
        width: calc(100% - 20px);
        font-size: 12px;
      }
      > i {
        line-height: 20px;
        cursor: pointer;
      }
      .el-dropdown-link {
        width: 100%;
        display: flex;
        font-size: 12px;
        .dropdown-title {
          width: calc(100% - 20px);
        }
        > i {
          line-height: 20px;
          cursor: pointer;
        }
      }
    }
  }
}
.nowrap {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}
</style>
