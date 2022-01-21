<template>
  <CommonChart indexName="订单" :func="getOrderTargetByDate"></CommonChart>
</template>
<script>
import CommonChart from "./CommonChart";
import { getOrderTargetByDate } from "@/api/dms/comprehensive";
export default {
  components: {
    CommonChart,
  },
  methods: {
    getOrderTargetByDate,
  },
};
</script>
