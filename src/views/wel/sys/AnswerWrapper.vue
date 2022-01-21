<template>
  <CommonChart indexName="答题人" titleName="问卷" :func="getAnswerTargetByDate"></CommonChart>
</template>
<script>
import CommonChart from "./CommonChart";
import { getAnswerTargetByDate } from "@/api/qms/answer";
export default {
  components: {
    CommonChart,
  },
  methods: {
    getAnswerTargetByDate,
  },
};
</script>
