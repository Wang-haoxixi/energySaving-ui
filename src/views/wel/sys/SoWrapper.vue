<template>
  <CommonChart indexName=" 组织 " :func="getOrgTargetByDate"></CommonChart>
</template>
<script>
import CommonChart from "./CommonChart";
import { getOrgTargetByDate } from "@/api/dms/comprehensive";
export default {
  components: {
    CommonChart,
  },
  methods: {
    getOrgTargetByDate,
  },
};
</script>
