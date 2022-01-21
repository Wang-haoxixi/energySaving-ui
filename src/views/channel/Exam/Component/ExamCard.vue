<template>
  <el-card class="item-con" shadow="hover" @click.native="handleDetail(item)">
    <iep-img class="img" :src="item.cover"></iep-img>
    <div class="txt">
      <div class="title iep-ellipsis-2-flex" :title="item.examName">{{item.examName}}</div>
      <div class="info">
        <span>{{item.appShowTime}}</span>
        <span>{{item.testNumber}}人已考</span>
      </div>
      <div class="opt">
        <div class="cost">
          <template v-if="item.chargeStatus==='1'">
            <span>免费</span>
          </template>
          <template v-else>
            <span class="red">{{item.consume}}贝</span>
          </template>
        </div>
        <!-- <el-button class="partake" type="white">立即参与</el-button> -->
      </div>
      <ExamViewDialog ref="ExamViewDialog"></ExamViewDialog>
    </div>
  </el-card>
</template>
<script>
import ExamViewDialog from "@/views/exam/examList/Page/Components/ExamViewDialog";
export default {
  props: ["item"],
  components: {
    ExamViewDialog,
  },
  methods: {
    handleDetail(row) {
      if (row.beginStatus === 3) {
        this.$refs["ExamViewDialog"].manageId = row.manageId;
      }
      this.$refs["ExamViewDialog"].id = row.id;
      this.$refs["ExamViewDialog"].beginStatus = row.beginStatus;
      this.$refs["ExamViewDialog"].dialogShow = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.item-con {
  width: 285px;
  height: 330px;
  background: #fff;
  border: 1px solid #eff0f1;
  border-radius: 10px;
  cursor: pointer;
  ::v-deep .el-card__body {
    padding: 0;
  }
  .img {
    width: 100%;
    height: 170px;
    border-radius: 10px 10px 0 0;
  }
  .txt {
    padding: 10px 15px 15px;
    background-color: #fff;
    border-top: 1px solid $--border-color;
    transition: transform 0.5s ease;
    .title {
      margin-bottom: 20px;
      height: 52px;
      font-size: 14px;
      font-weight: 400;
      color: #303031;
      line-height: 26px;
      text-align: justify;
    }
    .info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      line-height: 24px;
      color: #919397;
    }
  }
  &:hover .txt {
    transform: translateY(-30px);
  }
  .opt {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
    font-size: 14px;
    color: #919397;
    .cost {
      color: #919397;
      line-height: 24px;
    }
    .red {
      font-size: 16px;
      color: #f74437;
    }
    .num {
      line-height: 24px;
    }
    .partake:hover {
      border-color: $--color-primary;
      background: $--color-primary;
      color: #fff;
    }
  }
}
</style>
