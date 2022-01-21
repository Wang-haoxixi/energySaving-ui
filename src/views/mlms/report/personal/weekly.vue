<template>
  <div class="weekly">
    <div class="update-page" v-if="pageState">
      <div class="head">
        <div class="title" v-show="formData.index">
          {{`第${formatDig(formData.index)}周个人工作周报`}}
          <span
            class="date"
          >（{{`${formData.startTime} ~ ${formData.endTime}`}}）</span>
        </div>
        <div class="tips" v-if="dialogState!=='detail'">
          记不清楚做什么？
          <a class="href" @click="changePage">参考本周日报</a>
        </div>
        <div class="tips update" v-else @click="handleUpdate">
          <i class="el-icon-edit"></i>
        </div>
      </div>
      <div class="content">
        <el-form ref="form" v-if="dialogState!=='detail'" :rules="rules" :model="formData">
          <div class="title">
            领导指示
            <iep-tip :content="tipContent.leaderIndication"></iep-tip>
          </div>
          <el-form-item>
            <el-input
              type="textarea"
              v-model="formData.leaderIndication"
              rows="5"
              placeholder="此处填写领导指示"
              maxlength="500"
            ></el-input>
          </el-form-item>
          <div class="title validate">
            本周工作总结
            <iep-tip :content="tipContent.workSummary"></iep-tip>
          </div>
          <el-form-item prop="workSummary">
            <el-input
              type="textarea"
              v-model="formData.workSummary"
              rows="5"
              placeholder="此处填写本周工作总结"
              maxlength="5000"
            ></el-input>
          </el-form-item>
          <div class="title validate">
            下周工作计划
            <iep-tip :content="tipContent.workPlan"></iep-tip>
          </div>
          <el-form-item prop="workPlan">
            <el-input
              type="textarea"
              v-model="formData.workPlan"
              rows="5"
              placeholder="此处填写下周工作计划"
              maxlength="5000"
            ></el-input>
          </el-form-item>
          <div class="title">
            总结与感悟
            <iep-tip :content="tipContent.summarySentiment"></iep-tip>
          </div>
          <el-form-item>
            <el-input
              type="textarea"
              v-model="formData.summarySentiment"
              rows="5"
              placeholder="此处填写总结与感悟"
              maxlength="1000"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="iep-btn-l" @click="submit" type="primary" :loading="loadState">保存</el-button>
          </el-form-item>
        </el-form>
        <div v-else class="detail">
          <div class="title">领导指示</div>
          <pre>{{formData.leaderIndication}}</pre>
          <div class="title">本周工作总结</div>
          <pre>{{formData.workSummary}}</pre>
          <div class="title">下周工作计划</div>
          <pre>{{formData.workPlan}}</pre>
          <div class="title">总结与感悟</div>
          <pre>{{formData.summarySentiment}}</pre>
        </div>
      </div>
    </div>
    <div class="detail-page" v-else>
      <el-table
        ref="dailyTable"
        :data="dailyTableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        border
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="工作日期" width="300">
          <template slot-scope="scope">{{ scope.row.createTime.slice(0, 10) }}</template>
        </el-table-column>
        <el-table-column prop="workContent" label="工作内容"></el-table-column>
      </el-table>
      <div class="footer">
        <el-button class="iep-btn-l" type="primary" @click="submitForm">确定</el-button>
        <iep-button class="iep-btn-l" @click="cancelPage">返回</iep-button>
      </div>
    </div>
  </div>
</template>

<script>
import { toChinesNum, getDateStr, getWeekStartAndEnd } from "../util";
import { tipContent } from "./option";
import { updateData, createData } from "@/api/dms/report_personal_week_month";
import { getTableData } from "@/api/dms/report_personal_daily";
import { mapGetters } from "vuex";

