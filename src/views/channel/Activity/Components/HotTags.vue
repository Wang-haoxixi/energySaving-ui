<template>
  <el-card shadow="never">
    <div>热门标签</div>
    <div class="tags">
      <el-tag type="info" v-for="o of tagList" :key="o">{{o}}</el-tag>
    </div>
  </el-card>
</template>
<script>
import { getHotTags } from "@/api/meetting/publish";
export default {
  name: "HotTags",
  data() {
    return {
      tagList: [],
    };
  },
  created() {
    this.load();
  },
  methods: {
    async load() {
      const { data } = await getHotTags();
      this.tagList = data;
    },
  },
};
</script>
<style lang="scss" scoped>
.tags {
  margin: 15px -10px -10px 0;
  height: 196px;
  overflow: hidden;
  ::v-deep .el-tag {
    margin-right: 10px;
    margin-bottom: 10px;
    padding: 0 10px;
    height: 30px;
    line-height: 28px;
    border-radius: 5px;
  }
  // cursor: pointer;
}
</style>
