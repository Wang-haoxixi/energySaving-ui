<template>
  <div class="most">
    <IepAppTabsCard>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='subject'" v-slot:subject>
          <subjectTpl v-loading="activeTab !=='subject'" ref="tpl"></subjectTpl>
        </template>
        <template v-if="activeTab ==='material'" v-slot:material>
          <materialTpl v-loading="activeTab !=='material'" ref="tpl"></materialTpl>
        </template>
      </iep-tabs>
    </IepAppTabsCard>
  </div>
</template>
<script>
import subjectTpl from "./subject";
import materialTpl from "./material";

export default {
  components: {
    subjectTpl,
    materialTpl,
  },
  data() {
    return {
      tabList: [
        {
          label: "热门话题榜",
          value: "subject",
        },
        {
          label: "热门文章",
          value: "material",
        },
      ],
      activeTab: "subject",
    };
  },
  methods: {
    loadData() {
      this.$refs["tpl"].loadData();
    },
  },
};
</script>
<style scoped>
.most >>> .el-card {
  border: 0;
  /* height: 400px; */
}
.most >>> .el-tabs__nav-scroll {
  height: 60px;
}
.most >>> .el-tabs__header {
  margin-bottom: 16px;
}
.most >>> .el-tabs__nav {
  padding-bottom: 16px;
}
</style>