export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  data() {
    return {
      loadState: false,
      tipContent,
      pageState: true,
      dailyTableData: [],
      formData: {},
      dialogState: "detail",
      rules: {
        workSummary: [{ required: true, message: "必填", trigger: "blur" }],
        workPlan: [{ required: true, message: "必填", trigger: "blur" }],
      },
      selectList: [],
      submitMsg: "",
    };
  },
  methods: {
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loadState = true;
          // 判断这条数据是否在系统中已经生成
          let fn = () => {};
          const row = { ...this.formData };
          if (row.createTime) {
            fn = updateData;
          } else {
            fn = createData;
            row.reportType = 0;
            row.createTime = getDateStr(row.timeStamp);
          }
          row.startDateTime = row.createTime;
          row.title = `第${this.formatDig(row.index)}周个人工作周报`;
          row.week = row.index;
          row.orgId = this.userInfo.orgId;
          delete row.updateTime;
          delete row.createTime;
          fn(row).then(() => {
            this.loadState = false;
            this.$message.success(this.submitMsg);
            this.pageState = true;
            this.$emit("success-submit", true);
          });
        } else {
          return false;
        }
      });
    },
    handleUpdate() {
      this.dialogState = "update";
      // 需要根据当前时间和内容判断提示语言
      if (this.formData.workSummary !== "") {
        // 首先判断是新增还是修改
        this.submitMsg = "保存成功";
      } else {
        const date = getWeekStartAndEnd(new Date());
        if (
          this.formData.timeStamp + 7 * 24 * 3600 * 1000 <
          +new Date(date.startYear)
        ) {
          // 在本周时间内 - 正在填写的结束时间小于本周的开始时间
          this.submitMsg = "恭喜您完成周报补写，继续努力！";
        } else {
          this.submitMsg = "恭喜您完成本周周报，继续努力！";
        }
      }
    },
    formatDig(index) {
      return toChinesNum(index);
    },
    handleSelectionChange(val) {
      this.selectList = val;
    },
    // 本周日报
    changePage() {
      this.pageState = false;
      getTableData({
        nowOrgId: this.userInfo.orgId,
        startTime: getDateStr(this.formData.timeStamp),
        endTime: getDateStr(this.formData.timeStamp + 7 * 24 * 3600 * 1000 - 1),
      }).then(({ data }) => {
        this.dailyTableData = data.records;
      });
    },
    submitForm() {
      let workSummary = "";
      for (const item of this.selectList) {
        workSummary += item.workContent + "\r\n";
      }
      this.formData.workSummary += workSummary;
      this.selectList = [];
      this.pageState = true;
      this.dailyTableData = [];
    },
    cancelPage() {
      this.selectList = [];
      this.pageState = true;
      this.dailyTableData = [];
    },
  },
  watch: {
    data(newVal) {
      this.pageState = true;
      this.formData = {
        leaderIndication: "",
        workSummary: "",
        workPlan: "",
        summarySentiment: "",
      };
      this.formData = Object.assign({}, this.formData, newVal);
    },
  },
};
</script>

<style lang="scss" scoped>
[v-cloak] {
  display: none;
}
.weekly {
  .update-page {
    .head {
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid $--border-color;
      padding: 20px 0;
      .title {
        font-size: 16px;
        font-family: "微软雅黑";
        color: $--color-text-primary;
        .date {
          font-size: 14px;
          color: $--color-text-secondary;
          font-weight: 500;
        }
      }
      .tips {
        font-size: 14px;
        line-height: 24px;
        margin-right: 3px;
        color: $--color-text-secondary;
        .href {
          color: $--color-primary;
          cursor: pointer;
        }
      }
      .update {
        font-size: 18px;
        cursor: pointer;
      }
    }
    .content {
      .title {
        margin-bottom: 20px;
        font-size: 14px;
        color: $--color-text-regular;
      }
      .detail {
        pre {
          padding-left: 20px;
          line-height: 20px;
          margin: 0;
          min-height: 50px;
        }
        .title {
          margin-top: 10px;
        }
      }
    }
  }
  .detail-page {
    .footer {
      margin-top: 20px;
      text-align: right;
    }
  }
}
.footer ::v-deep .el-button:nth-child(1) {
  margin-right: 10px;
}
.validate::before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
.detail-page ::v-deep .el-table th.is-leaf {
  font-family: Microsoft YaHei;
  background-color: rgb(242, 244, 245);
  color: #303031;
}
</style>
