<template>
  <iep-basic-container>
    <iep-page-header :title="$route.meta.name"></iep-page-header>
    <iep-tabs v-model="tabName" :tab-list="tabList">
      <template v-if="tabName ==='List'" v-slot:List>
        <list></list>
      </template>
      <template v-if="tabName ==='Pending'" v-slot:Pending>
        <pending></pending>
      </template>
      <template v-if="tabName ==='Extinction'" v-slot:Extinction>
        <extinction></extinction>
      </template>
    </iep-tabs>
  </iep-basic-container>
</template>

<script>
import List from "./List/";
import Pending from "./Pending/";
import Extinction from "./Extinction/";

export default {
  components: { List, Pending, Extinction },
  data() {
    return {
      tabName: "List",
      tabList: [
        {
          label: "全部机构",
          value: "List",
        },
        {
          label: "待审核机构",
          value: "Pending",
        },
        {
          label: "回收站",
          value: "Extinction",
        },
      ],
    };
  },
  created() {},
};
</script>
