<template>
  <div class="comment-wrapper">
    <div class="score-show">
      <div class="score-total">
        <template v-if="rank.star">
          <div class="number">{{rank.star}}</div>
          <el-rate :value="rank.star" disabled></el-rate>
        </template>
        <div v-else class="rate-text">暂无评分</div>
        <el-button class="btn-scoring" v-if="isScore" type="primary" @click="handleComment()">打分并评价</el-button>
      </div>
      <div class="score-rank">
        <div class="score-item" v-for="item in rank.distributed" :key="item.rank">
          <div class="label">
            <i v-for="o in item.rank" :key="o" class="el-icon-star-on"></i>
          </div>
          <el-progress class="progress" :percentage="item.rate" :stroke-width="15" color="#BABEC0"></el-progress>
        </div>
      </div>
    </div>
    <div class="comment-list">
      <h4>评分及评论</h4>
      <iep-no-data v-if="!pagedTable.length" message="暂无评论" complex></iep-no-data>
      <div class="comment-item" v-for="item in pagedTable" :key="item.id">
        <div class="user">
          <iep-img class="avatar" :resizeOpt="{l:50}" :src="item.userImg"></iep-img>
          <div class="user-info">
            <div class="name">{{item.commentator}}</div>
            <div class="time">{{item.createTime | formatTime}}</div>
          </div>
        </div>
        <div class="content">
          <div class="rank">
            <el-rate :value="item.rank" text-color="#919397" :texts="texts" show-text disabled></el-rate>
          </div>
          <div class="value" :title="item.content">{{item.content}}</div>
        </div>
      </div>
      <div style="text-align: center;margin: 30px 0;" v-if="pagedTable.length > 0">
        <iep-pagination
          @size-change="handlePaginationSizeChange"
          @current-change="handlePaginationCurrentChange"
          :pagination-option="pagination"
          :layout="layout"
          prev-text="上一页"
          next-text="下一页"
          background
        ></iep-pagination>
      </div>
    </div>
    <IepDialogComment ref="IepDialogComment" @load-page="refresh()"></IepDialogComment>
  </div>
</template>
<script>
import { rateTexts } from "@/config/defaultSettings";
import mixins from "@/mixins/mixins";
import { getRank, getCommentPage } from "@/api/dms/shop_comment";
export default {
  mixins: [mixins],
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    isScore: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isRoute: false,
      layout: "prev,pager,next",
      iepPageSize: 10,
      value: 4.5,
      texts: rateTexts,
      rank: {
        score: 0,
        star: 0,
        distributed: [],
      },
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.loadPage();
    });
  },
  methods: {
    refresh() {
      this.loadPage();
      this.loadRank();
    },
    handleComment() {
      this.$refs["IepDialogComment"].dialogShow = true;
      this.$refs["IepDialogComment"].form.name = this.name;
      this.$refs["IepDialogComment"].form.targetId = this.id;
    },
    async loadRank() {
      const { data } = await getRank(this.id);
      if (data) {
        this.rank = data;
        this.$emit("updateStar", this.rank.star);
      }
    },
    async loadPage(param = { ...this.searchForm, targetId: this.id }) {
      // console.log(this.type, this.id);
      await this.loadTable(param, getCommentPage);
    },
  },
  watch: {
    "$route.params.id": function () {
      this.loadPage();
    },
  },
};
</script>
<style lang="scss" scoped>
.comment-list {
  margin-top: 20px;
  h4 {
    font-size: 16px;
    font-family: "微软雅黑";
    color: $--color-text-primary;
  }
  .comment-item {
    display: flex;
    padding: 20px;
    height: 115px;
    background: $--background-color;
    border-radius: $--border-radius-base;
    margin-bottom: 20px;
    box-sizing: border-box;
    .user {
      display: flex;
      flex: 0 0 150px;
      width: 150px;
      margin-right: 20px;
      .avatar {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
      .user-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 50px;
        font-size: 14px;
        .name {
          font-family: "微软雅黑";
          color: $--color-text-primary;
        }
        .time {
          color: $--color-text-secondary;
        }
      }
    }
    .content {
      font-size: 14px;
      .rank {
        margin-top: -5px;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        span {
          display: inline-block;
          height: 22px;
          line-height: 24px;
          color: $--color-text-secondary;
        }
      }
      .value {
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
  }
}

.score-show {
  display: flex;
  .score-total {
    flex: 0 0 150px;
    height: 140px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    .rate-text {
      font-size: 14px;
      color: $--color-input-regular;
    }
    .btn-scoring {
      padding: 0;
      height: 36px;
      width: 100px;
      text-align: center;
    }
    .number {
      font-size: 48px;
      line-height: 45px;
      font-family: "微软雅黑";
      color: $--color-text-primary;
    }
  }
  .score-rank {
    width: 100%;
    flex: 1;
    display: flex;
    padding-left: 10px;
    flex-direction: column;
    justify-content: space-around;
    .score-item {
      display: flex;
      align-items: center;
      .label {
        width: 120px;
        line-height: 20px;
        padding: 0 10px;
        display: flex;
        justify-content: flex-end;
        i {
          font-size: 20px;
          color: #babec0;
        }
        span {
          font-size: 14px;
          margin-right: 5px;
          color: $--color-text-regular;
        }
      }
      .progress {
        width: 100%;
        flex: 1;
      }
    }
  }
}
.progress ::v-deep .el-progress-bar {
  margin-right: -44px;
}
.progress ::v-deep .el-progress__text {
  margin-left: 8px;
  font-size: 14px !important;
}

.progress ::v-deep .el-progress-bar__outer {
  height: 10px !important;
}
</style>
