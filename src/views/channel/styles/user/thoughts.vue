<template>
  <div class="styles-wrap" v-loading="loading">
    <div class="title">TA的说说</div>
    <div class="thought-box-list">
      <div class="thought-box-list-item" v-for="(item,index) in pagedTable" :key="item.id">
        <div class="thought-item">
          <i class="time">{{$options.filters.parseDate(item.createTime,"YYYY年M月")}}</i>
          <p :data-text="$options.filters.parseDate(item.createTime ,'D日')">
            <span class="thought-content">
              <div class="iep-ellipsis-4-flex" :title="item.content">{{item.content}}</div>
              <!-- 关联元素 -->
              <Attach :data="item"></Attach>
              <div class="image-list" v-if="item.images.length > 0">
                <iep-img
                  v-for="(i, index) in item.images"
                  :src="i"
                  :key="index"
                  class="img"
                  :resizeOpt="{l:140}"
                  :preview-src-list="dealImage(item.images, index)"
                  fit="cover"
                ></iep-img>
              </div>
              <div class="btn-group">
                <el-popover
                  class="button"
                  placement="left-start"
                  title
                  width="200"
                  trigger="hover"
                  :content="reference"
                  :close-delay="0"
                >
                  <div
                    slot="reference"
                    class="button"
                    @click="hadnleAddUp(item, index)"
                    @mouseenter="mouseenterUp(item)"
                    :class="item.praiseStatus > 0 ? 'red' : ''"
                    title="点赞"
                  >
                    <i class="el-icon-woneng-zai" :class="{'isPraise': item.praiseStatus === 1}"></i>
                    <span v-if="item.thumbsUpCount">{{item.thumbsUpCount}}</span>
                  </div>
                </el-popover>
              </div>
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="page" v-if="pagedTable.length > 0">
      <iep-pagination
        @size-change="handlePaginationSizeChange"
        @current-change="handlePaginationCurrentChange"
        :pagination-option="pagination"
        :layout="layout"
        background
      ></iep-pagination>
    </div>
  </div>
</template>
<script>
import Attach from "@/views/channel/thought/library/Attach";
import mixins from "@/mixins/mixins";
import { getThoughtsPage } from "@/api/dms/thoughts";
import {
  addThumbsUpByRecord,
  getThumbMembers,
  getDetailById,
} from "@/api/dms/thoughts";
export default {
  components: {
    Attach,
  },
  mixins: [mixins],
  data() {
    return {
      isRoute: true,
      iepPageSize: 10,
      layout: "prev, pager, next",
      reference: "加载中...",
      loading: false,
    };
  },
  mounted() {
    this.loadPage();
  },
  methods: {
    async loadPage(param = { ...this.searchForm }) {
      const params = {
        id: this.$route.params.id,
      };
      this.loading = true;
      await this.loadTable({ ...param, ...params }, getThoughtsPage);
      this.loading = false;
    },
    dealImage(data, index) {
      let list = [];
      list = data.slice(index).concat(data.slice(0, index));
      return list;
    },
    // 点赞
    hadnleAddUp(row, index) {
      addThumbsUpByRecord(row.thoughtsId).then(({ data }) => {
        if (data) {
          this.freshComment(row.thoughtsId, index);
          this.mouseenterUp(row, true);
        }
      });
    },
    mouseenterUp(row, type = false) {
      if (row.thumbsUpCount > 0 || type) {
        getThumbMembers(row.thoughtsId).then(({ data }) => {
          if (data.length === 0) {
            this.reference = "暂无人点赞";
          } else {
            this.reference = data.map(m => m.name).join("、");
          }
        });
      } else {
        this.reference = "暂无人点赞";
      }
    },
    freshComment(id, index) {
      getDetailById(id).then(({ data }) => {
        if (data) {
          data.activeIndex = this.pagedTable[index].activeIndex;
          this.$set(this.pagedTable, index, data);
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped >
.styles-wrap {
  background: #fff;
  border-radius: 10px;
  padding: 20px;
}
.title {
  margin-bottom: 30px;
  font-size: 16px;
  font-family: "微软雅黑";
  color: $--color-text-primary;
}
.thought-box-list {
  .thought-box-list-item {
    position: relative;
    overflow: hidden;
    &::before {
      position: absolute;
      content: "";
      top: 0;
      left: 12.2%;
      bottom: 0;
      width: 1px;
      background-color: $--border-color;
    }
    &:last-of-type::before {
      background-color: transparent;
    }
    .thought-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 30px;
      font-size: 14px;
      color: $--color-text-regular;
    }
    i {
      flex: 0 0 68px;
      margin: 8px 0;
      margin-right: 10px;
      font-style: normal;
    }
    p {
      position: relative;
      margin: 0;
      padding-top: 5px;
      padding-left: 60px;
      flex: 0 0 650px;
      text-align: justify;
      min-height: 50px;
      &::before {
        position: absolute;
        content: attr(data-text);
        top: 0;
        left: 0;
        width: 34px;
        height: 34px;
        font-size: 12px;
        text-align: center;
        line-height: 34px;
        background: #fff;
        border: 1px solid $--border-color;
        border-radius: 50%;
        color: $--color-text-regular;
      }
      .thought-content {
        padding: 18px;
        box-sizing: border-box;
        background: $--background-color;
        border-radius: $--border-radius-base;
        display: block;
        .attach {
          background: #fff;
        }
        .image-list {
          margin: 20px -10px 0 0;
          display: flex;
          flex-wrap: wrap;
          .img {
            margin: 0 10px 10px 0;
            width: 140px;
            height: 140px;
            border: 1px solid $--border-color;
          }
        }
      }
      .btn-group {
        display: flex;
        .button {
          cursor: pointer;
          color: $--color-text-secondary;
          .isPraise {
            color: $--color-primary !important;
          }
        }
      }
    }
  }
}
</style>
