<template>
  <el-card class="item-con" shadow="hover" @click.native="handleDetail(item)">
    <div class="txt">
      <div class="title" :title="item.examName">{{item.examName}}</div>
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
    </div>
    <ExerciseViewDialog ref="ExerciseViewDialog"></ExerciseViewDialog>
  </el-card>
</template>
<script>
import ExerciseViewDialog from "@/views/exam/examList/Page/Components/ExerciseViewDialog";
export default {
  props: ["item"],
  components: {
    ExerciseViewDialog,
  },
  methods: {
    handleDetail(row) {
      if (row.beginStatus === 3) {
        this.$refs["ExerciseViewDialog"].manageId = row.manageId;
      }
      this.$refs["ExerciseViewDialog"].id = row.id;
      this.$refs["ExerciseViewDialog"].beginStatus = row.beginStatus;
      this.$refs["ExerciseViewDialog"].dialogShow = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.item-con {
  width: 285px;
  height: 160px;
  background: #fff;
  border: 1px solid #eff0f1;
  border-radius: 10px;
  cursor: pointer;
  ::v-deep .el-card__body {
    padding: 0;
  }
  .txt {
    padding: 10px 15px 15px;
    background-color: #fff;
    .title {
      margin: 10px 0 20px;
      height: 26px;
      font-size: 16px;
      font-weight: 400;
      color: #303031;
      line-height: 26px;
      text-align: justify;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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
