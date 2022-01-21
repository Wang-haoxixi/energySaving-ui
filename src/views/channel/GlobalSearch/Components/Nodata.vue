<template>
  <div class="list-box">
    <div class="describe-box">
      <img src="/img/default/default-nodata.png" alt="nodata" />
      <p class="text">
        没有搜索到相关内容
        <span v-if="isShowAddSo">
          ，赶紧以“&nbsp;
          <span class="keyword">{{$route.query.keyword}}</span>”&nbsp;为主题去创建一个组织吧
        </span>
      </p>
      <el-button
        v-if="isShowAddSo"
        type="primary"
        class="iep-btn-long"
        @click="$openPage('/my/create_org')"
      >立即创建</el-button>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    isShowAddSo() {
      if (this.$route.path.endsWith("org")) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.describe-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  .text {
    span.keyword {
      font-size: 18px;
      color: $--color-primary;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
