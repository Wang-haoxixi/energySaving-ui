<template>
  <div>
    <iep-crud-table
      ref="CrudTable"
      :columnsMap="columnsMap"
      :operationOptions="operationOptions"
      :loadFunction="getRecordingPage"
      :is-mutiple-selection="false"
    ></iep-crud-table>
  </div>
</template>
<script>
import operationMixins from "@/mixins/operationMixins";
import { getRecordingPage, cancelRecord } from "@/api/dms/proxy";
export default {
  mixins: [operationMixins],
  data() {
    return {
      columnsMap: [
        {
          prop: "rank",
          label: "代理等级",
        },
        {
          prop: "bailSum",
          label: "保证金",
        },
        {
          prop: "discountRate",
          label: "产品折扣率",
          width: "120px",
        },
        {
          prop: "quantitySum",
          label: "宝贝赠予数量",
          width: "130px",
        },
        {
          prop: "statusName",
          label: "状态",
        },
        {
          prop: "payAmount",
          label: "支付金额",
        },
        {
          prop: "payModeName",
          label: "支付方式",
        },
        {
          prop: "createTime",
          label: "申请时间",
        },
      ],
      operationOptions: [
        {
          name: "取消申请",
          func: this.handleCancel,
          hidden: this.isCancel,
          disabled: false,
        },
      ],
    };
  },
  created() {},
  methods: {
    getRecordingPage,
    handleCancel(row) {
      this._handleComfirm(row.agentId, cancelRecord, "取消申请");
    },
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
    isCancel(row) {
      if (row.statusName == "待认证" && row.delFlag == "0") {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>