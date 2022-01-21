<template>
  <el-card shadow="never" style="margin-bottom: 30px;">
    <div class="title">{{information.name}}</div>
    <div class="sub-con">
      <div>标签级别：{{information.levelName}}</div>
      <div>标签分类：{{information.typeVos?information.typeVos.map(m=>m.name).join('、'):'暂无'}}</div>
      <div>关联标签：{{information.tagList?information.tagList.map(m=>m.commonName).join('、'):'暂无'}}</div>
    </div>
    <el-row>
      <el-col :span="24">
        <div>标签注释：{{information.description}}</div>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
export default {
  props: {
    information: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.title {
  font-size: 18px;
  font-weight: 400;
  font-family: "微软雅黑";
  color: $--color-text-primary;
  margin-bottom: 30px;
}
.el-row {
  margin-bottom: 20px;
  color: $--color-text-regular;
  &:last-child {
    margin-bottom: 0;
  }
}
.sub-con {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  margin-bottom: 20px;
}
</style>

