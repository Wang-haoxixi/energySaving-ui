<template>
  <div class="tags">
    <el-tag type="white" v-if="!value.length">暂无</el-tag>
    <el-tag type="white" v-for="(tag,i) in value" :key="i">{{tag}}</el-tag>
  </div>
</template>
<script>
export default {
  name: "IepTags",
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
<style lang="scss" scoped>
.tags {
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.tags ::v-deep .el-tag {
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
  padding: 0 5px;
  border-color: 0;
  background-color: $--background-color;
  color: $--color-text-secondary;
  height: 20px;
  line-height: 18px;
  border-radius: 5px;
  &:last-child {
    margin-right: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
