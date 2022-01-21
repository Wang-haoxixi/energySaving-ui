<template>
  <iep-basic-container class="examine-container">
    <div class="thought">
      <div class="avatar">
        <iep-popover-user-card :user-id="data.commentUserId">
          <iep-img :src="data.avatar" alt class="img"></iep-img>
        </iep-popover-user-card>
      </div>
      <div class="body">
        <div class="head">
          <div class="name">{{data.realName}}</div>
          <div class="to">评论</div>
          <div class="date">{{data.createTime}}</div>
        </div>
        <div class="content">{{data.replyMsg}}</div>
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
      }
      .date {
        color: $--color-text-secondary;
      }
    }
  }
}
</style>
