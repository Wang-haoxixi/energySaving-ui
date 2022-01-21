<template>
  <div>
    <iep-page-header title :backOption="backOption"></iep-page-header>
    <div class="report_all" id="report">
      <el-row>
        <el-col :span="8" class="report_title">
          <div>
            诊断报告:
            <span>{{ data.reportNumber }}</span>
          </div>
          <div>
            诊断部门:
            <span>{{ data.dataDeptName }}</span>
          </div>
        </el-col>
        <el-col :span="8" class="report_title">
          <div>
            诊断结束时间:
            <span>{{ data.reportedTime }}</span>
          </div>
          <div>
            诊断表名称:
            <span>{{ data.dataTableName }}</span>
          </div>
        </el-col>
        <el-col :span="8" class="report_title">
          <el-button type="primary" @click="exportImg">报告导出</el-button>
        </el-col>
      </el-row>
      <hr />
      <el-row :gutter="20">
        <el-col :span="5">
          <div class="report_num">字段总数量</div>
          <div class="big_clack">{{ data.fieldQuantity }}个</div>
        </el-col>
        <el-col :span="5">
          <div class="report_num">诊断字段数量</div>
          <div class="big_clack">{{ data.reportFieldQuantity }}个</div>
        </el-col>
        <el-col :span="5">
          <div class="report_num">异常字段数量</div>
          <div class="big_red">{{ data.errorFieldQuantity }}个</div>
        </el-col>
        <el-col :span="5">
          <div class="report_num">诊断实体数据数量</div>
          <div class="big_clack">{{ data.entityDataQuantity }}条</div>
        </el-col>
        <el-col :span="4">
          <div class="report_num">脏数据数量</div>
          <div class="big_red">{{ data.errorEntityDataQuantity }}条</div>
        </el-col>
      </el-row>
      <div>
        <el-tabs v-model="activeName">
          <el-tab-pane label="详情" name="first">
            <detail :list="data.list"></detail>
          </el-tab-pane>
          <el-tab-pane label="图表统计" name="second">
            <echart :list="data" refs="echart" v-if="echart"></echart>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import detail from "./detail";
import echart from "./echart";
//import { getDetail } from "@/api/dataMatrix/diagnosticReport";
import html2canvas from "html2canvas";
import { mockData3 } from "../const/mock";
export default {
  data() {
    return {
      activeName: "first",
      data: {},
      echart: false,
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.$emit("load-page", false);
        },
      },
      mockData: mockData3,
    };
  },
  components: { detail, echart },
  methods: {
    // 打开报告
    open() {
      //   getDetail(id).then(res => {
      //     this.data = res.data.data;
      //     this.echart = !this.echart;
      //     // this.$refs.echart.list = res.data.data
      //   });
      this.data = this.mockData;
      this.echart = !this.echart;
    },
    // 导出
    exportImg() {
      html2canvas(document.getElementById("report")).then(canvas => {
        const imgData = canvas.toDataURL("image/jpeg");
        this.fileDownload(imgData);
      });
    },
    fileDownload(downloadUrl) {
      const aLink = document.createElement("a");
      aLink.style.display = "none";
      aLink.href = downloadUrl;
      aLink.download = `${this.data.reportName}.png`;
      // 触发点击-然后移除
      document.body.appendChild(aLink);
      aLink.click();
      document.body.removeChild(aLink);
    },
  },
};
</script>
<style scoped lang="scss">
.report_all {
  padding: 20px;
  span {
    color: #919191;
    margin-left: 8px;
  }
  div {
    // text-align: center;
    margin-bottom: 10px;
  }
  .big_clack {
    font-size: 28px;
    color: black;
    font-weight: 500;
  }
  .big_red {
    font-size: 28px;
    color: red;
    font-weight: 500;
  }
  hr {
    background-color: #ebeef5;
    height: 1px;
    border: none;
  }
}
</style>