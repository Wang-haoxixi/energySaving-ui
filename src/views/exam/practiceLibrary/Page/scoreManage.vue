<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name" :backOption="backOption"></iep-page-header>
      <iep-tabs v-model="tabName" :tab-list="tabList" @tab-click="handleClick">
        <template v-if="tabName ==='unsubmit'" v-slot:unsubmit>
          <unsubmit :examId="record.id"></unsubmit>
        </template>
        <template v-if="tabName ==='manage'" v-slot:manage>
          <manage :examId="record.id"></manage>
        </template>
      </iep-tabs>
    </iep-basic-container>
  </div>
</template>

<script>
import unsubmit from "./unsubmit";
import manage from "./manage";
export default {
  props: ["record"],
  name: "resultOrg",
  components: {
    unsubmit,
    manage,
  },
  data() {
    return {
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: this.handleGoBack,
      },
      tabName: "unsubmit",
      tabList: [
        {
          label: "未提交",
          value: "unsubmit",
        },
        {
          label: "成绩管理",
          value: "manage",
        },
      ],
    };
  },
  methods: {
    handleClick({ name }) {
      this.$router.replace({
        query: {
          tabName: name,
        },
      });
    },
    handleGoBack() {
      this.$emit("onGoBack");
    },
  },
  created() {
    this.$route.query.tabName && (this.tabName = this.$route.query.tabName);
  },
};
</script>
