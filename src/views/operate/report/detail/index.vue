<template>
  <div class="report-body">
    <ExamineTpl ref="examine" @back_page="backPage"></ExamineTpl>
  </div>
</template>

<script>
import ExamineTpl from "../examine/index";
export default {
  components: { ExamineTpl },
  data() {
    return {};
  },
  methods: {
    handleExamine(row) {
      this.$nextTick(() => {
        this.$refs.examine.loadData(row);
      });
    },
    backPage() {
      this.$router.go(-1);
    },
  },
  mounted() {
    const params = this.$route.params;
    this.handleExamine(params);
  },
};
</script>