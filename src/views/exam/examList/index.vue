<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name"></iep-page-header>
      <iep-tabs v-model="tabName" :tab-list="tabList" @tab-click="handleClick">
        <template v-if="tabName ==='Exam'" v-slot:Exam>
          <Exam></Exam>
        </template>
        <template v-if="tabName ==='Exercise'" v-slot:Exercise>
          <Exercise></Exercise>
        </template>
      </iep-tabs>
    </iep-basic-container>
  </div>
</template>
<script>
import Exam from "./Page/Exam";
import Exercise from "./Page/Exercise";

export default {
  data() {
    return {
      tabName: "Exam",
      tabList: [
        {
          label: "当前考试",
          value: "Exam",
        },
        {
          label: "当前练习",
          value: "Exercise",
        },
      ],
    };
  },
  components: { Exam, Exercise },
  methods: {
    handleClick({ name }) {
      this.$router.push({
        path: "/exam/exam_list",
        query: { tabName: name },
      });
    },
  },
  created() {
    if (this.$route.query.tabName) {
      this.tabName = this.$route.query.tabName;
    }
  },
};
</script>
