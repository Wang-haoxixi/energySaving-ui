<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name"></iep-page-header>
      <keep-alive>
        <iep-tabs v-model="activeTab" :tab-list="tabList">
          <template v-slot:[activeTab]>
            <component ref="tabList" :is="activeTab"></component>
          </template>
        </iep-tabs>
      </keep-alive>
    </iep-basic-container>
  </div>
</template>
<script>
import Approval from "./projectApproval/";
import Sign from "./projectSign/";
export default {
  components: { Approval, Sign },
  data() {
    return {
      tabList: [
        {
          label: "项目审核",
          value: "Approval",
        },
        {
          label: "项目网签",
          value: "Sign",
        },
      ],
      activeTab: "Approval",
    };
  },
};
</script>
<style lang="scss" scoped>
</style>