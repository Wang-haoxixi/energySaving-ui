<template>
  <div class="tag-box">
    <span v-if="!value.length">暂无用户</span>
    <el-tag
      :key="item.id"
      v-for="item in value"
      :disable-transitions="false"
      type="info"
      size="default"
      :closable="!disabled"
      @close="handleDel(item)"
    >{{item.name}}</el-tag>
    <el-button v-if="!disabled" class="button-new-item" icon="el-icon-edit" @click="handleEdit">编辑</el-button>
    <dialog-form ref="DialogForm" @save="_save"></dialog-form>
  </div>
</template>
<script>
import DialogForm from "./DialogForm";
export default {
  name: "IepUsersInput",
  components: {
    DialogForm,
  },
  props: {
    value: {
      type: Array,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleEdit() {
      this.$refs["DialogForm"].items = [...this.value];
      this.$refs["DialogForm"].dialogShow = true;
    },
    handleDel(item) {
      const dynamicItems = [...this.value];
      dynamicItems.splice(dynamicItems.indexOf(item), 1);
      this._save(dynamicItems);
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
