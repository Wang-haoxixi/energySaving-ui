<template>
  <div class="thoughts">
    <!-- <headTpl class="fillin" @load-page="search"></headTpl> -->

    <div class="timeline">
      <el-col class="search">
        <div class="item">
          <el-date-picker
            v-model="searchData.createTime"
            value-format="yyyy-MM-dd 23:59:59"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </div>
        <iep-button type="info" @click="search">搜索</iep-button>
      </el-col>
      <el-col v-loading="loading">
        <time-line :list="list" ref="timeline" @getMore="getMore" @getUpMore="getUpMore">
          <template #content="{row, index}">
            <div class="template">
              <!-- 说说主体内容 -->
              <div class="content">
                <div class="left">
                  <div class="pre" :title="row.content">{{row.content}}</div>
                  <div class="img-list">
                    <iep-img
                      class="img"
                      v-for="(item, imgIndex) in row.images"
                      :key="imgIndex"
                      :src="item"
                      fit="cover"
                      :preview-src-list="dealImage(row.images, imgIndex)"
                    ></iep-img>
                  </div>
                  <div class="tags-list" v-if="row.tags && row.tags.length > 0">
                    <el-tag
                      class="tag"
                      v-for="(item, index) in row.tags"
                      :key="index"
                      type="info"
                      size="mini"
                    >{{item}}</el-tag>
                  </div>
                </div>
                <div class="right">
                  <i class="el-icon-delete" @click="handleDelete(row, index)"></i>
                  <i
                    class="el-icon-woneng-suo"
                    v-if="row.status === '0'"
                    @click="handleOpen(row, index)"
                  ></i>
                  <i class="el-icon-woneng-suoding" v-else @click="handleOpen(row, index)"></i>
                </div>
              </div>
              <!-- 按钮列 -->
              <div class="footer">
                <!-- 点赞 -->
                <el-popover placement="right-start" title trigger="hover" :content="reference">
                  <div
                    slot="reference"
                    class="icon-button"
                    @click="hadnleAddUp(row,index)"
                    @mouseenter="mouseenterUp(row)"
                    @mouseleave="mouseleaveUp"
                    :class="row.praiseStatus > 0 ? 'red' : ''"
                  >
                    <i class="el-icon-woneng-zai"></i>
                    <span class="number">{{row.thumbsUpCount || ''}}</span>
                  </div>
                </el-popover>

                <!-- 评论 -->
                <div class="icon-button" @click="activeChange(row)">
                  <i class="el-icon-woneng-file-word1"></i>
                  <span class="number">{{row.commentNum || ''}}</span>
                </div>
                <!-- 分享 -->
                <div class="icon-button" @click="handleForward(row)">
                  <i class="el-icon-woneng-share1"></i>
                  <span class="number">{{row.transmittedTimes || ''}}</span>
                </div>
              </div>
              <!-- 评论列表 -->
              <div class="comment-list" v-if="activeIndex === row.thoughtsId">
                <CommentPage
                  ref="comment"
                  :data="row"
                  @cancal="() => {activeIndex = 0;}"
                  @fresh-data="freshData(row, index)"
                ></CommentPage>
              </div>
            </div>
          </template>
        </time-line>
      </el-col>
    </div>
    <open-select ref="optenSelect" @opten-select="optenSelct"></open-select>
    <forwardDialog ref="forward" @load-page="loadPage"></forwardDialog>
  </div>
</template>

<script>
import TimeLine from "./timeline";
import {
  addThumbsUpByRecord,
  getThumbMembers,
  getThoughtsPage,
  thoughtsDelete,
  postStatusBatch,
  getDetailById,
} from "@/api/dms/thoughts";
import { mapGetters } from "vuex";
// import headTpl from "@/views/channel/thought/library/form";
import OpenSelect from "./OpenSelect";
import CommentPage from "./comment/index";
import forwardDialog from "@/views/channel/thought/forwardDialog";

function initFormData() {
  return {
    content: "",
    status: 0, // 0开放、1不开放
    images: [],
    tags: [],
  };
}

