<template>
  <div class="box-wrapper">
    <div class="title">动态</div>
    <iep-no-data v-if="!dataList.length" message="暂无动态" complex></iep-no-data>
    <IepSoDynamic v-else v-for="(item, index) in dataList" :key="index" :data="item"></IepSoDynamic>
    <!-- <JoinMore v-bind="$attrs"></JoinMore> -->
  </div>
</template>
<script>
// import JoinMore from "./JoinMore";
import { getThoughtsListByOrgId } from "@/api/dms/thoughts";
export default {
  // components: { JoinMore },
  data() {
    return {
      dataList: [],
    };
  },
  mounted() {
    this.loadPage();
  },
  methods: {
    loadPage() {
      getThoughtsListByOrgId(this.$route.params.id).then(({ data }) => {
        this.dataList = data;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./common.scss";
</style>
