<template>
  <div class="item-box" :class="{gray:_hide}" @click="handleSelect()">
    <div class="user">
      <iep-img class="avatar" :resizeOpt="{l:40}" :src="item.avatar"></iep-img>
      <div class="name" :title="item.name">{{item.name}}</div>
    </div>
    <el-button class="btn" type="text" v-if="!_hide" :disabled="disabled">选择</el-button>
  </div>
</template>

<script>
export default {
  props: {
    disabled: {
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
  inject: ["$computedLimitUserIds"],
  computed: {
    limitUserIds() {
      return this.$computedLimitUserIds();
    },
    _hide() {
      return this.limitUserIds.includes(this.item.id);
    },
  },
  methods: {
    handleSelect() {
      if (this._hide) {
        return;
      }
      if (this.disabled) {
        this.$emit("unselect", this.item);
      } else {
        this.$emit("select", this.item);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.item-box {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  justify-content: space-between;
  .user {
    display: flex;
    align-items: center;
  }
  .name {
    margin-left: 10px;
    max-width: 116px;
    font-size: 14px;
    color: $--color-text-regular;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &:hover,
  &:focus {
    outline: none;
  }
  .is-disabled {
    cursor: pointer !important;
  }
}
.item-box .avatar {
  height: 40px;
  width: 40px;
  border: 1px solid $--border-color;
}
.gray {
  // filter: grayscale(100%);
  cursor: not-allowed;
}
</style>
