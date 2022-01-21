<template>
  <div class="box">
    <IepAppTabCard :title="title">
      <el-row :gutter="20">
        <el-col :span="12" v-for="(item,idx) in dataList" style="margin-bottom:25px;" :key="idx">
          <div class="box-item">{{item.title}}</div>
          <div class="box-item box-blue">{{item.num}}</div>
        </el-col>
      </el-row>
    </IepAppTabCard>
  </div>
</template>

<script>
export default {
  computed: {},
  data() {
    return {
      title: "共享明细",
      dataList: [
        { title: "已关联目录的数据责任", num: "10" },
        { title: "待关联目录的数据责任", num: "3" },
        { title: "已关联接口的数据责任", num: "10" },
        { title: "待关联接口的数据责任", num: "7" },
        { title: "已设置更新周期的数据责任", num: "10" },
        { title: "待设置更新周期的数据责任", num: "3" },
      ],
    };
  },
  methods: {},
  created() {},
};
</script>

<style lang="scss" scoped>
.box {
  ::v-deep .el-card {
    height: 396px;
  }
  .box-item {
    line-height: 35px;
    text-align: center;
    font-size: 16px;
  }
}
</style>
