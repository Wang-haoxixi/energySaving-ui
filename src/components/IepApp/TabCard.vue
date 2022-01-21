<template>
  <el-card class="index-card" shadow="never">
    <div slot="header" class="title-con clearfix">
      <span class="title">
        {{title}}
        <slot name="left"></slot>
        <span class="datas">{{data}}</span>
        <i class="iconfont icon-wenhao" v-if="icon"></i>
      </span>
      <span class="tip">{{tip}}</span>
      <slot name="statistics"></slot>
      <el-button class="btn" type="text" v-if="isMore" @click="getMore">更多></el-button>
      <slot name="right"></slot>
    </div>
    <slot></slot>
  </el-card>
</template>
<script>
export default {
  name: "IepAppTabCard",
  props: {
    title: {
      type: String,
      default: "标题",
    },
    isMore: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: Boolean,
      default: false,
    },
    linkName: {
      type: String,
      default: "/app/index",
    },
    data: {
      type: String,
      default: "",
    },
    tip: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  methods: {
    getMore() {
      this.$router.push({
        path: this.linkName,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.title-con {
  display: flex;
  justify-content: space-between;
}
.title {
  flex: 2;
  font-size: 18px;
  font-family: "微软雅黑";
  color: $--color-text-primary;
  margin: 0 4px;
  height: 22px;
  line-height: 22px;
}
.btn {
  margin-right: 5px;
  padding: 0;
  height: 22px;
  line-height: 22px;
  color: $--color-text-secondary;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    color: $--color-primary;
  }
}
.datas {
  margin-left: 5px;
  font-size: 16px;
  color: $--color-text-secondary;
}
.tip {
  margin-left: 5px;
  font-size: 14px;
  color: $--color-text-regular;
}
.iconfont {
  margin-left: 5px;
  color: $--color-text-secondary;
  cursor: pointer;
}
</style>
<style scoped>
.index-card >>> .el-card__header {
  padding: 20px 0 20px;
  height: 54px;
}
.index-card >>> .el-card__body {
  padding: 20px 0;
}
.el-card {
  padding: 0 20px !important;
}
</style>



