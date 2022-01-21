<template>
  <div class="job-list">
    <component
      v-bind:is="ComponentName"
      :ref="ComponentName"
      @operate="handleOperate"
      @load-page="loadPage"
    ></component>
  </div>
</template>

<script>
import TableTpl from "./table";
import JobForm from "./form/job";
import PartnerForm from "./form/partner";
export default {
  components: { TableTpl, JobForm, PartnerForm },
  data() {
    return {
      ComponentName: "TableTpl",
    };
  },
  methods: {
    handleOperate(refName, operation, row = {}) {
      this.ComponentName = refName;
      if (operation) {
        this.$nextTick(() => {
          this.$refs[refName][operation](row);
        });
      }
    },
    loadPage() {
      this.ComponentName = "TableTpl";
    },
  },
  created() {},
};
</script>

<style>
</style>