<template>
  <div class="monthly">
    <div class="update-page" v-if="pageState">
      <div class="head">
        <div class="title">
          组织工作月报
          <span class="date">{{getYearMonth(formData.timeStamp)}}</span>
        </div>
        <div class="tips" v-if="dialogState!=='detail'">
          记不清楚做什么？
          <a class="href" @click="changePage">参考本月周报</a>
        </div>
        <div class="tips update" v-else-if="permission_edit" @click="handleUpdate">
          <i class="el-icon-edit"></i>
        </div>
      </div>
      <div class="content">
        <!-- 表单 -->
        <el-form ref="form" :rules="rules" v-if="dialogState!=='detail'" :model="formData">
          <div class="title">领导指示</div>
          <el-form-item>
            <el-input
              type="textarea"
              v-model="formData.leaderIndication"
              rows="5"
              placeholder="此处填写领导指示"
              maxlength="500"
            ></el-input>
          </el-form-item>
          <div class="title validate">本月工作总结</div>
          <el-form-item prop="workSummary">
            <el-input
              type="textarea"
              v-model="formData.workSummary"
              rows="5"
              placeholder="此处填写本月工作总结"
              maxlength="5000"
            ></el-input>
          </el-form-item>
          <div class="title validate">下月工作计划</div>
          <el-form-item prop="workPlan">
            <el-input
              type="textarea"
              v-model="formData.workPlan"
              rows="5"
              placeholder="此处填写下月工作计划"
              maxlength="5000"
            ></el-input>
          </el-form-item>
          <div class="title">总结与感悟</div>
          <el-form-item>
            <el-input
              type="textarea"
              v-model="formData.summarySentiment"
              rows="5"
              placeholder="此处填写总结与感悟"
              maxlength="10000"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="iep-btn-l" @click="submit" type="primary" :loading="loadState">保存</el-button>
          </el-form-item>
        </el-form>
        <!-- 详情 -->
        <div v-else class="detail">
          <div class="title">领导指示</div>
          <pre>{{formData.leaderIndication}}</pre>
          <div class="title">本月工作总结</div>
          <pre>{{formData.workSummary}}</pre>
          <div class="title">下月工作计划</div>
          <pre>{{formData.workPlan}}</pre>
          <div class="title">总结与感悟</div>
          <pre>{{formData.summarySentiment}}</pre>
        </div>
      </div>
    </div>
    <!-- 周报参考 -->
    <div class="detail-page" v-else>
      <el-table
        ref="dailyTable"
        :data="weeklyTableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        border
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="开始周期" width="150">
          <template slot-scope="scope">{{ getWeekStartAndEnd(scope.row.startDateTime).startTime }}</template>
        </el-table-column>
        <el-table-column label="结束周期" width="150">
          <template slot-scope="scope">{{ getWeekStartAndEnd(scope.row.startDateTime).endTime }}</template>
        </el-table-column>
        <el-table-column prop="workSummary" label="本周工作总结" show-overflow-tooltip></el-table-column>
        <el-table-column prop="workPlan" label="下周工作计划" show-overflow-tooltip></el-table-column>
      </el-table>
      <div class="footer">
        <iep-button class="iep-btn-l" type="primary" @click="submitForm">确定</iep-button>
        <iep-button class="iep-btn-l" @click="cancelPage">返回</iep-button>
      </div>
    </div>
    <!-- <relation-dialog ref="relation" :type="relationType" @submit-success="relationSuccess"></relation-dialog> -->
  </div>
</template>

<script>
import { getDateStr, getWeekStartAndEnd } from "../util";
import {
  updateData,
  createData,
  getTableData,
} from "@/api/dms/report_so_org_week_month";
// import RelationDialog from "./relationDialog";
import { mapGetters } from "vuex";
import { rules } from "./option";

