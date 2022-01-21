<template>
  <div class="box">
    <IepAppTabCard :title="title" :data="`(${dataNum})`">
      <el-row :gutter="20" v-for="(item,idx) in dataList" :key="idx" class="box-item">
        <el-col :span="17" class="title">{{item.title}}</el-col>
        <el-col :span="7" class="dept">{{item.desc}}</el-col>
      </el-row>
    </IepAppTabCard>
  </div>
</template>

<script>
export default {
  computed: {},
  data() {
    return {
      title: "待确认需求",
      dataNum: 4,
      dataList: [
        { title: "公开募捐核查", desc: "民政部" },
        { title: "固体废物转移许可", desc: "生态环保部" },
        { title: "律师执业审核（申请受理）", desc: "司法部" },
        { title: "学生公交卡申请及审核", desc: "教育部" },
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
    height: 388px;
  }
  .box-item {
    margin-bottom: 20px;
    padding-left: 10px;
    position: relative;
    &::before {
      content: "";
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #40a9ff;
      position: absolute;
      left: 4px;
      top: 9px;
    }
    .title {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .dept {
      color: #cacaca;
    }
  }
}
</style>
