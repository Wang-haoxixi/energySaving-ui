<template>
  <div class="manage">
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name"></iep-page-header>
      <total-wrapper :dataMap="financialData" :proportion="proportion"></total-wrapper>
      <iep-tabs v-model="activeTab" :tab-list="tabList" style="margin-top:20px;">
        <template v-slot:[activeTab]>
          <component ref="tabList" :is="activeTab"></component>
        </template>
      </iep-tabs>
    </iep-basic-container>
  </div>
</template>
<script>
import { getResultStatistics } from "@/api/tms/management";
import ClusteringResult from "./ClusteringResult/";
import ClassificationRecord from "./ClassificationRecord/";
import PeopleManagement from "./PeopleManagement/";
import TotalWrapper from "./TotalWrapper";
export default {
  components: {
    ClusteringResult,
    ClassificationRecord,
    PeopleManagement,
    TotalWrapper,
  },
  data() {
    return {
      statistics: {
        centralWord: "-",
        freeWord: "-",
        satelliteWord: "-",
        underlyingWord: "-",
        addedCenterSize: "-",
        newSatelliteSize: "-",
        newFreeSize: "-",
        updateTime: "-",
        clusterTimes: "-",
        sortTimes: "-",
        threshold: "-",
      },
      tabList: [
        {
          label: "聚类结果",
          value: "ClusteringResult",
        },
        {
          label: "归类记录",
          value: "ClassificationRecord",
        },
        {
          label: "人工管理记录",
          value: "PeopleManagement",
        },
      ],
      activeTab: "ClusteringResult",
    };
  },
  computed: {
    financialData() {
      return {
        中心词: this.statistics.centralWord,
        游离词: this.statistics.freeWord,
        卫星词: this.statistics.satelliteWord,
        阈值: this.statistics.threshold + "%",
        基础标签库: this.statistics.underlyingWord,
        聚类次数: this.statistics.clusterTimes,
        归类次数: this.statistics.sortTimes,
      };
    },
    proportion() {
      return {
        addedCenterSize:
          this.statistics.addedCenterSize + "/" + this.statistics.centralWord,
        newSatelliteSize:
          this.statistics.newSatelliteSize +
          "/" +
          this.statistics.satelliteWord,
        // newFreeSize: this.statistics.newFreeSize + '/' + this.statistics.freeWord,
        updateTime: this.statistics.createTime,
        termsPercent: this.statistics.termsPercent,
      };
    },
  },
  created() {
    this.loadPage();
  },
  methods: {
    // judgeSN (value) {
    //   if (typeof (value) === 'number') {
    //     return this.$options.filters.parseToM(value)
    //   } else {
    //     return value
    //   }
    // },
    syncRefresh() {
      this.loadPage();
      this.$refs["tabList"].loadPage();
    },
    loadPage() {
      getResultStatistics().then(data => {
        this.statistics = data.data;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.manage {
  position: relative;
  transform: scale3d(1, 1, 1);
}
.manage ::v-deep {
  .el-tabs__header {
    width: 50%;
    background: none;
  }
  .el-tabs__content {
    overflow: inherit;
  }
}
</style>

