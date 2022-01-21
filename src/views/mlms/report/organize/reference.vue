<template>
  <div class="reference">
    <el-table
      ref="dailyTable"
      :data="dailyTableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      border
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="realName" label="姓名" width="300"></el-table-column>
      <el-table-column prop="workSummary" label="工作内容" show-overflow-tooltip></el-table-column>
    </el-table>
    <div class="footer">
      <el-button type="primary" @click="submitForm">确定</el-button>
      <iep-button @click="cancelPage">返回</iep-button>
    </div>
  </div>
</template>

<script>
import { getWeekMonthReportByOrg } from "@/api/dms/report_so_org_admin";
import { getMonday, dateFormat } from "../util";
import { mapGetters } from "vuex";

export default {
  props: {
    type: {
      type: Number,
      default: 0,
    },
    time: {
      default: "",
    },
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  data() {
    return {
      dailyTableData: [],
      selectList: [],
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.selectList = val;
    },
    submitForm() {
      let workSummary = "";
      for (const item of this.selectList) {
        workSummary += item.workSummary + "\r\n";
      }
      this.$emit("load_reference", workSummary, true);
    },
    cancelPage() {
      this.$emit("load_reference", "", false);
    },
  },
  created() {
    // 0周报，1月报
    let time = "";
    if (this.type === 0) {
      time = getMonday(this.time).time;
    } else {
      time = dateFormat(this.time, "yyyy-MM") + "-01";
    }
    getWeekMonthReportByOrg({
      newYearMonthTime: time,
      reportType: this.type,
      nowOrgId: this.userInfo.orgId,
    }).then(({ data }) => {
      this.dailyTableData = data.records;
    });
  },
};
</script>

<style lang="scss" scoped>
.reference {
  .footer {
    margin-top: 20px;
    text-align: right;
    .el-button {
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
.reference ::v-deep .el-table th.is-leaf {
  font-family: Microsoft YaHei;
  background-color: rgb(242, 244, 245);
  color: #303031;
}
</style>
