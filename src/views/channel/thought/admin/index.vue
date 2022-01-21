<template>
  <div class="thought-container">
    <iep-basic-container>
      <div v-show="pageState === 'list'">
        <iep-page-header title="说说管理"></iep-page-header>
        <iep-tabs v-model="tabName" :tab-list="tabList">
          <template v-if="tabName ==='subject'" v-slot:subject>
            <subject @handleDetail="handleDetail"></subject>
          </template>
          <template v-if="tabName ==='thought'" v-slot:thought>
            <thought @handleDetail="handleDetail"></thought>
          </template>
        </iep-tabs>
      </div>
      <!-- 说说的详情 -->
      <thoughtDetail v-if="pageState === 'thought'" ref="thought" @back_page="backPage"></thoughtDetail>
      <!-- 话题的详情 -->
      <subjectDetail v-if="pageState === 'subject'" ref="subject" @back_page="backPage"></subjectDetail>
    </iep-basic-container>
  </div>
</template>

<script>
import subject from "./subject/";
import thought from "./thought/";
import { mapGetters } from "vuex";
import thoughtDetail from "./thought/detail";
import subjectDetail from "./subject/detail";

export default {
  name: "datum",
  components: { subject, thought, thoughtDetail, subjectDetail },
  computed: {
    ...mapGetters(["permissions"]),
  },
  data() {
    return {
      tabName: "thought",
      tabList: [
        {
          label: "说说管理",
          value: "thought",
        },
        {
          label: "话题管理",
          value: "subject",
        },
      ],
      pageState: "list",
    };
  },
  methods: {
    handleDetail(row, type) {
      this.pageState = type;
      this.$nextTick(() => {
        this.$refs[type].loadData(row);
      });
    },
    backPage() {
      this.pageState = "list";
    },
  },
  created() {},
};
</script>
<style lang="scss" scoped>
.thought-container {
  position: relative;
}
.thought-container ::v-deep .el-tabs__header {
  width: 50%;
  background: none;
}
</style>