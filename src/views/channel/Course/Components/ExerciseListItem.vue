<template>
  <div class="section-list-item">
    <div class="info">
      <el-progress
        class="progress-circle"
        type="circle"
        :title="progressMap[form.progress].text"
        :percentage="progressMap[form.progress].value"
        :width="28"
        color=" #3cd489"
        :stroke-width="4"
        :show-text="false"
      ></el-progress>
      <span class="text">{{form.sectionNumber}}-{{form.smallSectionNumber}}</span>
      <span class="text" :title="form.exerciseName">{{form.exerciseName}}</span>
    </div>
    <div class="opt">
      <div class="score">
        <span v-if="form.exerciseScore">{{form.exerciseScore}} 分</span>
        <span v-else-if="form.state===1">/</span>
        <span v-else></span>
      </div>
      <div>
        <el-button
          size="small"
          type="default"
          @click="handleExerice(form)"
          v-if="form.progress==='3'"
        >{{optName}}</el-button>
        <ExerciseViewDialog ref="ExerciseViewDialog"></ExerciseViewDialog>
      </div>
    </div>
  </div>
</template>
<script>
import ExerciseViewDialog from "@/views/exam/examList/Page/Components/ExerciseViewDialog";
import { progressMap } from "../options";
class ExerciseItemVO {
  exerciseId = 0;
  exerciseName = "";
  id = 0;
  exerciseScore = 0;
  infoId = 0;
  sectionName = "";
  sectionNumber = 0;
  smallSectionName = "";
  smallSectionNumber = 0;
  progress = "";
  state = "";
}

export default {
  props: ["item", "situationId"],
  components: {
    ExerciseViewDialog,
  },
  data() {
    return {
      progressMap,
    };
  },
  computed: {
    form() {
      return this.$mergeByFirst(new ExerciseItemVO(), this.item);
    },
    optName() {
      const optName = {
        0: "开始练习",
        1: "继续练习",
        2: "已参与",
      };
      return optName[this.form.state];
    },
  },
  methods: {
    handleExerice(row) {
      if (row.beginStatus === 3) {
        this.$refs["ExerciseViewDialog"].manageId = row.manageId;
      }
      this.$refs["ExerciseViewDialog"].id = row.exerciseId;
      this.$refs["ExerciseViewDialog"].beginStatus = row.beginStatus;
      this.$refs["ExerciseViewDialog"].studySectionId = row.id;
      this.$refs["ExerciseViewDialog"].dialogShow = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.progress-circle {
  margin-left: 10px;
}
.section-list-item {
  margin: 5px 0;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: $--border-radius-base;
  &:hover {
    background: rgba(247, 68, 55, 0.1);
    color: $--color-primary;
    .text {
      color: $--color-primary;
    }
  }
  .info {
    display: flex;
    align-items: center;
  }
  .opt {
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ::v-deep .el-button--default:hover {
      background-color: #fff;
    }
    .score {
      font-size: 14px;
      color: $--color-input-regular;
    }
  }
  .icon {
    font-size: 20px;
    color: $--color-input-regular;
  }
  .text {
    display: inline-block;
    font-size: 14px;
    color: $--color-text-regular;
    &:nth-child(2) {
      margin-left: 10px;
      min-width: 30px;
    }
    &:nth-child(3) {
      margin-right: 5px;
      max-width: 550px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &:nth-child(4) {
      margin-right: 20px;
      min-width: 60px;
    }
  }
}
</style>
