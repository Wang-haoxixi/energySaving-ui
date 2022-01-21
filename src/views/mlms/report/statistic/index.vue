<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name"></iep-page-header>
      <div class="list" v-show="pageState === 'list'">
        <iep-tabs v-model="tabName" :tab-list="tabList"></iep-tabs>
        <TableTpl ref="table" @handleDetail="handleDetail"></TableTpl>
      </div>
      <!-- 详情 -->
      <DetailTpl ref="detail" v-if="pageState === 'detail'" @back_page="pageState = 'list'"></DetailTpl>
    </iep-basic-container>
  </div>
</template>

<script>
import mixins from "@/mixins/mixins";
import { mapGetters } from "vuex";
import TableTpl from "./table";
import DetailTpl from "./detail";

export default {
  name: "report",
  mixins: [mixins],
  components: { TableTpl, DetailTpl },
  data() {
    return {
      tabName: "personDaily",
      pageState: "list",
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    tabList() {
      return [
        {
          label: "员工日报",
          value: "personDaily",
        },
        {
          label: "员工周报",
          value: "staffWeek",
        },
        {
          label: "员工月报",
          value: "staffMonth",
        },
        {
          label: "组织周报",
          value: "organizeWeek",
        },
        {
          label: "组织月报",
          value: "organizeMonth",
        },
        // {
        //   label: "项目周报",
        //   value: "projectTab",
        // },
      ];
    },
  },
  methods: {
    handleDetail(row, fn) {
      this.pageState = "detail";
      this.$nextTick(() => {
        this.$refs.detail.requestFn = fn;
        this.$refs.detail.formData = { ...row };
      });
    },
  },
  watch: {
    tabName(val) {
      this.$refs.table.loadPage(val);
    },
  },
};
</script>
