<template>
  <div class="course-item">
    <iep-img class="cover" :src="item.cover" @click.native="handleClick"></iep-img>
    <div class="info">
      <div
        class="name iep-ellipsis-flex"
        :title="item.courseName"
        @click="handleClick"
      >{{item.courseName}}</div>
      <div class="learn-time">{{item.classCount}}课时</div>
      <div class="learn-number">{{item.studyNumber}}人学习</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["item"],
  methods: {
    handleClick() {
      this.$emit("click", this.item);
    },
  },
};
</script>
<style lang="scss" scoped>
.course-item {
  cursor: pointer;
  display: flex;
  border-radius: $--border-radius-base;
  &:hover .info {
    .name {
      color: $--color-primary;
    }
  }
  .cover {
    width: 100px;
    min-width: 100px;
    height: 60px;
    border-radius: $--border-radius-base;
    border: 1px solid $--border-color;
    box-sizing: border-box;
  }
  .info {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    color: $--color-text-secondary;
    .name {
      font-size: 14px;
      color: $--color-text-primary;
    }
    .learn-time {
      margin: 3px 0 2px;
    }
  }
}
</style>
