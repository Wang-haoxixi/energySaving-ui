<template>
  <div class="tag-group-box">
    <h2>本周新增</h2>
    <p>
      本区域只显示前20条数据，更多请转到
      <span class="link" @click="open('标签列表')">标签列表页</span>查看
    </p>
    <iep-no-data v-if="!data.length" style="height: 300px;"></iep-no-data>
    <div v-if="data.length" class="tag-wrapper">
      <el-tag size="medium" :type="item.type" v-for="(item) in data" :key="item.id">{{item.name}}</el-tag>
    </div>
  </div>
</template>
<script>
import { getTagWeekNew } from "@/api/tms/statistics";
const colorMap = ["primary", "success", "info", "warning", "primary"];
export default {
  data() {
    return {
      data: [],
    };
  },
  created() {
    this.loadWeekNew();
  },
  methods: {
    open(name) {
      this.$router.push({
        name,
      });
    },
    async loadWeekNew() {
      const { data } = await getTagWeekNew();
      this.data = data.map(m => {
        m.type = colorMap[m.id % colorMap.length];
        return m;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
h2 {
  font-size: 18px;
  font-family: "微软雅黑";
  color: $--color-text-primary;
}
.tag-group-box {
  height: 300px;
  p {
    margin: -10px 0 5px 0;
    .link {
      color: #409eff;
      cursor: pointer;
      &:hover {
        text-decoration-line: underline;
      }
    }
    color: $--color-text-regular;
    font-size: 14px;
  }
  .tag-wrapper {
    margin-right: -5px;
    > .el-tag {
      margin-right: 5px;
      margin-bottom: 10px;
    }
  }
}
</style>
