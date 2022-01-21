<template>
  <div class="items">
    <iep-popover-user-card :user-id="data.userId">
      <iep-img class="avatar" :src="data.avatar" alt></iep-img>
    </iep-popover-user-card>
    <div class="content-list">
      <div class="top">
        <div class="title">
          <div class="name">{{data.userName}}</div>
          <el-tag class="role" size="mini" v-if="data.isAdmin===2">负责人</el-tag>
          <el-tag class="role" size="mini" v-if="data.isAdmin===1">知事</el-tag>
        </div>
      </div>
      <!-- 说说的内容 -->
      <div class="content">
        <div class="article">{{data.content}}</div>
        <div class="image-list" v-if="data.images && data.images.length > 0">
          <iep-img
            v-for="(img, imgIndex) in data.images"
            :key="imgIndex"
            class="img"
            :src="img"
            :preview-src-list="dealImage(data.images, imgIndex)"
            fit="cover"
          ></iep-img>
        </div>
      </div>
      <div class="date">
        <i class="icon-shijian"></i>
        {{data.createTime}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IepSoDynamic",
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    dealImage(data, index) {
      let list = [];
      list = data.slice(index).concat(data.slice(0, index));
      return list;
    },
  },
};
</script>

<style lang="scss" scoped>
.items {
  padding: 30px 0 20px;
  width: 100%;
  display: flex;
  width: 100%;
  border-bottom: 1px solid $--border-color;
  &:nth-last-child(2) {
    border: 0;
  }
  &:nth-child(2) {
    padding-top: 0;
  }
  .avatar {
    margin-right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 10px;
    border: 1px solid $--border-color;
    .img {
      cursor: pointer;
      width: 50px;
      height: 50px;
      overflow: hidden;
      border: 1px solid $--border-color;
      transition: 0.5s;
      &:hover {
        opacity: 0.7;
      }
    }
  }
  .content-list {
    flex: 1;
    .top {
      display: flex;
      justify-content: space-between;
      .title {
        flex: 1;
        display: flex;
        align-items: center;
        .name {
          font-family: "微软雅黑";
          color: $--color-text-primary;
          margin-right: 10px;
          font-size: 14px;
        }
      }
    }
    .content {
      margin-top: 12px;
      .image-list {
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
        .img {
          width: 120px;
          height: 120px;
          border: 1px solid $--border-color;
        }
        .img:nth-of-type(n + 2) {
          margin-left: 20px;
        }
      }
      .article {
        font-size: 14px;
        color: $--color-text-regular;
      }
    }
    .date {
      margin-top: 20px;
      color: $--color-input-regular;
      font-size: 14px;
      i {
        font-size: 14px !important;
      }
    }
  }
}
.image-list ::v-deep .el-image-viewer__close {
  color: #fff;
  &:hover {
    opacity: 0.7;
  }
}
.image-list ::v-deep .el-image-viewer__actions__inner i {
  cursor: pointer;
}
</style>
