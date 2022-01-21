<template>
  <div>
    <div class="title">TA的说说</div>
    <iep-no-data v-if="!dataList.length" complex></iep-no-data>
    <div v-else class="thought-box-list">
      <div class="thought-box-list-item" v-for="item in dataList" :key="item.id">
        <i class="time">{{$options.filters.parseDate(item.createTime,"YYYY年M月")}}</i>
        <p
          :data-text="$options.filters.parseDate(item.createTime ,'D日')"
          :title="_filterContent(item.content)"
          class="iep-ellipsis-2-flex"
        >{{_filterContent(item.content)}}</p>
      </div>
    </div>
    <load-more v-if="dataList.length>=5" path="thoughts"></load-more>
  </div>
</template>
<script>
import { getThoughtsListByUserId } from "@/api/dms/thoughts";
import LoadMore from "./LoadMore";
export default {
  components: {
    LoadMore,
  },
  data() {
    return {
      dataList: [],
    };
  },
  mounted() {
    this.loadPage();
  },
  methods: {
    _filterContent(content) {
      if (content === undefined) {
        return "[分享内容]";
      }
      if (content.trim() === "") {
        return "[分享图片]";
      }
      return content;
    },
    loadPage() {
      getThoughtsListByUserId(this.$route.params.id, 5).then(({ data }) => {
        this.dataList = data;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.title {
  margin-bottom: 30px;
  font-size: 16px;
  font-family: "微软雅黑";
  color: $--color-text-primary;
}
.thought-box-list {
  position: relative;
  &::before {
    position: absolute;
    content: "";
    top: 10px;
    left: 96px;
    bottom: 0;
    width: 1px;
    background-color: $--border-color;
  }
  .thought-box-list-item {
    display: flex;
    align-items: flex-start;
    margin: 10px 0;
    font-size: 14px;
    color: $--color-text-regular;
    &:nth-child(1) {
      margin-top: 0;
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
    }
  }
}
</style>
