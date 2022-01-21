<template>
  <div class="itemClass">
    <div class="title">
      <el-tag class="titleTag" type="success" v-if="itemData.tag">{{itemData.tag}}</el-tag>
      <span class="titleText">{{itemData.examName}}</span>
    </div>
    <div class="status">
      <span class="st">
        <i :class="`${itemData.beginStatus == 2 ? 'el-icon-remove yellow' : 'el-icon-info green'}`"></i>
        {{itemData.beginStatus == 2 ? '未开始' : '进行中' }}
      </span>
      <span class="st">
        <i class="el-icon-bell"></i>
        {{itemData.beginTime ? itemData.beginTime + " ~ " + itemData.endTime : "长期有效"}}
      </span>
      <span class="st">
        <i class="el-icon-user-solid"></i>
        {{itemData.testNumber}}
      </span>
    </div>
    <div class="handler">
      <el-row>
        <el-col :span="12" class="left">考试类型：专题考试</el-col>
        <el-col :span="12" class="right">
          <div class="handleButton">
            <el-button @click="join" v-if="itemData.beginStatus == 1">立即参与</el-button>
            <el-button @click="view" type="primary" v-if="itemData.beginStatus == 3">已参与</el-button>
            <el-button :disabled="true" v-if="itemData.beginStatus == 2">未开始</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <ExamViewDialog ref="ExamViewDialog" @join="emitJoin" @continue="emitContinue" @view="emitView"></ExamViewDialog>
  </div>
</template>
<script>
import ExamViewDialog from "./ExamViewDialog";
export default {
  props: {
    itemData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  components: { ExamViewDialog },
  data() {
    return {
      dialogShow: false,
      explainData: {},
    };
  },
  methods: {
    join() {
      this.$refs["ExamViewDialog"].id = this.itemData.id;
      this.$refs["ExamViewDialog"].beginStatus = this.itemData.beginStatus;
      this.$refs["ExamViewDialog"].dialogShow = true;
    },
    view() {
      this.$refs["ExamViewDialog"].id = this.itemData.id;
      this.$refs["ExamViewDialog"].beginStatus = this.itemData.beginStatus;
      this.$refs["ExamViewDialog"].dialogShow = true;
      this.$refs["ExamViewDialog"].manageId = this.itemData.manageId;
      // this.$emit("view", this.itemData.manageId);
    },
    emitContinue() {
      this.$emit("continue", this.itemData.manageId);
    },
    emitJoin() {
      this.$emit("join", this.itemData.id);
    },
    emitView() {
      this.$emit("view", this.itemData.manageId);
    },
  },
};
</script>
<style scoped lang="scss">
.itemClass {
  margin: 8px;
  border: 1px solid #eff0f1;
  padding: 15px;
  border-radius: 8px;
  .title {
    .titleTag {
      height: 23px;
      line-height: 23px;
      padding: 0 5px;
      vertical-align: top;
      margin-right: 7px;
    }
    .titleText {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
      display: inline-block;
    }
  }
  .status {
    font-size: 14px;
    color: #999999;
    margin: 7px 0;
    .st {
      margin-right: 15px;
      .green {
        color: #67c23a;
      }
      .yellow {
        color: #e6a23c;
      }
    }
  }
  .handler {
    font-size: 14px;
    color: #999;
    .left {
      line-height: 34px;
    }
    .right {
      text-align: right;
    }
  }
}
</style>
