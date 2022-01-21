<template>
  <div class="app-more-thoughts">
    <IepNoData v-if="dataList.length == 0"></IepNoData>
    <div v-else>
      <div class="breadcrumb-wrapper">
        <span>当前位置：</span>
        <el-breadcrumb class="breadcrumb-item" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item
            v-for="item in routerMatch"
            :key="item.path"
            :to="{ path: item.path }"
          >{{item.name}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <search @load-page="searchPage" :num="total"></search>
      <div class="material">
        <div class="library">
          <div class="items" v-for="(item, index) in dataList" :key="index">
            <div class="avatar">
              <iep-img :src="item.avatar" @click.native="handleDetail(item.userId)" alt class="img"></iep-img>
            </div>
            <div class="content">
              <div class="top">
                <div class="title">
                  <div class="name" @click="handleDetail(item.userId)">{{item.userName}}</div>
                  <div class="date">{{getNumber(index)}}</div>
                  <div class="date">
                    <i class="icon-shijian"></i>
                    {{item.createTime}}
                  </div>
                </div>
                <!-- <el-button size="mini" round>只看此人</el-button> -->
              </div>
              <div class="item">{{item.content}}</div>
              <!-- 说说评论 -->
              <div class="comment" v-if="activeIndex == index">
                <el-input type="textarea" rows="4" v-model="form.replyMsg"></el-input>
                <iep-button class="comment-submit" @click="() => {activeIndex = -1}">取消</iep-button>
                <iep-button type="primary" class="comment-submit" @click="commentSubmit">提交</iep-button>
              </div>
              <!-- 评论列表 -->
              <div class="comment-list" v-if="item.thoughtsCommentList.length > 0">
                <div v-for="(t, i) in item.thoughtsCommentList" :key="i">
                  <commentTpl
                    :item="t"
                    :userInfo="{id: item.userId, name: item.userName}"
                    @load-page="loadPage"
                  ></commentTpl>
                  <commentTpl
                    v-for="(comItem, comIndex) in t.thoughtsReplyList"
                    :key="`${i}-${comIndex}`"
                    :item="comItem"
                    :userInfo="{id: t.commentUserId, name: t.realName}"
                    @load-page="loadPage"
                    :type="'reply'"
                  ></commentTpl>
                </div>
                <!-- <div v-show="isShow" style="text-align: right;margin: 20px 0;">
                  <el-pagination background layout="prev, pager, next" :total="total" :page-size="params.size" @current-change="currentChange"></el-pagination>
                </div>-->
              </div>
              <!-- 按钮组 -->
              <div class="footer">
                <div class="button" @click="hadnleAddUp(item)">
                  <i class="icon-like"></i>
                  点赞（{{item.thumbsUpCount}}）
                </div>
                <div class="button" @click="hadnleComment(item, index)">
                  <i class="icon-xiaoxi"></i>
                  评论（{{item.thoughtsCommentList.length}}）
                </div>
              </div>
            </div>
          </div>
          <div style="text-align: center;margin: 20px 0;">
            <el-pagination
              background
              layout="prev, pager, next"
              prev-text="上一页"
              next-text="下一页"
              :total="total"
              :page-size="params.size"
              @current-change="currentChange"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from "./Search";
import {
  getAllPage,
  CommentThoughts,
  addThumbsUpByRecord,
} from "@/api/dms/thoughts";
import commentTpl from "./commentTpl";
// import { mapActions } from "vuex";

const initParams = () => {
  return {
    current: 1,
    size: 10,
  };
};

const initFormData = () => {
  return {
    replyMsg: "",
    thoughtsId: 0,
  };
};

export default {
  components: { Search, commentTpl },
  data() {
    return {
      isShow: true,
      routerMatch: [
        {
          path: "/app/index",
          name: "首页",
        },
        {
          path: "/app/person",
          name: "国脉人",
        },
        {
          path: "/app/more_thoughts",
          name: "说说列表",
        },
      ],
      dataList: [{ thoughtsCommentList: [] }],
      total: 0,
      params: initParams(),
      activeIndex: -1,
      commontActiveIndex: -1,
      form: initFormData(),
      paramData: {},
    };
  },
  methods: {
    searchPage(params) {
      if (params) {
        this.paramData = Object({}, this.paramData, params);
      }
      this.loadPage();
    },
    loadPage() {
      getAllPage(this.params).then(({ data }) => {
        this.dataList = data.records;
        this.total = data.total;
        this.activeIndex = -1;
      });
    },
    handleDetail(id) {
      this.$router.push({
        path: `/app/personal_style/${id}`,
      });
    },
    currentChange(val) {
      this.params.current = val;
      this.loadPage();
    },
    hadnleComment(item, index) {
      this.activeIndex = index;
      this.form = {
        replyMsg: "",
        thoughtsId: item.thoughtsId,
      };
    },
    // 评论
    commentSubmit() {
      if (this.form.replyMsg == "") return;
      CommentThoughts(this.form).then(() => {
        this.loadPage();
      });
    },
    // 点赞
    hadnleAddUp(row) {
      addThumbsUpByRecord(row.thoughtsId).then(({ data, msg }) => {
        if (data) {
          this.loadPage();
        } else {
          this.$message.error(msg);
        }
      });
    },
    // 获取编号
    getNumber(index) {
      let number = this.total;
      number = number - (this.params.current - 1) * this.params.size - index;
      if (number < 10) {
        return "000" + number;
      } else if (number < 100) {
        return "00" + number;
      } else if (number < 1000) {
        return "0" + number;
      } else {
        return number;
      }
    },
  },
  created() {
    if (this.$route.query.id) {
      this.params.userId = this.$route.query.id;
    }
    this.loadPage();
  },
};
</script>
<style lang="scss" scoped>
.breadcrumb-wrapper {
  display: flex;
  align-items: center;
  margin: 20px auto 0;
  width: 1200px;
  font-size: 14px;
  span {
    margin-left: 3px;
  }
  .breadcrumb-item {
    display: flex;
    align-items: center;
    padding: 0;
    line-height: inherit;
  }
}
.material {
  width: 1200px;
  margin: 0 auto;
  .library {
    margin-top: 20px;
    .items {
      margin-bottom: 40px;
      display: flex;
      .name {
        cursor: pointer;
      }
      .avatar {
        margin-right: 20px;
        width: 50px;
        .img {
          cursor: pointer;
        }
      }
      .content {
        flex: 1;
        margin-top: 5px;
        .top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .comment {
          margin: 20px 0;
          text-align: right;
          .comment-submit {
            margin-top: 10px;
            margin-left: 10px;
            &:hover {
              color: $--color-primary;
              background-color: #feeceb;
            }
          }
        }
        .comment-list {
          padding: 15px 30px;
          background-color: #fafafa;
          margin-top: 15px;
          border-radius: 10px;
          .comment {
            margin: 0 10px;
            border-bottom: 1px solid $--border-color;
          }
        }
        .title {
          display: flex;
          align-items: center;
          .name {
            font-size: 16px;
            color: #2f80ff;
          }
          .date {
            padding-left: 15px;
            color: $--color-text-regular;
            i {
              font-size: 14px !important;
            }
            &:nth-of-type(3) {
              font-size: 14px;
              color: $--color-text-secondary;
            }
          }
        }
        &:nth-of-type(3) .date {
          color: $--color-text-secondary;
        }
        .item {
          margin-top: 7px;
        }
        .footer {
          margin-top: 20px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          font-size: 14px;
          .button {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-right: 20px;
            height: 20px;
            cursor: pointer;
            i {
              margin-right: 5px;
            }
            &:hover {
              color: #f74437;
              border-color: #f74437;
            }
          }
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.app-more-thoughts {
  .library {
    .items {
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: $--border-radius-base;
        img {
          width: 50px;
          height: 50px;
          border-radius: $--border-radius-base;
        }
      }
    }
  }
  .el-button--mini.is-round {
    font-size: 12px;
    padding: 4px 12px;
  }
}

.comment-list .el-pagination.is-background .el-pager li:not(.disabled).active {
  border: 1px solid $--border-color;
  background-color: #f1eff0;
  color: $--color-text-regular;
}

.comment-list
  .el-pagination.is-background
  .el-pager
  li:not(.disabled).active:hover {
  border-color: $--color-text-regular;
  background-color: $--color-text-regular;
  color: #fff;
}
.comment-list .el-pagination.is-background .el-pager li {
  background-color: #fff;
  border: 1px solid $--border-color;
  font-weight: 400;
}
.comment-list .el-pagination.is-background .el-pager li :hover {
  color: $--color-text-regular;
}
</style>