export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  // components: { RelationDialog },
  computed: {
    ...mapGetters(["permissions", "userInfo"]),
    permission_edit() {
      return this.userInfo.isAdmin !== 0;
    },
  },
  data() {
    return {
      loadState: false,
      pageState: true,
      weeklyTableData: [],
      selectList: [],
      formData: {},
      dialogState: "detail",
      rules,
      relationType: "summary",
      relationObj: {
        summary: "meetingSummary",
        project: "projectList",
        product: "productList",
      },
      submitMsg: "",
    };
  },
  methods: {
    submit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.loadState = true;
          // 判断这条数据是否在系统中已经生成
          let fn = () => {};
          const row = this.formData;
          if (row.createTime) {
            fn = updateData;
          } else {
            fn = createData;
            row.reportType = 1;
            row.createTime = getDateStr(row.timeStamp);
          }
          row.nowOrgId = this.userInfo.orgId;
          row.startDateTime = row.createTime;
          delete row.updateTime;
          delete row.startTime;
          delete row.endTime;
          delete row.createTime;
          // row.meetingSummaryId = row.meetingSummary.map(m => m.id);
          // row.projectIds = row.projectList.map(m => m.id);
          // row.productIds = row.productList.map(m => m.id);
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
        // 判断是否是这个月内
        const firstDay = +new Date(
          `${new Date().getFullYear()}-${new Date().getMonth() + 1}`,
        );
        if (this.formData.timeStamp !== firstDay) {
          this.submitMsg = "恭喜您完成月报补写，继续努力！";
        } else {
          this.submitMsg = "恭喜您完成本月月报，继续努力！";
        }
      }
    },
    getYearMonth(timeStamp) {
      let msg = "（";
      const date = new Date(timeStamp);
      msg += date.getFullYear() + "年" + (date.getMonth() + 1) + "月）";
      return msg;
    },
    changePage() {
      this.pageState = false;
      getTableData({
        nowOrgId: this.userInfo.orgId,
        yearMonthTime: this.formData.time,
        reportType: 0,
      }).then(({ data }) => {
        this.weeklyTableData = data.records;
      });
    },
    handleSelectionChange(val) {
      this.selectList = val;
    },
    submitForm() {
      let workSummary = "";
      for (const item of this.selectList) {
        workSummary += item.workSummary;
      }
      this.formData.workSummary += workSummary;
      this.selectList = [];
      this.pageState = true;
      this.dailyTableData = [];
    },
    cancelPage() {
      this.selectList = [];
      this.pageState = true;
      this.weeklyTableData = [];
    },
    getWeekStartAndEnd(day) {
      return getWeekStartAndEnd(day);
    },
    getRelation(type) {
      this.relationType = type;
      this.$nextTick(() => {
        this.$refs["relation"].open(this.formData[this.relationObj[type]]);
      });
    },
    // 提交关联
    relationSuccess(list, type) {
      this.formData[this.relationObj[type]] = list;
    },
  },
  created() {},
  watch: {
    data(newVal) {
      this.formData = {
        leaderIndication: "",
        workSummary: "",
        workPlan: "",
        summarySentiment: "",
        meetingSummaryId: [],
        meetingSummary: [],
        projectIds: [],
        projectList: [],
        productIds: [],
        productList: [],
      };
      this.formData = Object.assign({}, this.formData, newVal);
    },
  },
};
</script>

<style lang="scss" scoped>
.monthly {
  .update-page {
    .head {
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid $--border-color;
      padding: 20px 0;
      font-size: 18px;
      .title {
        font-weight: 700;
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
      }
      .detail {
        pre {
          padding-left: 20px;
          line-height: 20px;
          margin: 0;
          min-height: 50px;
          .el-tag {
            margin: 0 10px 10px 0;
          }
        }
        .title {
          font-weight: 700;
          margin-top: 10px;
        }
      }
      .relation-item {
        display: flex;
        .relation-head {
          width: 80px;
        }
        .relation-list {
          ul {
            padding: 15px 0 0;
            li {
              list-style: none;
              margin-bottom: 15px;
              i {
                cursor: pointer;
              }
            }
          }
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