export default {
  name: "thoughts",
  components: { TimeLine, OpenSelect, CommentPage, forwardDialog },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  data() {
    return {
      activeIndex: 0,
      formData: initFormData(),
      createValidate: false,
      searchData: {
        createTime: "",
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      loading: false,
      list: [],
      params: {
        current: 1,
        size: 10,
      },
      updateIndex: -1,
      reference: "加载中...",
    };
  },
  methods: {
    // 获取更多
    getMore() {
      ++this.params.current;
      this.loadPage();
    },
    // 向上取更多
    getUpMore() {},
    // 展开
    activeChange(row, state = true) {
      this.activeIndex = state ? row.thoughtsId : 0;
    },
    handleOpen(row, index) {
      this.$confirm(
        `是否将此条说说${row.status === "0" ? "隐藏" : "公开"}`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        },
      )
        .then(() => {
          this.optenSelct(row, index);
        })
        .catch(() => {});
    },
    optenSelct(row, index) {
      postStatusBatch({
        status: row.status === "0" ? 1 : 0,
        ids: [row.thoughtsId],
      }).then(() => {
        // const page = parseInt(this.updateIndex / this.params.size);
        // this.list = this.list.splice(0, page * 10);
        // this.params.current = page + 1;
        // this.loadPage();
        this.freshData(row, index);
        this.$message.success("更改成功");
      });
    },
    search() {
      this.list = [];
      this.params.current = 1;
      this.loadPage();
    },
    async loadPage() {
      this.loading = true;
      const { data } = await getThoughtsPage(
        Object.assign({}, this.params, this.searchData),
      );
      this.loading = false;
      if (data.records.length == 0) {
        this.$message.info("暂无更多数据");
        return;
      }
      this.list = this.list.concat(data.records);
    },
    handleDelete(row, index) {
      this.$confirm("是否删除此条数据", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        thoughtsDelete([row.thoughtsId]).then(() => {
          // 判断删除的是第几页的数据，重新开始获取
          const page = parseInt(index / this.params.size);
          this.list = this.list.splice(0, page * 10);
          this.params.current = page + 1;
          this.loadPage();
          this.$message.success("删除成功");
        });
      });
    },
    dealImage(data, index) {
      let list = [];
      list = data.slice(index).concat(data.slice(0, index));
      return list;
    },
    // 单条刷新
    freshData(row, index) {
      // console.log("row: ", row, index);
      getDetailById(row.thoughtsId).then(({ data }) => {
        if (data) {
          data.activeIndex = this.list[index].activeIndex;
          // this.list[index] = { ...data };
          this.$set(this.list, index, data);
        }
      });
    },
    hadnleAddUp(row, index) {
      addThumbsUpByRecord(row.thoughtsId).then(({ data, msg }) => {
        if (data) {
          this.freshData(row, index);
        } else {
          this.$message.error(msg);
        }
      });
    },
    mouseenterUp(row) {
      if (row.thumbsUpCount > 0) {
        getThumbMembers(row.thoughtsId).then(({ data }) => {
          this.reference = data.map(m => m.name).join("、");
        });
      } else {
        this.reference = "暂无人点赞";
      }
    },
    mouseleaveUp() {
      setTimeout(() => {
        this.reference = "加载中...";
      }, 300);
    },
    //转发
    handleForward(row) {
      this.$refs["forward"].open(row);
    },
  },
  created() {
    this.params.id = this.userInfo.userId;
    this.loadPage();
  },
};
</script>

<style lang="scss" scoped>
.red {
  color: $--color-primary !important;
}
.thoughts {
  margin-right: 0;
  .fillin {
    padding: 10px 0 20px;
    border-bottom: 1px solid $--border-color;
  }
  .timeline {
    // padding: 20px 0 0;
    .search {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      justify-content: flex-end;
      .item {
        display: inline-block;
        width: 220px;
        margin-right: -1px;
      }
    }
    .writing {
      color: #e47e33;
    }
    .template {
      padding: 20px 5px 15px 20px;
      .content {
        display: flex;
        flex-wrap: wrap;
        .left {
          width: calc(100% - 50px);
          .pre {
            max-width: 680px;
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .img-list {
            margin-top: 15px;
            margin-bottom: -15px;
            display: flex;
            flex-wrap: wrap;
            .img {
              width: 200px;
              height: 200px;
              margin: 0 15px 15px 0;
              cursor: pointer;
              ::v-deep img {
                min-height: 200px;
              }
            }
          }
          .tags-list {
            margin: 5px 0 0;
            .tag {
              margin: 10px 10px 0 0;
            }
          }
        }
        .right {
          text-align: right;
          padding-right: 4px;
          width: 30px;
          i {
            cursor: pointer;
            font-size: 18px;
            color: $--color-text-regular;
            &:hover {
              opacity: 0.7;
            }
          }
          .suoding {
            color: $--color-primary;
          }
          // .weisuoding {
          //   color: #989898;
          // }
        }
        .footer {
          width: 100%;
          margin-top: 15px;
          .error {
            display: inline-block;
            font-size: 12px;
            color: $--color-primary;
            margin-left: 10px;
          }
        }
      }
      .footer {
        display: flex;
        margin-top: 20px;
        color: $--color-text-secondary;
        .icon-button {
          font-size: 14px;
          margin-right: 25px;
          cursor: pointer;
          i {
            margin-right: 3px;
            font-size: 16px !important;
          }
          span {
            line-height: 10px;
          }
          &:hover {
            opacity: 0.7;
          }
        }
      }
      .comment-list {
        padding: 15px 30px 0 0;
        text-align: right;
        border-radius: 10px;
      }
    }
  }
}
.search ::v-deep .el-input--prefix .el-input__inner {
  border-radius: 10px 0 0 10px;
  text-indent: 20px;
}
.search ::v-deep .el-button {
  margin-left: -1px;
  height: 42px;
  border-radius: 0 10px 10px 0;
}
</style>
