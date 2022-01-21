<template>
  <div class="tag-box">
    <el-tag
      :key="item.label"
      v-for="(item,index) in value"
      :disable-transitions="false"
      type="info"
      size="default"
      effect="plain"
      :closable="!disabled"
      @close="handleDel(index)"
    >{{item.label}}</el-tag>
    <template v-if="!disabled">
      <el-input
        v-if="inputVisible"
        v-model.trim="inputValue"
        class="input-new-tag"
        ref="saveTagInput"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
        :maxlength="maxLength"
        show-word-limit
      ></el-input>
      <el-button
        v-else
        v-show="!notEdit"
        class="button-new-tag"
        icon="el-icon-woneng-jiahao"
        @click="showInput"
      ></el-button>
    </template>
  </div>
</template>
<script>
export default {
  name: "OptionInput",
  props: {
    value: {
      type: Array,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    notEdit: {
      type: Boolean,
      default: false,
    },
    maxLength: {
      type: Number,
      default: 50,
    },
  },
  data() {
    return {
      inputVisible: false,
      inputValue: "",
    };
  },
  methods: {
    maxNum(arr) {
      if (!arr.length) return 0;
      return Math.max(...arr);
    },
    handleDel(index) {
      const dynamicOptions = [...this.value];
      dynamicOptions.splice(index, 1);
      this._save(dynamicOptions);
      this.$emit("handle-del");
    },
    showInput() {
      const { length } = this.value;
      if (length >= 30) {
        this.$message.warning("子项最多可以添加30条");
        return;
      }
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    _save(tags) {
      this.$emit("input", tags);
    },
    handleInputClear() {
      setTimeout(() => {
        this.inputVisible = false;
        this.inputValue = "";
      }, 500);
    },

    handleInputConfirm() {
      const inputValue = this.inputValue;
      if (inputValue) {
        const dynamicOptions = [...this.value];
        if (dynamicOptions.findIndex(m => m.label === inputValue) !== -1) {
          this.$message("选项已存在");
          return;
        }
        const num = this.maxNum(dynamicOptions.map(m => m.value));
        const option = {
          label: inputValue,
          value: num + 1,
          select: false,
        };
        dynamicOptions.push(option);
        this._save(dynamicOptions);
      }
      this.inputVisible = false;
      this.inputValue = "";
      this.$emit("handle-input-confirm");
    },
  },
};
</script>
<style lang="scss" scoped>
.tag-box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-left: -10px;
  > * {
    margin-bottom: 5px;
    margin-left: 10px;
    height: 38px;
    line-height: 38px;
    color: $--color-text-secondary;
  }
}
.el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 38px;
  line-height: 38px;
  padding-top: 0;
  padding-bottom: 0;
  color: $--color-text-regular;
  &:hover {
    // border-color: rgba(247, 68, 55, 0.1) !important;
    border-color: $--color-fifth !important;
    // background-color: rgba(247, 68, 55, 0.1);
    background-color: --color-fifth;
    color: $--color-primary;
  }
}
.input-new-tag {
  width: 180px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
