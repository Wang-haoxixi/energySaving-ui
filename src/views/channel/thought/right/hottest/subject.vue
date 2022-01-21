<template>
  <div class="subject">
    <iep-app-ranking-card :dataList="labelList" @click="handleDetail" name="topic" grade="count"></iep-app-ranking-card>
  </div>
</template>

<script>
import { getHotTopicsPage } from "@/api/dms/thoughts";
import IepAppRankingCard from "./RankingCard";
export default {
  components: { IepAppRankingCard },
  data() {
    return {
      labelList: [],
    };
  },
  methods: {
    handleDetail(row) {
      this.$router.push({
        path: "/thought/subject_list",
        query: { title: row.topic, id: row.topicId },
      });
    },
    loadData() {
      getHotTopicsPage().then(({ data }) => {
        this.labelList = data.records;
      });
    },
  },
  created() {
    this.loadData();
  },
};
</script>

<style lang="scss" scoped>
.subject ::v-deep .el-card {
  height: 390px;
  .el-card__header {
    padding-bottom: 0;
    height: 45px;
    border: 0;
  }
}
.subject ::v-deep .title {
  font-size: 16px;
}
</style>
