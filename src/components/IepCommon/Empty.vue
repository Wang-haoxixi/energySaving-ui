<template>
  <div class="empty">
    <div class="empty__image">
      <img src="/img/default/default-nodata1.png" alt />
    </div>
    <p class="empty__desc">{{text}}</p>
  </div>
</template>
<script>
export default {
  name: "IepEmpty",
  props: {
    text: {
      type: String,
      default: "暂无数据",
    },
  },
};
</script>
<style lang="scss" scoped>
.empty {
  padding: 40px 0;
  margin: 0 8px;
  font-size: 14px;
  line-height: 22px;
  text-align: center;
  .empty__image {
    height: 100px;
    img {
      height: 100%;
      vertical-align: middle;
      border-style: none;
    }
  }
  .empty__desc {
    color: rgba(0, 0, 0, 0.65);
  }
}
</style>
