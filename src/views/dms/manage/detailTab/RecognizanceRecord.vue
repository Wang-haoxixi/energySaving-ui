<template>
  <div>
    <iep-table
      :isLoadTable="isLoadTable"
      :pagination="pagination"
      :columnsMap="recognizanceColumnsMap"
      :dictsMap="dictsMap"
      :pagedTable="pagedTable"
    ></iep-table>
  </div>
</template>

<script>
import mixins from "@/mixins/mixins";
import { recognizanceColumnsMap, dictsMap } from "./options.js";
import { getRecordByUserPage } from "@/api/dms/proxy";

export default {
  mixins: [mixins],
  props: {
    id: {
      type: String,
      default: "",
    },
    createBy: {
      type: Number,
      default: null,
    },
    agentType: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      recognizanceColumnsMap,
      dictsMap,
      options: [
        {
          value: 2,
          label: "支付成功",
        },
        {
          value: 3,
          label: "支付失败",
        },
      ],
      value: "",
    };
  },
  created() {
    this.loadPage();
  },
  methods: {
    loadPage(param = this.searchForm) {
      this.loadTable(
        { createBy: this.createBy, agentType: this.agentType, ...param },
        getRecordByUserPage,
      );
    },
    // handleCertification (val) {
    //   this.value = ''
    //   changeBailStatus({ agentId: Number(this.id), payStatus: val }).then(() => {
    //     this.loadPage()
    //   })
    // },
    // handleCertification(id, val) {
    //   changeBailStatus({ agentId: Number(id), payStatus: val }).then(res => {
    //     if (res.data) {
    //       this.$message({
    //         message: "支付成功",
    //         type: "success",
    //       });
    //       this.loadPage();
    //     } else {
    //       this.$message({
    //         message: data.msg,
    //         type: "warning",
    //       });
    //     }
    //   });
    // },
  },
};
</script>

<style lang="scss" scoped>
</style>
