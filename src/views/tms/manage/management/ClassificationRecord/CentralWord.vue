<template>
  <el-card shadow="never" style="margin-bottom: 30px;">
    <div class="title">
      <span>{{information.createTime | parseToDay}}</span>
      <span style="margin-left:15px;font-size:16px;">{{information.creatorName}}归类记录</span>
    </div>
    <el-row>
      <el-col :span="8">
        <div>操作类型：{{information.operateType}}</div>
      </el-col>
      <el-col :span="8">
        <div>阈值：{{information.threshold}}%</div>
      </el-col>
      <el-col :span="8">
        <div>标准库/基础库：{{information.termsPercent}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div>新增中心词：{{information.addedCenterSize}}</div>
      </el-col>
      <!-- <el-col :span="8">
        <div>新增游离词：{{information.newFreeSize}}</div>
      </el-col>-->
      <el-col :span="8">
        <div>新增卫星词：{{information.newSatelliteSize}}</div>
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
</style>

