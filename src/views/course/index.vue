<template>
  <iep-basic-container>
    <iep-tabs v-model="tabName" :tab-list="tabList" @tab-click="handleClick">
      <template v-if="tabName ==='info'" v-slot:info>
        <info></info>
      </template>
      <template v-if="tabName ==='courseware'" v-slot:courseware>
        <courseware></courseware>
      </template>
      <template v-if="tabName ==='lecturer'" v-slot:lecturer>
        <lecturer></lecturer>
      </template>
    </iep-tabs>
  </iep-basic-container>
</template>
<script>
import lecturer from "./lecturer/index";
import courseware from "./courseware/index";
import info from "./info/index";
export default {
  components: {
    lecturer,
    courseware,
    info,
  },
  data() {
    return {
      tabName: "info",
      tabList: [
        {
          label: "课程库",
          value: "info",
        },
        {
          label: "课件库",
          value: "courseware",
        },
        {
          label: "讲师库",
          value: "lecturer",
        },
      ],
    };
  },
  created() {
    if (this.$route.query.tabName) {
      this.tabName = this.$route.query.tabName;
    }
  },
  methods: {
    handleClick({ name }) {
      this.$router.push({
        query: { tabName: name },
      });
    },
  },
};
</script>
