<template>
  <CommonChart indexName="说说" :func="getThoughtTargetByDate"></CommonChart>
</template>
<script>
import CommonChart from "./CommonChart";
import { getThoughtTargetByDate } from "@/api/dms/comprehensive";
export default {
  components: {
    CommonChart,
  },
  methods: {
    getThoughtTargetByDate,
  },
};
</script>
