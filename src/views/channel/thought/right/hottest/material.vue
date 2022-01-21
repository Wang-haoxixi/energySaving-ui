<template>
  <div class="material">
    <IepAppRankingCard :dataList="list" @click="handleDetail" name="materialName" isGrade></IepAppRankingCard>
  </div>
</template>

<script>
import { getDynamicHit } from "@/api/dms/material";
import IepAppRankingCard from "./RankingCard";
export default {
  components: { IepAppRankingCard },
  data() {
    return {
      list: [],
    };
  },
  methods: {
    handleDetail(row) {
      this.$openPage(`/my/index/material/${row.id}`, 2);
    },
    loadData() {
      getDynamicHit().then(({ data }) => {
        this.list = data.map(m => {
          m.name = m.materialName;
          return m;
        });
      });
    },
  },
  created() {
    this.loadData();
  },
};
</script>
<style scoped>
</style>


