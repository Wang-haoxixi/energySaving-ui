<template>
  <iep-basic-container class="examine-container">
    <div class="thought">
      <div class="avatar">
        <iep-popover-user-card :user-id="data.userId">
          <iep-img :src="data.avatar" alt class="img"></iep-img>
        </iep-popover-user-card>
      </div>
      <div class="body">
        <div class="head">
          <div class="name">{{data.userName}}</div>
          <div class="date">{{data.createTime}}</div>
        </div>
        <pre class="content">{{data.content}}</pre>
        <div class="image-list" v-if="data.images.length > 0">
          <iep-img
            :src="item"
            v-for="(item, index) in data.images"
            :key="index"
            class="img"
            :preview-src-list="dealImage(data.images, index)"
            fit="cover"
          ></iep-img>
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
      default: () => {
        return {
          images: [],
        };
      },
    },
  },
  data() {
    return {};
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
      display: flex;
      margin-bottom: 10px;
      line-height: 14px;
      .name {
        margin-right: 15px;
      }
      .date {
        font-size: 12px;
        color: $--color-text-secondary;
      }
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
    pre {
      line-height: 14px;
      white-space: pre-wrap; /* css3.0 */
      white-space: -moz-pre-wrap; /* Firefox */
      white-space: -pre-wrap; /* Opera 4-6 */
      white-space: -o-pre-wrap; /* Opera 7 */
      word-wrap: break-word; /* Internet Explorer 5.5+ */
    }
  }
}
</style>
