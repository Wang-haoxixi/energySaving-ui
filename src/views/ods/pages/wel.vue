<template>
  <div class="wel">
    <div class="basic-container">
      <el-row :gutter="10" v-if="deepQuery('项目管理')">
        <el-col :span="15">
          <year-project :loading="false"></year-project>
        </el-col>
        <el-col :span="9">
          <investment :loading="false"></investment>
        </el-col>
      </el-row>
      <el-row :gutter="10" v-if="deepQuery('供需对接')">
        <el-col :span="15">
          <data-sharing></data-sharing>
        </el-col>
        <el-col :span="9">
          <confirm-demand />
        </el-col>
      </el-row>

      <el-row :gutter="10" v-if="deepQuery('供需对接')">
        <el-col :span="15">
          <docking-charts></docking-charts>
        </el-col>
        <el-col :span="9">
          <share-detail></share-detail>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import yearProject from "./newIndex/yearProject";
import investment from "./newIndex/Investment";
import dataSharing from "./newIndex/dataSharing";
import confirmDemand from "./newIndex/confirmDemand";
import dockingCharts from "./newIndex/dockingCharts";
import shareDetail from "./newIndex/shareDetail";
// import { getDataList, getStandardTheme, getDeptTask } from "@/api/workbench";
export default {
  name: "Wel",
  data() {
    return {
      total: {
        sysTotal: 0,
        matTotal: 0,
      },
      loading: true,
      themeLoading: true,
      deptLoading: false,
      dataList: {},
      standardThemeData: {},
      deptTaskData: {},
    };
  },
  components: {
    investment,
    yearProject,
    shareDetail,
    confirmDemand,
    dockingCharts,
    dataSharing,
  },
  computed: {},
  methods: {
    deepQuery() {
      const isGet = true;
      return isGet;
    },
    // getDataList() {
    //   this.loading = true;
    //   getDataList()
    //     .then(({ data }) => {
    //       const dataList = data.data;
    //       this.total.matTotal = dataList["0"];
    //       this.total.sysTotal = dataList["9.1"].total;
    //       this.dataList = { ...dataList };
    //       this.loading = false;
    //       this.getStandardTheme();
    //     })
    //     .catch(() => {
    //       this.loading = false;
    //       this.getStandardTheme();
    //     });
    // },
    // getStandardTheme() {
    //   this.themeLoading = true;
    //   getStandardTheme()
    //     .then(({ data }) => {
    //       this.standardThemeData = data.data;
    //       this.themeLoading = false;
    //       this.deptLoading = false;
    //       // this.getDeptTask()
    //     })
    //     .catch(() => {
    //       // this.getDeptTask()
    //       this.deptLoading = false;
    //       this.themeLoading = false;
    //     });
    // },
    // getDeptTask() {
    //   this.deptLoading = true;
    //   getDeptTask()
    //     .then(({ data }) => {
    //       this.deptTaskData = data.data;
    //       this.deptLoading = false;
    //     })
    //     .catch(() => {
    //       this.deptLoading = false;
    //     });
    // },
  },
  created() {
    // this.getDataList()
  },
};
</script>

<style scoped="scoped" lang="scss">
.wel-contailer {
  position: relative;
}

.banner-text {
  position: relative;
  padding: 0 20px;
  font-size: 20px;
  text-align: center;
  color: #333;
}

.banner-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
  display: none;
}

.typeing:after {
  animation: none;
}

@keyframes blink {
  to {
    opacity: 0;
  }
}
.gds-index {
  width: 100%;
  padding: 10px;
  margin: 0 auto;
  display: grid;
  grid-auto-flow: row dense;
  grid-row-gap: 15px;
  grid-column-gap: 15px;
  grid-template-columns: 75fr 35fr;
  .index-card {
    font-size: 14px;
    border: 1px solid #f0f0f0;
    padding: 15px 20px;
    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both;
    }
  }
}
</style>
<style scoped>
</style>

