<template>
  <iep-basic-container class="examine-container">
    <div class="thought">
      <div class="avatar">
        <iep-popover-user-card :user-id="data.createBy">
          <iep-img :src="data.avatar" alt class="img"></iep-img>
        </iep-popover-user-card>
      </div>
      <div class="body">
        <div class="item-title">
          <!-- 1-发布任务 2-修改任务 3-协作者评论 4-回复 5-附件 -->
          <div class="title" v-if="data.type === '1' || data.type === '2'">{{data.content}}</div>
          <div class="title" v-if="data.type === '3' || data.type === '5'">{{data.name}}发表了评论</div>
          <div class="time">{{data.createTime}}</div>
        </div>
        <div class="content" v-if="data.type === '3' || data.type === '5'">
          <div class="pre">{{data.content}}</div>
          <span @click="handleReply('replyIndex', index)">
            <i class="el-icon-woneng-pinglun1"></i>
            <span v-if="data.reply">{{data.reply.total}}</span>
          </span>
        </div>
        <div class="download" v-if="data.type === '5' && data.commentAnnexes.length > 0">
          <div class="download-item" v-for="down in data.commentAnnexes" :key="down.id">
            <div class="down-title nowrap" :title="down.original">{{down.original}}</div>
            <i class="el-icon-woneng-xiazai2"></i>
          </div>
        </div>
      </div>
    </div>
  </iep-basic-container>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.thought {
  background-color: #f9f9f9;
  border-radius: $--border-radius-base;
  display: flex;
  padding: 20px;
  .avatar {
    margin-right: 20px;
    width: 50px;
    height: 50px;
    border-radius: $--border-radius-base;
    border: 1px solid $--border-color;
    .img {
      cursor: pointer;
      width: 50px;
      height: 50px;
      border-radius: $--border-radius-base;
      overflow: hidden;
    }
  }
  .body {
    .head {
      margin-bottom: 10px;
      display: flex;
      .name {
        margin-right: 15px;
        color: #4c6f8d;
      }
      .to {
        margin-right: 15px;
      }
      .date {
        color: $--color-text-secondary;
      }
    }
  }
}
</style>