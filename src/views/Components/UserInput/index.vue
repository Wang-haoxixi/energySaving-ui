<template>
  <div class="tag-box">
    <span v-if="isNull">暂无用户</span>
    <el-tag
      v-else
      :disable-transitions="false"
      type="info"
      size="default"
      :closable="!disabled"
      @close="handleDel()"
    >{{value.name}}</el-tag>
    <el-button v-if="!disabled" class="button-new-item" icon="el-icon-edit" @click="handleEdit">编辑</el-button>
    <dialog-form ref="DialogForm" @save="_save"></dialog-form>
  </div>
</template>
<script>
import { validatenull } from "@/util/validate";
import DialogForm from "./DialogForm";
export default {
  name: "IepUserInput",
  components: {
    DialogForm,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isNull() {
      return validatenull(this.value);
    },
  },
  methods: {
    handleEdit() {
      this.$refs["DialogForm"].dialogShow = true;
    },
    handleDel() {
      this._save({});
    },
    _save(items) {
      this.$emit("input", items);
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
    margin-left: 10px;
    margin-bottom: 5px;
    height: 42px;
    line-height: 42px;
    color: $--color-text-secondary;
  }
}
.el-tag {
  margin-left: 10px;
}
.button-new-item {
  margin-left: 10px;
  height: 42px;
  line-height: 40px;
  padding-top: 0;
  padding-bottom: 0;
  color: $--color-text-regular;
  &:hover,
  &:focus {
    color: $--color-primary;
  }
}
</style>
