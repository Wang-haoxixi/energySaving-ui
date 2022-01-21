<template>
  <button
    class="ican-btn"
    :class="{
      'ican-btn-primary':type==='primary',
      'ican-btn-background-ghost':type==='ghost',
      'ican-btn-background-plain':type==='plain',
      'ican-btn-block':block===true
    }"
    @click="handleClick"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
  >
    <i class="el-icon-loading" v-if="loading"></i>
    <i :class="icon" v-if="icon && !loading"></i>
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>
<script>
export default {
  name: "IcanButton",
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
    block: {
      type: Boolean,
      default: false,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  inject: {
    elForm: {
      default: "",
    },
    elFormItem: {
      default: "",
    },
  },
  computed: {
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    buttonSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    },
    buttonDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    },
  },
  methods: {
    handleClick(evt) {
      this.$emit("click", evt);
    },
  },
};
</script>

<style lang="scss" scoped>
.ican-btn {
  line-height: 1.5715;
  position: relative;
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  background-image: none;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  user-select: none;
  touch-action: manipulation;
  height: 32px;
  padding: 4px 15px;
  font-size: 14px;
  border-radius: $--border-radius-base;
  color: rgba(0, 0, 0, 0.65);
  background-color: #fff;
  border-color: #d9d9d9;
}
.ican-btn:hover,
.ican-btn:focus {
  color: $--second-color-primary;
  background-color: #fff;
  border-color: $--second-color-primary;
}

.ican-btn-primary {
  color: #fff;
  background-color: $--color-primary;
  border-color: $--color-primary;
  // text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  // box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
}
.ican-btn-primary:hover,
.ican-btn-primary:focus {
  color: #fff;
  background-color: $--second-color-primary;
  border-color: $--second-color-primary;
}

.ican-btn-background-ghost {
  color: #fff;
  background: 0 0 !important;
  border-color: #fff;
}
.ican-btn-background-plain {
  color: $--color-primary;
  background: none;
  border-color: $--color-primary;
  &:hover {
    background-color: $--color-primary;
    color: #fff;
  }
}

.ican-btn-block {
  width: 100%;
}
</style>
