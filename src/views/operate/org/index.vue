<template>
  <div>
    <iep-basic-container>
      <iep-tabs v-model="tabName" :tab-list="tabList">
        <template v-if="tabName ==='List'" v-slot:List>
          <List></List>
        </template>
        <template v-if="tabName ==='Graph'" v-slot:Graph>
          <Graph></Graph>
        </template>
      </iep-tabs>
    </iep-basic-container>
  </div>
</template>
<script>
import List from "./List/index";
import Graph from "./Graph/index";
export default {
  components: {
    List,
    Graph,
  },
  data() {
    return {
      tabName: "List",
      tabList: [
        {
          label: "组织管理",
          value: "List",
        },
        {
          label: "组织分析",
          value: "Graph",
        },
      ],
    };
  },
};
</script>
