<template>
  <div class="report-body">
    <ListTpl ref="list" v-show="pageState === 'list'" @examine="handleExamine"></ListTpl>
    <ExamineTpl ref="examine" v-if="pageState === 'examine'" @back_page="backPage"></ExamineTpl>
  </div>
</template>

<script>
import ListTpl from "./list";
import ExamineTpl from "./examine/index";
export default {
  components: { ListTpl, ExamineTpl },
  data() {
    return {
      pageState: "list",
    };
  },
  methods: {
    handleExamine(row) {
      this.pageState = "examine";
      this.$nextTick(() => {
        this.$refs.examine.loadData(row);
      });
    },
    backPage(state = false) {
      this.pageState = "list";
      if (state) this.$refs.list.loadPage();
    },
  },
};
</script>