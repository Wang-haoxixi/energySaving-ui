<template>
  <div class="wrong" :style="{height:height}">
    <div class="image">
      <img src="/img/default/default-wrong.png" alt />
    </div>
    {{ message }}
  </div>
</template>
<script>
export default {
  name: "IepWrong",
  props: {
    message: {
      type: String,
      default: "无法访问",
    },
    height: {
      type: String,
      default: "auto",
    },
  },
};
</script>

<style lang="scss" scoped>
.wrong {
  // color: rgba(0, 0, 0, 0.25);
  text-align: center;
  line-height: 66px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .image {
    img {
      height: 100%;
      vertical-align: middle;
      border-style: none;
    }
  }
}
</style>
