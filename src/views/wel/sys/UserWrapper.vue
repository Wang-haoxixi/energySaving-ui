<template>
  <CommonChart indexName="用户" :func="getUserTargetByDate"></CommonChart>
</template>
<script>
import CommonChart from "./CommonChart";
import { getUserTargetByDate } from "@/api/dms/comprehensive";
export default {
  components: {
    CommonChart,
  },
  methods: {
    getUserTargetByDate,
  },
};
</script>
