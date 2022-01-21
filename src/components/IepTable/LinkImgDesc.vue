<template>
  <div class="wrapper">
    <div class="img-wrapper" @click="handleClick">
      <i v-if="isIcon" class="img img-icon icon iconfont" :class="img"></i>
      <iep-img v-else class="img" :src="img" alt></iep-img>
    </div>
    <div>
      <iep-table-link :isDot="false" @click="handleClick" disabled>{{ name }}</iep-table-link>
      <div class="desc iep-ellipsis-flex" :title="desc">{{ desc }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "IepTableLinkImgDesc",
  props: ["img", "desc", "name"],
  computed: {
    isIcon() {
      return this.img.startsWith("icon-");
    },
  },
  methods: {
    handleClick() {
      this.$emit("m-click");
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.img-wrapper {
  cursor: pointer;
  padding: 5px;
  border: 1px solid $--border-color;
  height: 62px;
  margin: 5px 10px 5px 5px;
  & > .img {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
  }

  .img-icon {
    font-size: 30px;
    display: flex;
    justify-content: center;
  }
}
.desc {
  font-size: 12px;
  color: $--color-text-secondary;
}
</style>
