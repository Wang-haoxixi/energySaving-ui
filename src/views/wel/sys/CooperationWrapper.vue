<template>
  <CommonChart indexName="协作" :func="getCooperationTargetByDate"></CommonChart>
</template>
<script>
import CommonChart from "./CommonChart";
import { getCooperationTargetByDate } from "@/api/qms/cooperation_list";
export default {
  components: {
    CommonChart,
  },
  methods: {
    getCooperationTargetByDate,
  },
};
</script>
