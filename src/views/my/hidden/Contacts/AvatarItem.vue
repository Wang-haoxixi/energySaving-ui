<template>
  <div class="item-box" @click="handleSelect()">
    <div class="avatar" :class="{mentorActive:isMentor}" :data-text="unit">
      <iep-img :resizeOpt="{l:40}" :src="item.avatar"></iep-img>
    </div>
    <div class="name" :title="item.name">{{item.name}}</div>
  </div>
</template>

<script>
export default {
  props: {
    isMentor: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object,
      default: () => {
        return {
          id: 0,
          name: "",
          avatar: "",
        };
      },
    },
  },
  computed: {
    unit() {
      return this.item.mentorship === 1 ? "师" : "徒";
    },
  },
  methods: {
    handleSelect() {
      this.$emit("select", this.item.id);
    },
  },
};
</script>
<style lang="scss" scoped>
.item-box {
  display: flex;
  align-items: center;
  padding: 10px;
  .name {
    margin-left: 10px;
    max-width: 160px;
    font-size: 14px;
    color: $--color-text-regular;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &:hover,
  &:focus {
    cursor: pointer;
    outline: none;
  }
}
.item-box .avatar {
  position: relative;
  min-width: 40px;
  width: 40px;
  height: 40px;
  border: 1px solid $--border-color;
  border-radius: 10px;
  overflow: hidden;
  &.mentorActive::after {
    content: attr(data-text);
    position: absolute;
    right: 0;
    bottom: 0;
    height: 18px;
    width: 18px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    line-height: 18px;
    background: $--color-primary;
    border-radius: 5px 0 0 0;
  }
}
</style>
