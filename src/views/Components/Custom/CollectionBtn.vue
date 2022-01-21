<template>
  <span @click="handleCollection()">
    <span v-if="collect" class="collection">
      <i class="el-icon-woneng-xingxingshixin yellow"></i>已收藏
    </span>
    <span v-else class="collection">
      <i class="el-icon-woneng-xingxing"></i>收藏
    </span>
  </span>
</template>
<script>
import { createCollection } from "@/api/dms/collection";
export default {
  props: ["collect", "type", "name", "id"],
  name: "IepCollectionBtn",
  methods: {
    async handleCollection() {
      const { data } = await createCollection({
        targetId: this.id,
        type: this.type,
        name: this.name,
      });
      if (data) {
        this.$message.success("收藏成功！");
        // this.updateData();
        this.$emit("update-data");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.collection {
  margin-right: 30px;
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  color: $--color-text-regular;
  cursor: pointer;
  &:last-child {
    margin-right: 0;
  }
  &:hover {
    opacity: 0.7;
  }
  i {
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
    font-size: 20px;
    color: $--color-input-regular;
    &.yellow {
      color: $--color-fourth;
    }
  }
}
</style>
