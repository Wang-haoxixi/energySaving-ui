<template>
  <div class="mo-fang-tabs">
    <Tabs
      v-model="activeTab"
      :tabList="tabList"
      title="创新方案"
      listUrl="/channel/mo_fang/list?type=0"
      @tab-click="handleSelect"
      :showTabs="false"
    ></Tabs>
    <iep-no-data v-if="!programList.length" complex></iep-no-data>
    <ProgramCard :itemList="programList"></ProgramCard>
  </div>
</template>
<script>
import Tabs from "./Tabs";
import ProgramCard from "./ProgramCard";
import { getHotRecommandPlanList } from "@/api/dms/product";
import { mapGetters } from "vuex";
export default {
  components: { Tabs, ProgramCard },
  data() {
    return {
      activeTab: "",
      programList: [],
    };
  },
  computed: {
    ...mapGetters(["dictGroup"]),
    tabList() {
      const v = this.dictGroup.size
        ? this.dictGroup.get("dms_plan_type").map(m => ({
            value: m.value,
            label: m.label,
          }))
        : [];
      return [
        {
          value: "",
          label: "全部",
        },
        ...v,
      ];
    },
  },
  mounted() {
    this.loadList();
  },
  methods: {
    handleSelect() {
      this.loadList();
    },
    async loadList() {
      const { data } = await getHotRecommandPlanList(this.activeTab);
      this.programList = data.slice(0, 4);
    },
  },
};
</script>
<style lang="scss" scoped>
.mo-fang-tabs {
  margin: 30px auto;
  width: 1200px;
}
</style>
